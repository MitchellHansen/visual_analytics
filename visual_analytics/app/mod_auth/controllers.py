# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for,jsonify, json, make_response
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
import csv
import StringIO 
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
    data = cursor.fetchall()
    if data is None:
        return "No tests found"
    else:
        return json.dumps(data)

@mod_auth.route('/get_template_details', methods=['GET', 'POST'])
def get_template_details():
    return json.dumps("SHITS WORKING")




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

@mod_auth.route('/get_template_ids', methods=['GET', 'POST'])
def get_template_ids():
    login_token = None
    filters = None
    filters = request.json['filters']
    login_token = request.json['login_token']
    conn = mysql.connect()
    cursor = conn.cursor()
    if(filters==0 or filters=="0"):
        cursor.execute("SELECT template_id, graph_type from templates")
    else:
        cursor.execute("SELECT template_id, graph_type from templates where graph_type={0}".format(filters))
    data = cursor.fetchall()
    if data is None:
        return "No tests found"
    else:
        return json.dumps(data)
    
@mod_auth.route('/delete_test_set', methods=['GET', 'POST'])
def delete_test_set():
    token = None
    test_set_id = None
    token = request.json['login_token']
    test_set_id = request.json['test_set_id']

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('DELETE test_set_result FROM  test_set_result INNER JOIN test_set_user_login_id on test_set_result.login_uuid = test_set_user_login_id.login_uuid WHERE test_set_id= \'{0}\''.format(test_set_id))
    conn.commit()
    cursor.execute('DELETE FROM test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id))
    conn.commit()
    cursor.execute('DELETE FROM test_set_template_list WHERE test_set_id=\'{0}\''.format(test_set_id))
    conn.commit()
    return json.dumps("Your test set has been deleted")

@mod_auth.route('/delete_template', methods=['GET', 'POST'])
def delete_template():
    token = None
    test_set_id = None
    token = request.json['login_token']
    template_id = request.json['template_id']

    conn = mysql.connect()
    cursor = conn.cursor()
    row_count = cursor.execute('SELECT test_set_id FROM test_set_template_list WHERE template_id=\'{0}\''.format(template_id))
    if row_count== 0:
        cursor.execute('DELETE FROM test_set_result WHERE template_id=\'{0}\''.format(template_id))
	conn.commit()
        cursor.execute('DELETE FROM templates WHERE template_id=\'{0}\''.format(template_id))
	conn.commit()
        return json.dumps("Template removed")
    else:
        return json.dumps("Sorry, template_id is being used")

@mod_auth.route('/open_test', methods=['GET', 'POST'])
def open_test():
    token = None
    test_set_id = None
    token = request.json['login_token']
    test_set_id = request.json['test_set_id']
    return json.dumps("SUCCESS")


@mod_auth.route('/close_test', methods=['GET', 'POST'])
def close_test():
    token = None
    test_set_id = None
    token = request.json['login_token']
    test_set_id = request.json['test_set_id']
    return json.dumps("SUCCESS")

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

@mod_auth.route('/submit_user_trial_results', methods=['GET', 'POST'])
def submit_user_trial_results():
    results = None
    token = None
    time = None
    #time = request.json['time']
    results = request.json['results']
    token = request.json['login_uuid']
    class_choice = []
    selected_point = [] 
    data_points = []
    
    for i in results:
	class_choice.append(i['class'])
	selected_point.append(i['selected_point'])
	data_points.append(i['data'])
    
    class_choice = str(class_choice)
    selected_point = str(selected_point)
    data_points = str(data_points)

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("UPDATE test_set_result SET result=\'{0}\', time=\'{1}\', selected_point=\'{2}\', class=\'{3}\', data_points=\'{4}\' WHERE login_uuid=\'{5}\' and class IS NULL".format('94', '45', selected_point, class_choice, data_points, token)) 
    conn.commit()
    return json.dumps("SUCCESS")

@mod_auth.route('/export_csv', methods=['GET', 'POST'])
def export_csv():
    token = None
    test_set_id = None
    test_set_id = request.json['test_set_id']
    token = request.json['login_token']
    si = StringIO.StringIO()
    cw = csv.writer(si)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM  test_set_result INNER JOIN test_set_user_login_id on test_set_result.login_uuid = test_set_user_login_id.login_uuid WHERE test_set_id=\'{0}\''.format(test_set_id))
    data = cursor.fetchall()
    cw.writerow([i[0] for i in cursor.description])
    cw.writerows(data)
    response = make_response(si.getvalue())
    response.headers['Content-Disposition'] = 'attachment; filename=report.csv'
    response.headers["Content-type"] = "text/csv"
    return response
    

