from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin

from databaseHandler import DatabaseHandler

app = Flask(__name__)
CORS(app)

# Init Database
database_handler = DatabaseHandler("localhost", "foodCo", "password", "foodCoCTF")
database_handler.open_connection()


@app.route('/login', methods=['PUT'])
def login():

    if request.is_json:

        body = request.json
        user_email = body['email']
        password = body['password']

        login_successful, access_token = database_handler.login(user_email, password)

        if login_successful:
            return make_response(jsonify({"message": "Successful Login!", "token": access_token}), 200)
        else:
            return make_response(jsonify({"message": "Incorrect credentials"}), 401)


@app.route('/register', methods=['POST'])
def register():

    if request.is_json:

        body = request.json
        user_email = body['email']
        password = body['password']

        successful_registration = database_handler.register(user_email, password)

        if successful_registration:
            return make_response(jsonify({"message": "Successful Registration!"}), 200)
        else:
            return make_response(jsonify({"message": "Unable to register"}), 500)


@app.route('/categories', methods=['GET'])
def get_food_categories():
    food_categories = {"categories": database_handler.get_food_categories()}
    return make_response(jsonify(food_categories), 200)


@app.route('/category', methods=['GET'])
@cross_origin(origins="*")
def get_food_category():

    category_id = request.args['id']
    food_category = database_handler.get_food_category(category_id)

    return make_response(jsonify(food_category), 200,)


if __name__ == '__main__':
    app.run()
