import jwt, traceback
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
            res = make_response(
                    jsonify({
                        'message':'Logado com sucesso', 
                        'data': {
                            'token': token,
                            'expDate': datetime.utcnow() + timedelta(minutes = 30)
                        }
                    }), 200)  

            res.set_cookie('token', token, httponly=True)

            return res

    return jsonify({
                'message': 'Usuário ou senha inválidos', 
                'data':{}
            }), 401

# Função para realizar o logout do usuário
def logout():
    res = make_response(
            jsonify({
                'message':'Logout bem sucedido', 
                'data': {}
            }), 200)
    res.set_cookie('token', '', expires=0)
    return res

# Função para gerar o token jwt de autenticação
# Recebe como parâmetro um Usuario
def gerar_token(usuario):
    token = jwt.encode({ 
            'cpf': usuario.cpf, 
            'exp' : datetime.utcnow() + timedelta(minutes = 30) }, 
            app.config['SECRET_KEY'],
            algorithm='HS256') 
    return token
 