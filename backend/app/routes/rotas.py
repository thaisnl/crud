from app import app
from flask import jsonify
from app.controllers import usuario, auth
from app.middleware import middleware

@app.route('/usuario', methods=['GET'])
@middleware.requer_autenticacao
def retornar_usuario():
    return usuario.retornar_usuario()

@app.route('/login', methods=['POST'])
def login():
    return auth.login()

@app.route('/logout', methods=['DELETE'])
@middleware.requer_autenticacao
def logout():
    return auth.logout()

@app.route('/cadastrar', methods=['POST'])
def cadastrar_usuario():
    return usuario.cadastrar_usuario()

@app.route('/remover', methods=['DELETE'])
@middleware.requer_autenticacao
def remover_usuario():
    return usuario.remover_usuario()

@app.route('/editar', methods=['PATCH'])
@middleware.requer_autenticacao
def editar_usuario():
    return usuario.editar_usuario()