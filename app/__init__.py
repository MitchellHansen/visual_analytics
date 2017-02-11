# iMport flask and template operators
from flask import Flask, render_template
from flaskext.mysql import MySQL

# Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
# Define the WSGI application object
app = Flask(__name__)
CORS(app)
mysql = MySQL()


app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'kat'
app.config['MYSQL_DATABASE_DB'] = 'visual_db'
mysql.init_app(app)

# Configurations
app.config.from_object('config')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Import a module / component using its blueprint handler variable (mod_auth)
from app.mod_auth.controllers import mod_auth as auth_module

# Register blueprint(s)
app.register_blueprint(auth_module)
# app.register_blueprint(xyz_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()
