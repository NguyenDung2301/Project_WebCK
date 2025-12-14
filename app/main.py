# app.py
from datetime import datetime
import os

from flask import Flask, jsonify
from flask_cors import CORS

from routes.user_route import user_router
from routes.auth_route import auth_router
from routes.restaurant_route import restaurant_router
from db.connection import ping_db, init_indexes

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
app.register_blueprint(restaurant_router, url_prefix='/api/restaurants')


@app.route('/')
def home():
    """Simple landing response so backend can run standalone."""
    return jsonify({
        'message': 'Food Delivery API is running',
        'frontend': {
            'devServer': 'http://localhost:3000',
            'description': 'Start Vite from frontend/web for the UI'
        },
        'status': 'ok'
    })


@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy' if ping_db() else 'unhealthy',
        'timestamp': datetime.now().isoformat()
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)