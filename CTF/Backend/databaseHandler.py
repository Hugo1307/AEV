import mysql.connector
import mysql.connector.pooling
import sys

from authHandler import AuthHandler


class DatabaseHandler:

    def __init__(self, address, user, password, database):
        self.address = address
        self.user = user
        self.password = password
        self.database = database
        self.connection_pool = None

    def open_connection(self):
        self.connection_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool",
                                                                           pool_size=12,
                                                                           user=self.user,
                                                                           pool_reset_session=True,
                                                                           password=self.password, host=self.address,
                                                                           database=self.database, port=3306,
                                                                           buffered=True,
                                                                           consume_results=True)

    def get_connection(self):
        return self.connection_pool.get_connection()

    def close_connection(self, connection):
        connection.close()

    def login(self, email, password):

        connection = self.get_connection()
        cursor = connection.cursor()

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
        finally:
            cursor.close()
            connection.close()

        access_token = None
        if login_successful:
            access_token = self.__update_token(email, password)

        return login_successful, access_token

    def register(self, email, password):

        connection = self.get_connection()
        cursor = connection.cursor()

        query = "INSERT INTO users VALUES (%s, %s, 0, null)"
        successful_registration = True

        password_digest = AuthHandler.hash_password(password)

        try:
            cursor.execute(query, (email, password_digest,))
            connection.commit()
        except mysql.connector.Error as err:
            print(f"MySQL Error on register(): {err.msg}", file=sys.stdout)
            sys.stdout.flush()
            successful_registration = False
        finally:
            cursor.close()
            connection.close()

        return successful_registration

    def get_food_categories(self):

        connection = self.get_connection()
        cursor = connection.cursor(buffered=True)

        query = "SELECT * FROM categories;"
        food_categories = []

        try:

            cursor.execute(query)

            for (category_id, name, description, recipe, image) in cursor:
                food_categories.append({"id": category_id, "name": name, "description": description, "recipe": recipe,
                                        "image": image})

        except mysql.connector.Error as err:
            print("MySQL Error on get_food_categories(): ", err.msg)
        finally:
            cursor.close()
            connection.close()

        return food_categories

    def get_food_category(self, category_id):

        connection = self.get_connection()
        cursor = connection.cursor(buffered=True)

        query = "SELECT * FROM categories WHERE id={0}".format(category_id)
        food_category = []

        try:

            cursor.execute(query)

            for category in cursor.fetchall():
                food_category.append({"id": category[0], "title": category[1], "description": category[2],
                                      "recipe": category[3], "image": category[4]})

            cursor.reset()

        except mysql.connector.Error as err:
            print("MySQL Error on get_food_categories(): ", err.msg)
        finally:
            cursor.reset()
            cursor.close()
            connection.close()

        return food_category

    def get_user_by_token(self, access_token):

        connection = self.get_connection()
        cursor = connection.cursor(buffered=True)

        query = "SELECT * FROM users WHERE token=%s LIMIT 1".format(access_token)
        args = (access_token,)

        try:
            cursor.execute(query, args)
            return cursor.fetchone()
        except mysql.connector.Error as err:
            print("MySQL Error on get_profile_by_token(): ", err.msg)
        finally:
            cursor.close()
            connection.close()

        return None

    def has_admin_rights(self, access_token):

        connection = self.get_connection()
        cursor = connection.cursor()

        query = "SELECT * FROM users WHERE token=%s LIMIT 1".format(access_token)
        args = (access_token,)

        try:
            cursor.execute(query, args)
            return cursor.fetchone()[2] == 1
        except mysql.connector.Error as err:
            print("MySQL Error on has_admin_rights(): ", err.msg)
        finally:
            cursor.close()
            connection.close()

        return False

    def __update_token(self, email, blank_password):

        connection = self.get_connection()
        cursor = connection.cursor()

        query = "UPDATE users SET token = %s WHERE email=%s"
        access_token = AuthHandler.generate_token(email, blank_password)

        try:
            cursor.execute(query, (access_token, email,))
            connection.commit()
        except mysql.connector.Error as err:
            print("MySQL Error on update_token(): ", err.msg)
        finally:
            cursor.close()
            connection.close()

        return access_token
