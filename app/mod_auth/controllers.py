# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for,jsonify, json
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


@mod_auth.route('/training')
def training():
    return 'The training is working'

@mod_auth.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    email = request.json['email']
    password = request.json['password']

    admin = {}
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from admin where email='" + email + "' and password='" + password + "'")
    data = cursor.fetchone()
    if data is None:
        return "No admin found with that email and password"
    else:
        admin['email'] = email
        admin['status'] = 'Success'
    return jsonify(admin)

@mod_auth.route('/auth/get_test_set_statuses')
def get_test_set_statuses():
    login_token = request.json['login_token']
    filters = request.json['filter']

    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from test_set_results where status='" + 'filters")
    data = cursor.fetchone()
    if data is None:
        return "No admin found with that email and password"
    else:
        return jsonify(data)

@mod_auth.route('/auth/get_test_templates')
def get_test_templates():
    login_token = request.json['login_token']
    filters = request.json['filter']

    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * FROM test_sets_results WHERE status=filters")
    data = cursor.fetchone()
    if data is None:
        return "There are no graphs for this test_set_id"
    else:
        return jsonify(data)


@mod_auth.route('/auth/trial_log_in', methods=['GET', 'POST'])
def trial_log_in():
    app_user_id = request.json['login_code']
    #test_set_id = request.json['test_set_id']

    user = {}
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from test_sets where app_user_id='" + 'app_user_id ")
    data = cursor.fetchone()
    if data is None:
        return "Invalid User"
    else:
        user['app_user_id'] = app_user_id
        user['status'] = 'Success'
    return jsonify(user)
