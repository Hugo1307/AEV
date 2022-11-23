import mysql.connector
import sys

from authHandler import AuthHandler


class DatabaseHandler:

    def __init__(self, address, user, password, database):
        self.address = address
        self.user = user
        self.password = password
        self.database = database
        self.connection = None

    def open_connection(self):
        self.connection = mysql.connector.connect(user=self.user, password=self.password, host=self.address,
                                                  database=self.database, port=3306)

    def verify_connection(self):
        if not self.connection:
            self.open_connection()

    def close_connection(self):
        if self.connection:
            self.connection.close()

    def login(self, email, password):

        self.verify_connection()

        cursor = self.connection.cursor()

        query = "SELECT password FROM users WHERE email=%s;"
        login_successful = False
        password_digest = AuthHandler.hash_password(password)

        try:

            cursor.execute(query, (email,))

            for (passwordInDatabase) in cursor:
                if passwordInDatabase[0] == password_digest:
                    login_successful = True

        except mysql.connector.Error as err:
            print("MySQL Error on login(): ", err.msg)

        access_token = None
        if login_successful:
            access_token = self.__update_token(email, password)

        cursor.close()
        return login_successful, access_token

    def register(self, email, password):

        self.verify_connection()

        cursor = self.connection.cursor()

        query = "INSERT INTO users VALUES (%s, %s, 0, null)"
        successful_registration = True

        password_digest = AuthHandler.hash_password(password)

        try:
            cursor.execute(query, (email, password_digest,))
            self.connection.commit()
        except mysql.connector.Error as err:
            print(f"MySQL Error on register(): {err.msg}", file=sys.stdout)
            sys.stdout.flush()
            successful_registration = False

        cursor.close()
        return successful_registration

    def get_food_categories(self):

        self.verify_connection()

        cursor = self.connection.cursor(buffered=True)

        query = "SELECT * FROM categories;"
        food_categories = []

        try:

            cursor.execute(query)

            for (category_id, name, description, image) in cursor:
                food_categories.append({"id": category_id, "name": name, "description": description, "image": image})

        except mysql.connector.Error as err:
            print("MySQL Error on get_food_categories(): ", err.msg)

        cursor.close()
        return food_categories

    def get_food_category(self, category_id):

        self.verify_connection()

        cursor = self.connection.cursor(buffered=True)

        query = "SELECT * FROM categories WHERE id={0}".format(category_id)
        food_category = []

        try:

            cursor.execute(query)

            for category in cursor.fetchall():
                food_category.append({"id": category[0], "title": category[1], "description": category[2],
                                      "image": category[3]})

        except mysql.connector.Error as err:
            print("MySQL Error on get_food_categories(): ", err.msg)

        cursor.close()
        return food_category

    def get_user_by_token(self, access_token):

        self.verify_connection()

        cursor = self.connection.cursor()
        query = "SELECT * FROM users WHERE token=%s LIMIT 1".format(access_token)
        args = (access_token,)

        try:
            cursor.execute(query, args)
            return cursor.fetchone()
        except mysql.connector.Error as err:
            print("MySQL Error on get_profile_by_token(): ", err.msg)

        cursor.close()
        return None

    def has_admin_rights(self, access_token):

        self.verify_connection()

        cursor = self.connection.cursor()
        query = "SELECT * FROM users WHERE token=%s LIMIT 1".format(access_token)
        args = (access_token,)

        try:
            cursor.execute(query, args)
            return cursor.fetchone()[2] == 1
        except mysql.connector.Error as err:
            print("MySQL Error on has_admin_rights(): ", err.msg)

        cursor.close()
        return False

    def __update_token(self, email, blank_password):

        self.verify_connection()

        cursor = self.connection.cursor()

        query = "UPDATE users SET token = %s WHERE email=%s"
        access_token = AuthHandler.generate_token(email, blank_password)

        try:
            cursor.execute(query, (access_token, email,))
            self.connection.commit()
        except mysql.connector.Error as err:
            print("MySQL Error on update_token(): ", err.msg)

        cursor.close()

        return access_token
