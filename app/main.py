# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from routes.user_route import user_router
from routes.auth_route import auth_router
from core.config import config
from db.connection import ping_db, init_indexes
from datetime import datetime
import os

# Khởi tạo Flask app
app = Flask(__name__)

# Cấu hình CORS
CORS(app)

# Config
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')

# Initialize indexes
with app.app_context():
    init_indexes()

# Register routes
app.register_blueprint(auth_router, url_prefix='/api/auth')
app.register_blueprint(user_router, url_prefix='/api/users')

@app.route('/')
def home():
    return jsonify({
        'message': 'Food Delivery API',
        'version': '1.0.0',
        'status': 'running'
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy' if ping_db() else 'unhealthy',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)