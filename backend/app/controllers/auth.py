import jwt 
from flask import request, jsonify, make_response
from app import app
from functools import wraps
from datetime import datetime, timedelta

from app.models.usuario import Usuario, usuario_schema
from app.common.utils import usuario_correspondente, remover_pontuacao

# Função para realizar o login do usuário  
def login():
    req = request.get_json(force=True)

    login = req.get('login')
    senha = req.get('senha')

    if not login or not senha:
        return jsonify({
                    'message':'Por favor, preencha todos os campos',
                    'data':{}
                }), 401
    
    usuario = usuario_correspondente(login)
    if usuario:
        if usuario.checar_senha(senha):
            token = gerar_token(usuario)
            ret = usuario_schema.dump(usuario)
            res = make_response(
                    jsonify({
                        'message':'Logado com sucesso', 
                        'data': ret
                    }), 200)  

            res.set_cookie('cpf', usuario.cpf)
            res.set_cookie('token', token)

            return res

    return jsonify({
                'message': 'Usuário ou senha inválidos', 
                'data':{}
            }), 401

# Função para gerar o token jwt de autenticação
# Recebe como parâmetro um Usuario
def gerar_token(usuario):
    token = jwt.encode({ 
            'cpf': usuario.cpf, 
            'exp' : datetime.utcnow() + timedelta(minutes = 30) }, 
            app.config['SECRET_KEY'],
            algorithm='HS256') 
    return token
 
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
            retorno = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

            # Se o cookie cpf não for igual ao cpf criptografado no token, request é barrada
            # P/ caso da pessoa adulterar o cookie do cpf
            if retorno['cpf'] != request.cookies.get('cpf'):
                return jsonify({
                            'message' : 'Usuário não autenticado', 
                            'data':{}
                        }), 401
        except: 
            return jsonify({
                        'message' : 'O token é inválido',
                        'data':{}
                    }), 401

        return  f(*args, **kwargs) 
    return decorated
