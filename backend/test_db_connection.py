import psycopg2
from psycopg2 import sql

def test_connection():
    params = {
        "host": "127.0.0.1",
        "port": 5432,
        "user": "postgres",
        "password": "password"
    }
    
    try:
        print(f"Connecting to PostgreSQL at {params['host']}...")
        conn = psycopg2.connect(**params)
        conn.autocommit = True
        cur = conn.cursor()
        
        cur.execute("SELECT datname FROM pg_database;")
        databases = cur.fetchall()
        print("Connected! Available databases:")
        for db in databases:
            print(f" - {db[0]}")
            
        if ("testdb",) not in databases:
            print("Database 'testdb' not found. Creating it...")
            cur.execute(sql.SQL("CREATE DATABASE testdb"))
            print("Database 'testdb' created successfully.")
        else:
            print("Database 'testdb' already exists.")
            
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_connection()
