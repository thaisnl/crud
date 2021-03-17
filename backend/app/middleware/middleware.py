import jwt 
from flask import request, jsonify
from app import app
from functools import wraps

# Função para checar se o usuário está autenticado e se o token é válido
# Vai servir como decorator para as rotas
def requer_autenticacao(f): 
    @wraps(f) 
    def decorated(*args, **kwargs): 
        token = request.cookies.get('token')

        if not token: 
            return jsonify({
                        'message' : 'Usuário não autenticado', 
                        'data':{}
                    }), 401
   
        try: 
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except: 
            return jsonify({
                        'message' : 'O token é inválido',
                        'data':{}
                    }), 401

        return  f(*args, **kwargs) 
    return decorated
