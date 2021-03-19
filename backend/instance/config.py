SECRET_KEY = "senhasecreta"
SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@{}:5432/db-pontotel".format('postgres-db')
CORS_ALLOW_CREDENTIALS = True
CORS_SUPPORTS_CREDENTIALS=True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5000',
    'http://localhost:3000'
]