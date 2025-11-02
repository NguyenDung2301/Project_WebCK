import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Config class chứa tất cả environment variables"""
    
    # MongoDB settings
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://23001530:23001530@cluster0.08jxb6t.mongodb.net/?appName=Cluster0')
    MONGO_DB_NAME = os.getenv('MONGO_DB_NAME', 'webck')
    
    #JWT 
    JWT_SECRET = os.getenv('JWT_SECRET')
    JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))

    # Flask settings
    SECRET_KEY = os.getenv('SECRET_KEY')
    DEBUG = os.getenv('DEBUG').lower() == 'true'
    HOST = os.getenv('HOST')
    PORT = int(os.getenv('PORT'))
    
config = Config()