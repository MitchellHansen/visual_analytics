# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for,jsonify
# Import password / encryption helper tools
from werkzeug import check_password_hash, generate_password_hash
# Import the database object from the main app module
from app import db
# Import module forms
from app.mod_auth.forms import LoginForm
# Import module models (i.e. User)
from app.mod_auth.models import User
from app import mysql

# Define the blueprint: 'auth', set its url prefix: app.url/auth
mod_auth = Blueprint('auth', __name__, url_prefix='/auth')

@mod_auth.route('/home')
def index():
    return render_template("auth/index.html")

@mod_auth.route('/about')
def about():
    return 'Visual Analytics is a team that...'

@mod_auth.route('/training')
def training():
    return 'The training is working'

@mod_auth.route('/admin_login', methods=['GET', 'POST'])
def admin():
   # email = request.form['email']
   # password = request.form['password']    
   #  email = content['email']
   # password = content['password']
    #username = request.args.get('email')
    #password = request.args.get('password')
    email = 'elliottwalsh94@gmail.com'
    password = 'Elliott123'
    admin = {}
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from admin where email='" + email + "' and password='" + password + "'")
    data = cursor.fetchone()
    if data is None:
     return "Admin does not exist in the SQL DB"
    else:
     admin['email'] = email
     admin['status'] = 'Success'
     return jsonify(admin)

@mod_auth.route('/create_trial')
def create_trial():
    # Take or generate cordanites and send them to the DB as a new trial
    # Return them back to the user via slack
    return 'Dummy data from create_trial'

@mod_auth.route('/get_results')
def get_results():
    # Take an argument from UI including a test set ID and optionally a ID or graph ID
    return "Dummy data from get_results"







