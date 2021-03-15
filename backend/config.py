class Config(object):
    # Configurações gerais
    #TODO TESTE
    TESTING = False
    DEBUG = False

class DevelopmentConfig(Config):
    # Configurações de desenvolvimento
    DEBUG = True

class ProductionConfig(Config):
    # Configurações de produção
    DEBUG = False

class TestingConfig(Config):
    # Configurações de teste
    TESTING = True
    SQLALCHEMY_ECHO = True

# TODO checar qual (se for) padrão de projeto é esse
app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}