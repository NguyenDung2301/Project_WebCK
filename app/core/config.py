import os
from dotenv import load_dotenv

# Load biến môi trường từ file .env
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "secret_key")
    MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://23001530:23001530@cluster0.08jxb6t.mongodb.net/webck")