class User:

    def __init__(self, email, password, is_admin, token):
        self.email = email
        self.password = password
        self.is_admin = is_admin
        self.token = token

    def to_dict(self):
        return {"email": self.email, "password": self.password, "isAdmin": self.is_admin, "accessToken": self.token}