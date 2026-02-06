import pymysql

try:
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="hi",
        database="medtrust",
        port=3312,
        cursorclass=pymysql.cursors.DictCursor
    )
    print("✅ MySQL connection successful")
    connection.close()
except Exception as e:
    print(f"❌ Connection failed: {str(e)}")
