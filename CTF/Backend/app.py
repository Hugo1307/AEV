import os

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

from databaseHandler import DatabaseHandler

app = Flask(__name__)
CORS(app)

database_handler = DatabaseHandler(os.getenv("DB_ADDRESS"), os.getenv("DB_USER"), os.getenv("DB_PASSWORD"),
                                   os.getenv("DB_NAME"))
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
def get_food_category():

    category_id = request.args['id']
    food_category = database_handler.get_food_category(category_id)

    return make_response(jsonify(food_category), 200,)


@app.route('/profile', methods=['GET'])
def get_user_profile():

    access_token = request.args['access_token']
    profile_details = database_handler.get_profile_by_token(access_token)

    if not profile_details:
        return make_response(jsonify({"message": "Profile not found."}), 200, )

    profile_details_formatted = {"email": profile_details[0], "password": profile_details[1],
                                 "isAdmin": profile_details[2], "accessToken": profile_details[3]}

    return make_response(jsonify(profile_details_formatted), 200, )


if __name__ == '__main__':
    app.run()
