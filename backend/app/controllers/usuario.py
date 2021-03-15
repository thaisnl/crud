from app import db
from flask import request, jsonify, make_response
import re
from app.models.usuario import Usuario, usuario_schema
from app.common.utils import usuario_por_cpf, usuario_correspondente

# ------------------------------ MÉTODOS HTTP  ------------------------------

# GETs
def retornar_usuario():
    cpf = request.cookies.get('cpf')
    usuario = usuario_por_cpf(cpf)
    if usuario:
        res = usuario_schema.dump(usuario)
        return jsonify({
                    'message':'Retornou com sucesso', 
                    'data':res
                }), 200

    return jsonify({
                'message':'Usuário não existe', 
                'data': {}
            }), 404

#POSTs
def cadastrar_usuario():
    req = request.get_json(force=True)

    try:
        usuario = Usuario(req)
        res = usuario_schema.dump(usuario)
        db.session.add(usuario)
        db.session.commit()
        return jsonify({
                    'message': 'Registro bem sucedido', 
                    'data': res
                }), 200

    except AttributeError as err:
        return jsonify({
                    'message': str(err), 
                    'data':{}
                }), 400
    except:
        return jsonify({
                    'message': 'Erro no cadastro', 
                    'data': {}
                }), 500

#UPDATEs     
def editar_usuario():
    req = request.get_json(force=True)

    cpf = request.cookies.get('cpf')
    usuario = usuario_por_cpf(cpf)

    if not usuario:
        return jsonify({
                    'message':'Usuário não existe', 
                    'data':{}
                }), 404
    
    try:
        usuario.atualizar_usuario(req)
        db.session.commit()
        res = usuario_schema.dump(usuario)
        return jsonify({
                    'message':'Usuário atualizado com sucesso', 
                    'data': res
                }), 200
    except AttributeError as err:
        return jsonify({
                    'message':str(err), 
                    'data':{}
                }), 400
    except:
        return jsonify({
                    'message': 'Erro na atualização', 
                    'data':{}
                }), 500

#DELETEs       
def remover_usuario():
    cpf = request.cookies.get('cpf')
    usuario = usuario_por_cpf(cpf)
    if not usuario:
        return jsonify({
                    'message':'Usuário não existe', 
                    'data':{}
                }), 404
    else:
        try:
            db.session.delete(usuario)
            db.session.commit()
            ret = usuario_schema.dump(usuario)

            res = make_response(jsonify({
                                    'message':'Usuário deletado com sucesso', 
                                    'data':ret
                                }), 200)
            res.delete_cookie('cpf')
            res.delete_cookie('token')
            return res
        except:
            return jsonify({
                        'message':'Erro na deleção', 
                        'data':{}
                    }), 500


