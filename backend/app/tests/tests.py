import unittest
import os
import json

from app.models.usuario import Usuario
from app import app,db
from app.common.utils import usuario_correspondente, usuario_por_cpf
from app.common.validacoes import validar_cpf, validar_email, validar_pis, validar_senha, remover_pontuacao
from config import app_config

usuario_a_cadastrar = {
                'cpf': '914.465.530-43',
                'nome': 'Teste',
                'senha':'Testando123',
                'pis':'977.52897.25-2',
                'rua':'dois',
                'pais':'Brasil',
                'email':'Teste@gmail.com',
                'cep':'3574242',
                'estado':'CE',
                'municipio':'Fortaleza',
                'numero':'16'
            }

usuario_a_logar = {
                'login':'teste@gmail.com',
                'senha':'Testando123'
            }

usuario_a_editar = {
                'complemento':'dois',
                'rua': '4'
            }

usuario_novo = {
                'cpf':'491.262.130-79',
                'nome': 'Teste',
                'senha':'Testando123',
                'pis':'068.15841.96-4',
                'rua':'dois',
                'pais':'Brasil',
                'email':'teste2@gmail.com',
                'cep':'3574242',
                'estado':'CE',
                'municipio':'Fortaleza',
                'numero':'16'
}
pis_repetido = usuario_novo
pis_repetido['pis'] = usuario_a_cadastrar['pis']

cpf_repetido = usuario_novo
cpf_repetido['cpf'] = usuario_a_cadastrar['cpf']

email_repetido = usuario_novo
email_repetido['email'] = usuario_a_cadastrar['email']

usuario_invalido = {
                'cpf':'49132456423',
                'email': 'invalido',
                'senha': '1234',
                'pis':'23465432189'
                }

login_invalido = {
                'login':'invalido@gmail.com',
                'senha':'invalido'
                }


class BasicTests(unittest.TestCase):
 
    # --------------------- SETUP + TEARDOWN -----------------------

    # Executados antes de cada teste
    def setUp(self):
        app.config.from_object(app_config['testing'])
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()

        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()
        #self.assertEqual(app.debug, False)
 
    # Executados depois de cada teste
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    

    # ------------------ MÉTODOS AUXILIARES ------------------
    def cadastrar_usuario(self, usuario):
        return self.app.post('/cadastrar', json=usuario)
    
    def login_usuario(self, usuario):
        return self.app.post('/login', json=usuario)
 
    # ----------------------- TESTES ---------------------------
    def test_validar_senha_invalida(self):
        res = validar_senha(usuario_invalido['senha'])
        self.assertEquals(res, False)
    
    def test_validar_senha_valida(self):
        res = validar_senha(usuario_a_cadastrar['senha'])
        self.assertEquals(res, True)
    
    def test_validar_pis_invalido(self):
        res = validar_pis(usuario_invalido['pis'])
        self.assertEquals(res, False)
    
    def test_validar_pis_valido(self):
        res = validar_pis(usuario_a_cadastrar['pis'])
        self.assertEquals(res, True)

    def test_validar_cpf_invalido(self):
        res = validar_cpf(usuario_invalido['cpf'])
        self.assertEquals(res,False)
    
    def test_validar_cpf_valido(self):
        res = validar_cpf(usuario_a_cadastrar['cpf'])
        self.assertEquals(res, True)
    
    def test_validar_email_invalido(self):
        res = validar_email(usuario_invalido['email'])
        self.assertEquals(res, False)

    def test_validar_email_valido(self):
        res = validar_email(usuario_a_cadastrar['email'])
        self.assertEquals(res, True)

    def test_checar_senha(self):
        usuario = Usuario(usuario_a_cadastrar)
        res = usuario.checar_senha(usuario_a_cadastrar['senha'])
        self.assertEquals(res, True)

    def test_retornar_usuario_pis(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        res = usuario_correspondente(usuario_a_cadastrar['pis'])
        self.assertEqual(res.cpf, remover_pontuacao(usuario_a_cadastrar['cpf']))
    
    def test_retornar_usuario_cpf(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        res = usuario_correspondente(usuario_a_cadastrar['cpf'])
        self.assertEqual(res.cpf, remover_pontuacao(usuario_a_cadastrar['cpf']))

    def test_retornar_usuario_email(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        res = usuario_correspondente(usuario_a_cadastrar['email'])
        self.assertEqual(res.cpf, remover_pontuacao(usuario_a_cadastrar['cpf']))

    def test_criar_usuario(self):
        usuario = Usuario(usuario_a_cadastrar)
        self.assertEquals(usuario.nome, usuario_a_cadastrar['nome'])
        self.assertEquals(usuario.cpf, remover_pontuacao(usuario_a_cadastrar['cpf']))
        self.assertEquals(usuario.pis, remover_pontuacao(usuario_a_cadastrar['pis']))
        self.assertEquals(usuario.email, usuario_a_cadastrar['email'].lower())
        self.assertEquals(usuario.rua, usuario_a_cadastrar['rua'])
        self.assertEquals(usuario.pais, usuario_a_cadastrar['pais'])
        self.assertEquals(usuario.cep, usuario_a_cadastrar['cep'])
        self.assertEquals(usuario.estado, usuario_a_cadastrar['estado'])
        self.assertEquals(usuario.municipio, usuario_a_cadastrar['municipio'])
        self.assertEquals(usuario.numero, usuario_a_cadastrar['numero'])
        self.assertEquals(usuario.checar_senha(usuario_a_cadastrar['senha']), True)

    def test_atualizar_usuario(self):
        usuario = Usuario(usuario_a_cadastrar)
        usuario.atualizar_usuario(usuario_a_editar)
        self.assertEquals(usuario.complemento, usuario_a_editar['complemento'])
        self.assertEquals(usuario.rua, usuario_a_editar['rua'])

    def test_login(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        res = self.login_usuario(usuario_a_logar)
        self.assertEqual(res.status_code, 200)
    
    def test_login_invalido(self):
        res = self.login_usuario(login_invalido)
        self.assertEqual(res.status_code, 401)

    def test_post(self):
        res = self.cadastrar_usuario(usuario_a_cadastrar)
        self.assertEqual(res.status_code, 200)
    
    def test_post_pis_repetido(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        res = self.cadastrar_usuario(pis_repetido)
        self.assertEqual(res.status_code, 400)

    def test_post_cpf_repetido(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        res = self.cadastrar_usuario(cpf_repetido)
        self.assertEqual(res.status_code, 400)

    def test_post_email_repetido(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        res = self.cadastrar_usuario(email_repetido)
        self.assertEqual(res.status_code, 400)

    def test_post_usuario_invalido(self):
        res = self.cadastrar_usuario(usuario_invalido)
        self.assertEqual(res.status_code, 400)

 
    def test_get_sem_login(self):
        res = self.app.get('/usuario')
        self.assertEqual(res.status_code, 401)
    
    def test_get_com_login(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        self.login_usuario(usuario_a_logar)
        res = self.app.get('/usuario')
        self.assertEqual(res.status_code, 200)
    
    def test_update_com_login(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        self.login_usuario(usuario_a_logar)
        res = self.app.patch('/editar', json=usuario_a_editar)
        self.assertEqual(res.status_code, 200)
    
    def test_update_sem_login(self):
        res = self.app.patch('/editar', json=usuario_a_editar)
        self.assertEqual(res.status_code, 401)
    
    def test_delete_sem_login(self):
        res = self.app.delete('/remover')
        self.assertEqual(res.status_code, 401)

    def test_delete_com_login(self):
        self.cadastrar_usuario(usuario_a_cadastrar)
        self.login_usuario(usuario_a_logar)
        res = self.app.delete('/remover')
        self.assertEqual(res.status_code, 200)
    
 
if __name__ == "__main__":
    unittest.main()