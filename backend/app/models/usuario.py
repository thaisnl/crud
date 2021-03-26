from werkzeug.security import generate_password_hash, check_password_hash

from app import db, ma
from app.common.validacoes import checar_somente_letras, checar_somente_numeros, validar_cpf, validar_email, validar_pis, validar_senha, checar_vazio, remover_pontuacao

class Usuario(db.Model):

    __tablename__ = 'usuarios'

    _cpf = db.Column('cpf', db.String(20), primary_key=True)
    _pis = db.Column('pis', db.String(20), index=True, unique=True, nullable=False)
    _email = db.Column('email', db.String(40), index=True, unique=True, nullable=False)
    _nome = db.Column('nome', db.String(50), index=True, nullable=False)
    _pais = db.Column('pais', db.String(20), nullable=False)
    _estado = db.Column('estado', db.String(20), nullable=False)
    _municipio = db.Column('municipio', db.String(20), nullable=False)
    _cep = db.Column('cep', db.String(20), nullable=False)
    _rua = db.Column('rua', db.String(40), nullable=False)
    _numero = db.Column('numero', db.Integer, nullable=False)
    complemento = db.Column('complemento', db.String(20))
    _senha = db.Column('senha', db.String(128), nullable=False)

    def __init__(self, obj):
        nome = obj.get('nome')
        pis = obj.get('pis')
        cpf = obj.get('cpf')
        email = obj.get('email')
        senha = obj.get('senha')
        pais = obj.get('pais')
        estado = obj.get('estado')
        municipio = obj.get('municipio')
        cep = obj.get('cep')
        rua = obj.get('rua')
        numero = obj.get('numero')
        complemento = obj.get('complemento')
        
        self.nome = nome
        self.pis = pis
        self.cpf = cpf
        self.email = email
        self.rua = rua
        self.numero = numero
        self.complemento = complemento
        self.cep = cep
        self.estado = estado
        self.municipio = municipio
        self.pais = pais
        self.senha = senha

    @property
    def nome(self):
        return self._nome
    
    @nome.setter
    def nome(self, novo_nome):
        checar_vazio('nome', novo_nome)
        checar_somente_letras('nome', novo_nome)
        self._nome = novo_nome
    
    @property
    def pais(self):
        return self._pais
    
    @pais.setter
    def pais(self, novo_pais):
        checar_vazio('país', novo_pais)
        checar_somente_letras('país', novo_pais)
        self._pais = novo_pais
    
    @property
    def estado(self):
        return self._estado
    
    @estado.setter
    def estado(self, novo_estado):
        checar_vazio('estado', novo_estado)
        checar_somente_letras('estado', novo_estado)
        self._estado = novo_estado
    
    @property
    def municipio(self):
        return self._municipio
    
    @municipio.setter
    def municipio(self, novo_municipio):
        checar_vazio('município', novo_municipio)
        checar_somente_letras('município', novo_municipio)
        self._municipio = novo_municipio
    
    @property
    def numero(self):
        return self._numero
    
    @numero.setter
    def numero(self, novo_numero):
        checar_vazio('número', novo_numero)
        self._numero = novo_numero
    
    @property
    def cep(self):
        return self._cep

    @cep.setter
    def cep(self, novo_cep):
        novo_cep = remover_pontuacao(novo_cep)
        checar_vazio('cep', novo_cep)
        checar_somente_numeros('cep', novo_cep)
        self._cep = novo_cep
    
    @property
    def rua(self):
        return self._rua
    
    @rua.setter
    def rua(self, nova_rua):
        checar_vazio('rua', nova_rua)
        self._rua = nova_rua

    @property
    def senha(self):
        raise AttributeError('A senha não é um atributo legível')
    
    @senha.setter
    def senha(self, nova_senha):
        checar_vazio('senha', nova_senha)
        if validar_senha(nova_senha):
            self._senha = generate_password_hash(nova_senha)
        else:
            raise AttributeError("A nova senha deve possuir pelo menos 8 caracteres, com uma letra e um número")

    def checar_senha(self, senha):
        return check_password_hash(self._senha, senha)
        
    @property
    def cpf(self):
        return self._cpf
        
    @cpf.setter
    def cpf(self, novo_cpf):
        checar_vazio('cpf', novo_cpf)
        if not self._cpf:
            if validar_cpf(novo_cpf):
                novo_cpf = remover_pontuacao(novo_cpf)
                if Usuario.query.filter_by(_cpf=novo_cpf).first():
                   raise AttributeError("O CPF já existe no sistema")
                self._cpf = novo_cpf
            else:
                raise AttributeError("O CPF não é válido")
        else:
            raise AttributeError("Impossível alterar CPF")
 
    @property
    def pis(self):
        return self._pis

    @pis.setter
    def pis(self, novo_pis):
        checar_vazio('pis', novo_pis)
        if not self._pis:
            if validar_pis(novo_pis):
                novo_pis = remover_pontuacao(novo_pis)
                if Usuario.query.filter_by(_pis=novo_pis).first():
                   raise AttributeError("O PIS já existe no sistema")
                self._pis = novo_pis
            else:
                raise AttributeError("O PIS não é válido")
        else:
            raise AttributeError("Impossível alterar PIS")

    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, novo_email):
        checar_vazio('email', novo_email)
        if validar_email(novo_email):
            novo_email = novo_email.lower()
            if Usuario.query.filter_by(_email=novo_email).first():
               raise AttributeError("O e-mail já existe no sistema")
            self._email = novo_email
        else:
            raise AttributeError("E-mail não é válido")

    def atualizar_usuario(self, req):
        for chave, valor in req.items():
            setattr(self, chave, valor)

# ------------------------------ SCHEMA ------------------------------
class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('cpf', 'pis', 'email', 'nome', 'pais', 'estado', 'municipio', 'cep', 'rua', 'numero', 'complemento', 'senha')

usuario_schema = UsuarioSchema()



