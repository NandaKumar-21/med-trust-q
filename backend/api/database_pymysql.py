import pymysql

db = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="medtrust",
    cursorclass=pymysql.cursors.DictCursor
)

cursor = db.cursor()
