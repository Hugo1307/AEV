import os

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin

from authHandler import AuthHandler
from databaseHandler import DatabaseHandler
from cron.cron_log_reader import CronLogReader
from cron.cron_manager import CronManager
from swagger.swagger import Swagger

app = Flask(__name__)
app.register_blueprint(Swagger.swaggerui_blueprint())
CORS(app)

database_handler = DatabaseHandler(os.getenv("DB_ADDRESS"), os.getenv("DB_USER"), os.getenv("DB_PASSWORD"),
                                   os.getenv("DB_NAME"))
database_handler.open_connection()

auth_handler = AuthHandler(database_handler)


@app.before_request
def check_authentication():
    authorization_header = request.headers.get("Authorization")

    if request.path != "/login" and request.path != "/register" and request.method != "OPTIONS":

        if not authorization_header:
            return make_response(jsonify({"message": "You must be authenticated to do this."}), 401)

        if not authorization_header.startswith("Bearer "):
            return make_response(jsonify({"message": "You should use a Bearer token for Authentication."}), 400)

        auth_token = auth_handler.get_token_from_request(request)

        if not auth_token:
            return make_response(jsonify({"message": "Unknown error obtaining token."}), 500)

        user_by_token = auth_handler.get_user(auth_token)

        if not user_by_token:
            return make_response(jsonify({"message": "You don't have access to that resource."}), 403)


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

    return make_response(jsonify({"message": "Missing parameters in request"}), 400)


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

    return make_response(jsonify(food_category), 200, )


@app.route('/profile', methods=['GET'])
def get_user_profile():
    auth_token = auth_handler.get_token_from_request(request)
    user = auth_handler.get_user(auth_token)

    if not user:
        return make_response(jsonify({"message": "Profile not found."}), 404)

    return make_response(jsonify(user.to_dict()), 200, )


@app.route('/cron', methods=['GET'])
def get_recent_cron_log():
    cron_log_reader = CronLogReader()
    recent_cron_log = cron_log_reader.get_recent_cron_log()
    return make_response(jsonify({"message": "Logs Successfully Obtained", "logs": recent_cron_log}), 200, )


@app.route('/cron', methods=['POST'])
def update_cleaner_time():
    body = request.json
    new_cron_time = body['new_cron_time']  # * * * * * ls -a | xargs ; #
    cron_manager = CronManager()
    sed_command = cron_manager.update_cleaner_time(new_cron_time)
    return make_response({"message": "Cleaner time successfully updated!", "output": jsonify(sed_command)}, 200, )


if __name__ == '__main__':
    app.run()
