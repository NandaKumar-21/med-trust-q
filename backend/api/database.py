import pymysql

connection = pymysql.connect(
    host="localhost",
    user="root",
    password="hi",
    database="medtrust",
    port=3312,
    cursorclass=pymysql.cursors.DictCursor
)

db = connection
cursor = connection.cursor()
