import re, string

# ------------------------------------- VALIDAÇÕES ------------------------------------- 
# Função para checar se a string só contém números
def checar_somente_letras(atributo, novo_atributo):
    if not novo_atributo.isalpha():
        raise AttributeError("O campo " + atributo + " deve conter somente letras")
    
# Função para checar se o atributo é vazio
def checar_vazio(atributo, novo_atributo):
    if not novo_atributo:
        raise AttributeError("O campo " + atributo + " não pode ser vazio")

# Função para fazer validação de e-maill  
def validar_email(email: str) -> bool:
    padrao = re.compile("^[\w-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}")
    return True if padrao.search(email) else False

# Função para fazer validação de senha -> mínimo 8 caracteres, uma letra e um número
def validar_senha(senha: str) -> bool:
    padrao = re.compile("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")
    return True if padrao.search(senha) else False

# Função para checar se o cpf é válido
def validar_cpf(cpf: str) -> bool:

    if not cpf:
        return False

    numeros = [int(digit) for digit in cpf if digit.isdigit()]

    if len(numeros) != 11 or len(set(numeros)) == 1:
        return False

    soma_dos_produtos = sum(a*b for a, b in zip(numeros[0:9], range(10, 1, -1)))
    digito_esperado = (soma_dos_produtos * 10 % 11) % 10
    if numeros[9] != digito_esperado:
        return False

    soma_dos_produtos = sum(a*b for a, b in zip(numeros[0:10], range(11, 1, -1)))
    digito_esperado = (soma_dos_produtos * 10 % 11) % 10
    if numeros[10] != digito_esperado:
        return False

    return True

# Função para checar se o pis é válido
def validar_pis(pis: str) -> bool:
    if not pis:
        return False

    numeros = [int(digit) for digit in pis if digit.isdigit()]
    pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    if len(numeros)!=11:
        return False

    soma = 0
    for n in range(10):
        soma = soma + (pesos[n] * numeros[n])
    
    resto = soma % 11
    resultado = 11 - resto
    digito_esperado = resultado if resultado<10 else 0

    if digito_esperado == numeros[10]:
        return True

    return False

# Função auxiliar para remover a pontuação de um dado recebido
def remover_pontuacao(atributo):
    return atributo.translate(str.maketrans('', '', string.punctuation))



