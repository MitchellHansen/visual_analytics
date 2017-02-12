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
import uuid
# Define the blueprint: 'auth', set its url prefix: app.url/auth
mod_auth = Blueprint('auth', __name__, url_prefix='/auth')

@mod_auth.route('/home')
def index():
    return render_template("auth/index.html")

@mod_auth.route('/get_test_set_statuses', methods=['GET', 'POST'])
def get_test_set_statuses():
    login_token = None
    filters = None
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    filters = request.json['filters']
    cursor = mysql.connect().cursor()
    if(filters==0 or filters=="0"):
        cursor.execute("SELECT test_set_id, status from test_set_details")
    else:
        cursor.execute("SELECT test_set_id, status from test_set_details where status={0}".format(filters))
    data = cursor.fetchone()
    if data is None:
        return "No tests found"
    else:
        return json.dumps(data)


@mod_auth.route('/get_test_set_details', methods=['GET', 'POST'])
def get_test_set_details():
    login_token = None
    test_set_id = None
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    test_set_id = request.json['test_set_id']
    print(test_set_id)
    test_set_details={}
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * from test_set_details where test_set_id=\'{0}\'".format(test_set_id))
    test_details = cursor.fetchall()
    cursor.execute("SELECT login_uuid from test_set_user_login_id where test_set_id=\'{0}\'".format(test_set_id))
    users = cursor.fetchall()
    cursor.execute("SELECT template_id from test_set_template_list where test_set_id=\'{0}\'".format(test_set_id))
    template_list = cursor.fetchall()
    test_set_details ={
        'test_details':test_details,
	'users':users,
        'template_list':template_list
    }
    return json.dumps(test_set_details)

@mod_auth.route('/get_test_templates')
def get_test_templates():
    filters = request.json['filters']
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * FROM test_set_result WHERE status={0}".format(filters))
    data = cursor.fetchone()
    if data is None:
        return "There are no graphs for this test_set_id"
    else:
        return json.dumps(data)


@mod_auth.route('/trial_login', methods=['GET', 'POST'])
def trial_login():
    login_uuid = None
    login_uuid = request.json['login_uuid']

    user = {}
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from test_set_user_login_id where login_uuid=\'{0}\'".format(login_uuid))
    data = cursor.fetchone()
    if data is None:
        return json.dumps("Invalid User")
    else:
        user['status'] = 'Success'
    return json.dumps(user)

def check_token(token):
    token = token
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * FROM admin where uuid=\'{0}\'".format(token))
    data = cursor.fetchone()
    if (data is None):
        return False
    else:
	return True

@mod_auth.route('/admin_login', methods=['GET','POST'])
def admin_login():
    email = None
    password = None
    
    email = request.json['email']
    email = "\'"+email+"\'"
    password = request.json['password']
    password = "\'"+password+"\'"
    conn = mysql.connect()
    cursor = conn.cursor()
    if(email is None or password is None):
        return json.dumps("")
    else:
        cursor.execute("SELECT * FROM admin where email={0} and password={1}".format(email, password))
    data = cursor.fetchone()
    if(data is None):
	return json.dumps("Email and password is not correct")
    else:
	data = None
	cursor.execute("SELECT uuid FROM admin where email={0} and password={1}".format(email, password))
	data = cursor.fetchone()
	if(data[0] is None):
	    new_UUID = str(uuid.uuid4())
	    new_uuid = "\'"+str(new_UUID)+"\'"
	    cursor.execute("UPDATE admin SET uuid={0} WHERE email={1} and password={2}".format(new_uuid, email, password))
            conn.commit()
        
	cursor.execute("SELECT uuid FROM admin where email={0} and password={1}".format(email, password))
        return json.dumps(cursor.fetchone())
