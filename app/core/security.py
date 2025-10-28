import jwt
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from typing import Dict, Optional
from core.config import config

class Security:
    """Security liên quan đến JWT, Token, Password"""
    
    def __init__(self):
        self.secret_key = config.JWT_SECRET
        self.algorithm = config.JWT_ALGORITHM
        self.access_token_expire_minutes = config.ACCESS_TOKEN_EXPIRE_MINUTES

    @staticmethod
    def hash_password(password: str) -> str:
        return generate_password_hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return check_password_hash(hashed_password, plain_password)

    def create_access_token(self, data: Dict, expires_delta: Optional[timedelta] = None) -> str:
        
        to_encode = data.copy()
        
        # Set expiration time
        if expires_delta:
            expire = datetime.now() + expires_delta
        else:
            expire = datetime.now() + timedelta(minutes=self.access_token_expire_minutes)
        
        to_encode.update({
            'exp': expire,
            'iat': datetime.now()  # issued at
        })
        
        # Encode JWT
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt
    
    def decode_token(self, token: str) -> Dict:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError('Token đã hết hạn')
        except jwt.InvalidTokenError:
            raise ValueError('Token không hợp lệ')
        except Exception as e:
            raise ValueError(f'Lỗi xác thực token: {str(e)}')
    
    def verify_token(self, token: str) -> Dict:
        return self.decode_token(token)

    def create_user_token(self, user_id: str, email: str, **kwargs) -> str:
        payload = {
            'user_id': user_id,
            'email': email,
            **kwargs
        }
        return self.create_access_token(payload)

    def extract_token_from_header(self, auth_header: str) -> Optional[str]:
        if not auth_header:
            return None
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return None
        return parts[1]
    
    def validate_token_payload(self, payload: Dict, required_fields: list = None) -> bool:
        if required_fields is None:
            required_fields = ['user_id', 'email']
        return all(field in payload for field in required_fields)

security = Security()