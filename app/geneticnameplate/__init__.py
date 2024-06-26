from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from app.config import Config

bcrypt = Bcrypt()
jwt = JWTManager()

def create_geneticnameplate(config_class=Config):
    geneticnameplate = Flask(__name__)
    geneticnameplate.config.from_object(config_class)

    bcrypt.init_app(geneticnameplate)
    jwt.init_app(geneticnameplate)

    return geneticnameplate
