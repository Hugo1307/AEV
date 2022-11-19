import hashlib
import os


class AuthHandler:

    @staticmethod
    def generate_token(email, password):
        token_data = email + password
        return hashlib.pbkdf2_hmac('sha256', token_data.encode(), os.urandom(16), 5000).hex()

    @staticmethod
    def hash_password(password):
        return hashlib.md5(password.encode()).hexdigest()
