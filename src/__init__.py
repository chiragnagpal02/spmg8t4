from flask import Flask
from src.databases import db
from src.trial import tryme
import os

def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        SECRET_KEY='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',
        SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DATABASE_URI")
    )

    db.app = app
    db.init_app(app)

    app.register_blueprint(tryme)

    return app