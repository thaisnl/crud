from app import app
from flask import jsonify
from app.controllers import usuario, auth

@app.route('/', methods=['GET'])
@auth.requer_autenticacao
def retornar_usuario():
    return usuario.retornar_usuario()

#TODO FAZER O GET USUARIOS 
@app.route('/login', methods=['POST'])
def login():
    return auth.login()

@app.route('/cadastrar', methods=['POST'])
def cadastrar_usuario():
    return usuario.cadastrar_usuario()

@app.route('/remover', methods=['DELETE'])
@auth.requer_autenticacao
def remover_usuario():
    return usuario.remover_usuario()

@app.route('/editar', methods=['PATCH'])
@auth.requer_autenticacao
def editar_usuario():
    return usuario.editar_usuario()