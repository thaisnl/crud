import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow

from config import app_config

db = SQLAlchemy()

# Instanciação + inicialização
app = Flask(__name__, instance_relative_config=True)
config_type = 'production'
app.config.from_object(app_config[config_type])
app.config.from_pyfile('config.py')
CORS(app)
db.init_app(app)

ma = Marshmallow(app)
migrate = Migrate(app, db)

from app.models import usuario
from app.controllers import usuario, auth
from app.routes import rotas




