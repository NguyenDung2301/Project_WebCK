from flask import Flask
from flask_cors import CORS
from app.core.config import Config
from app.database.connection import mongo
from app.routers.auth_router import auth_router
from app.routers.user_router import user_router

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Bật CORS
    CORS(app)  # cho phép tất cả origin
    # Nếu muốn giới hạn origin:
    # CORS(app, origins=["http://localhost:5500"])

    # Kết nối MongoDB
    mongo.init_app(app)
    
    app.register_blueprint(auth_router, url_prefix="/auth")
    app.register_blueprint(user_router, url_prefix="/users")

    @app.route("/health")
    def health_check():
        return {"status": "ok", "message": "Flask + MongoDB is running"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
    
#python -m http.server 5500    