import hashlib
import os

from entities import User


class AuthHandler:

    def __init__(self, database_handler):
        self.database_handler = database_handler

    def get_user(self, access_token):
        db_user_details = self.database_handler.get_user_by_token(access_token)
        if db_user_details is None:
            return None
        return User(db_user_details[0], db_user_details[1], db_user_details[2], db_user_details[3])

    @staticmethod
    def get_token_from_request(request):

        authorization_header = request.headers.get("Authorization")

        if not authorization_header:
            return None

        if not authorization_header.startswith("Bearer "):
            return None

        return authorization_header.split(" ")[1]

    @staticmethod
    def generate_token(email, password):
        token_data = email + password
        return hashlib.pbkdf2_hmac('sha256', token_data.encode(), os.urandom(16), 5000).hex()

    @staticmethod
    def hash_password(password):
        return hashlib.md5(password.encode()).hexdigest()
