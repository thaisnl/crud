from app.models.usuario import Usuario
from app.common.validacoes import validar_cpf, validar_email, validar_pis, remover_pontuacao

# ------------------------------------- AUXILIARES -------------------------------------

# Função auxiliar para retornar o Usuário correspondente após o login
def usuario_correspondente(identificador: str) -> Usuario:
    if validar_email(identificador):
        return Usuario.query.filter_by(_email=identificador.lower()).first()
    elif validar_cpf(identificador):
        return Usuario.query.filter_by(_cpf=remover_pontuacao(identificador)).first()
    elif validar_pis(identificador):
        return Usuario.query.filter_by(_pis=remover_pontuacao(identificador)).first()

# Função auxiliar para retornar o Usuário a partir do cpf
def usuario_por_cpf(cpf: str) -> Usuario:
    if validar_cpf(cpf):
        return Usuario.query.filter_by(_cpf=cpf).first()