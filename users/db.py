import sqlite3


class DataBase:
    def __init__(self, db_file):
        self.connection = sqlite3.connect(db_file)
        self.curs = self.connection.cursor()

    # проверка на существование пользователя
    def user_exists(self, user_id):
        with self.connection:
            result = self.curs.execute('SELECT * FROM users WHERE user_id = ?', (user_id,)).fetchall()
            return bool(len(result))

    # добавление пользователя
    def add_user(self, user_id, user_name, first_name, last_name, url):
        with self.connection:
            self.curs.execute("INSERT INTO users(user_id, user_name, first_name, last_name, url) VALUES(?, ?, ?, ?, ?)",
                          (user_id, user_name, first_name, last_name, url))

    # найти пользователя
    def find_user(self, user_id):
        with self.connection:
            return self.curs.execute("SELECT user_name FROM users WHERE user_id = ?", (user_id,)).fetchone()

    # посчитать кол-во пользователей
    def count_users(self):
        with self.connection:
            return self.curs.execute("SELECT COUNT(*) FROM users").fetchone()[0]

    # возвращает id всех пользователей в виде кортежа с кортежами
    def all_users(self):
        with self.connection:
            return self.curs.execute("SELECT user_id FROM users").fetchall()