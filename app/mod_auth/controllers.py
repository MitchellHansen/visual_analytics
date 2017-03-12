# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for,jsonify, json, make_response
from parent_child_gen_type_two import gen_two
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
import time
import datetime
import string


@mod_auth.route('/home')
def index():
    return render_template("auth/index.html")

@mod_auth.route('/get_test_set_statuses', methods=['GET', 'POST'])
def get_test_set_statuses():
    login_token = None
    filters = None
    response = {}
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
        response = {'status':'failed'}
        return json.dumps("No tests found")
    else:
        response = {'status':'success', 'data':data}
        return json.dumps(response)

@mod_auth.route('/get_template_details', methods=['GET', 'POST'])
def get_template_details():
    login_token = None
    template_id = None
    response = {}
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    template_id = request.json['template_id']
    print("TEMPLATE ID ", template_id)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT total_data_points from templates where template_id=\'{0}\'".format(template_id))
    total_data_points = cursor.fetchall()[0]
    cursor.execute("SELECT graph_type from templates where template_id=\'{0}\'".format(template_id))
    graph_type = cursor.fetchall()[0]
    if graph_type is None or total_data_points is None:
        response = {'status':'failed'}
    else:
        response={
            'status':'success',
            'total_data_points':total_data_points,
            'graph_type': graph_type
        }
    return json.dumps(response)

@mod_auth.route('/get_test_set_details', methods=['GET', 'POST'])
def get_test_set_details():
    login_token = None
    test_set_id = None
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    test_set_id = request.json['test_set_id']
    response={}
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * from test_set_details where test_set_id=\'{0}\'".format(test_set_id))
    test_details = cursor.fetchall()
    cursor.execute("SELECT login_uuid from test_set_user_login_id where test_set_id=\'{0}\'".format(test_set_id))
    users = cursor.fetchall()
    cursor.execute("SELECT template_id from test_set_template_list where test_set_id=\'{0}\'".format(test_set_id))
    template_list = cursor.fetchall()
    if test_details is None or users is None or template_list is None:
        response = {'status':'failed'} 
    else:
        response ={
            'status': 'success',
            'test_details':test_details,
	    'users':users,
            'template_list':template_list
        }
    return json.dumps(response)

@mod_auth.route('/get_template_ids', methods=['GET', 'POST'])
def get_template_ids():
    login_token = None
    filters = None
    response = {}
    filters = request.json['filters']
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})    
    conn = mysql.connect()
    cursor = conn.cursor()
    if(filters==0 or filters=="0"):
        cursor.execute("SELECT template_id, graph_type from templates")
    else:
        cursor.execute("SELECT template_id, graph_type from templates where graph_type={0}".format(filters))
    data = cursor.fetchall()
    if data is None:
        response = {'status':'failed'}
    else:
        response ={'status': 'success', 'template_data':data}
        return json.dumps(response)
    
@mod_auth.route('/delete_test_set', methods=['GET', 'POST'])
def delete_test_set():
    login_token = None
    test_set_id = None
    response = {}
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})    
    test_set_id = request.json['test_set_id']

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('DELETE test_set_result FROM  test_set_result INNER JOIN test_set_user_login_id on test_set_result.login_uuid = test_set_user_login_id.login_uuid WHERE test_set_id= \'{0}\''.format(test_set_id))
    conn.commit()
    cursor.execute('DELETE FROM test_set_user_login_id WHERE test_set_id=\'{0}\''.format(test_set_id))
    conn.commit()
    cursor.execute('DELETE FROM test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id))
    conn.commit()
    cursor.execute('DELETE FROM test_set_template_list WHERE test_set_id=\'{0}\''.format(test_set_id))
    conn.commit()
    response = {'status':'success'}
    return json.dumps(response)

@mod_auth.route('/delete_template', methods=['GET', 'POST'])
def delete_template():
    login_token = None
    test_set_id = None
    response = {}
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})    
    template_id = request.json['template_id']
    conn = mysql.connect()
    cursor = conn.cursor()
    row_count = cursor.execute('SELECT test_set_id FROM test_set_template_list WHERE template_id=\'{0}\''.format(template_id))
    if row_count== 0:
        cursor.execute('DELETE FROM test_set_result WHERE template_id=\'{0}\''.format(template_id))
	conn.commit()
        cursor.execute('DELETE FROM templates WHERE template_id=\'{0}\''.format(template_id))
	conn.commit()
        response = {'status':'success'}
    else:
        response = {'status':'failed'}
    return json.dumps(response)

@mod_auth.route('/open_test', methods=['GET', 'POST'])
def open_test():
    login_token = None
    test_set_id = None
    response = {}
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})    
    test_set_id = request.json['test_set_id']
    print('LOGIN TOKEN ', login_token)
    print('test_set_id ', test_set_id)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('UPDATE test_set_details SET status=\'1\' WHERE test_set_id=\'{0}\''.format(test_set_id))
    conn.commit()
    cursor.execute('SELECT status FROM test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id))
    data=cursor.fetchone()[0]
    if data==1:
        response={'status':'success'}
    else:
	response={'status':'failed'}
    return json.dumps(response)

@mod_auth.route('/close_test', methods=['GET', 'POST'])
def close_test():
    login_token = None
    test_set_id = None
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})    
    test_set_id = request.json['test_set_id']
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('UPDATE test_set_details SET status=\'2\' WHERE test_set_id=\'{0}\''.format(test_set_id))
    conn.commit()    
    cursor.execute('SELECT status FROM test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id))
    data=cursor.fetchone()[0]
    #d1 = datetime.datetime.strptime('2018-05-05T17:05', "%Y-%d-%mT%H:%M").date()
    #d2 = datetime.datetime.strptime('2019-05-05T17:05', "%Y-%d-%mT%H:%M").date()
    #print(d2<d1)
    if data==2:
        response={'status':'success'}
    else:
	response={'status':'failed'}
    return json.dumps(response)



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
    email = email
    password = request.json['password']
    password = password 


    conn = mysql.connect()
    cursor = conn.cursor()
    response = {}
    
    cursor.execute("SELECT * FROM admin where email=\'{0}\' and password=\'{1}\'".format(email, password))
    data = cursor.fetchone()
    if(data is None):
        response = {'status':'failed'}
        return json.dumps(response) 
    else:
	data = None
	cursor.execute("SELECT uuid FROM admin where email=\'{0}\' and password=\'{1}\'".format(email, password))
	data = cursor.fetchone()
	if(data[0] is None):
	    new_uuid = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(16))

	    cursor.execute("UPDATE admin SET uuid=\'{0}\' WHERE email=\'{1}\' and password=\'{2}\'".format(new_uuid, email, password))
            conn.commit()
        cursor.execute("SELECT uuid FROM admin where email=\'{0}\' and password=\'{1}\'".format(email, password))
        token = cursor.fetchone()[0]
	response={'status':'success', 'token':token}
        return json.dumps(response)

@mod_auth.route('/new_admin', methods=['GET','POST'])
def new_admin():
    login_token = None
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    email = None
    password = None

    email = request.json['email']
    email = email
    password = request.json['password']
    password = password


    conn = mysql.connect()
    cursor = conn.cursor()
    response = {}

    cursor.execute("SELECT * FROM admin where email=\'{0}\' and password=\'{1}\'".format(email, password))
    cursor.execute("Delete from admin where email=\'{0}\'".format(email))
    conn.commit()
    new_uuid = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(16))
    cursor.execute("INSERT INTO admin VALUES(\'{0}\',\'{1}\',\'{2}\')".format(email, password, new_uuid))
    conn.commit()
    response={'status':'success'}
    return json.dumps(response)




@mod_auth.route('/submit_user_trial_results', methods=['GET', 'POST'])
def submit_user_trial_results():
    template_id = None
    login_uuid = None
    result = None
    time = None
    selected_point = None
    selected_class = None
    
    login_uuid = request.json['login_uuid']
    result = request.json['result']
    time = request.json['time']
    selected_point = request.json['selected_point']
    selected_class = request.json['selected_class']

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('select template_id from test_set_result WHERE login_uuid=\'{0}\' and result is NULL'.format(login_uuid));
    data = cursor.fetchone()
    if data is None:
        response = {'status':'success','messesge':'all tests completed'}
        return json.dumps(response)
    template_id = data[0]
    
    cursor.execute("UPDATE test_set_result SET result=\'{0}\', time=\'{1}\', selected_point=\'{2}\', class=\'{3}\' WHERE login_uuid=\'{4}\' and template_id=\'{5}\' and class IS NULL LIMIT 1".format(result, time, selected_point, selected_class, login_uuid, template_id)) 


    
    #cursor.execute("UPDATE test_set_result SET result=\'{0}\', time=\'{1}\', selected_point=\'{2}\', class=\'{3}\' WHERE login_uuid=\'{4}\' and template_id=\'{5}\' and class IS NULL".format(result, time, selected_point, selected_class, login_uuid, template_id)) 
    conn.commit()


    return json.dumps("SUCCESS")

@mod_auth.route('/export_csv', methods=['GET', 'POST'])
def export_csv():
    login_token = None
    test_set_id = None
    test_set_id = request.json['test_set_id']
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})    
    si = StringIO.StringIO()
    cw = csv.writer(si)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM  test_set_result INNER JOIN test_set_user_login_id on test_set_result.login_uuid = test_set_user_login_id.login_uuid WHERE test_set_id=\'{0}\' and result is not NULL'.format(test_set_id))
    data = cursor.fetchall()
    cw.writerow([i[0] for i in cursor.description])
    cw.writerows(data)
    response = make_response(si.getvalue())
    response.headers['Content-Disposition'] = 'attachment; filename=report.csv'
    response.headers["Content-type"] = "text/csv"
    return response
    
@mod_auth.route('/new_test_set', methods=['GET', 'POST'])
def new_test_set():
    login_token = None
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    test_set_id = None
    template_id = None
    wait_time = None
    close_time = None
    uuid_count = None
    test_duration = None
    test_duration = request.json['test_duration']
    test_set_id = request.json['test_set_id']
    template_id = request.json['template_ids']
    wait_time = request.json['wait_time']
    close_time = request.json['close_time']
    uuid_count = request.json['uuid_count']
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id))
    data = cursor.fetchone()
    if data is None:    
        cursor.execute('INSERT INTO test_set_details VALUES(\'{0}\',\'{1}\',\'{2}\',3, {3})'.format(test_set_id,wait_time,close_time, test_duration))
        conn.commit()

	for i in template_id:
            cursor.execute("SELECT total_data_points from templates WHERE template_id=\'{0}\'".format(i))
            data = cursor.fetchone()[0]
            data_point_dict = gen_two.gen_Parents_And_Children_type_two(data)

            cursor.execute('INSERT INTO test_set_template_list VALUES(\'{0}\',\'{1}\',\'{2}\',\'{3}\',\'{4}\',\'{5}\')'.format(test_set_id, i, data_point_dict['class1_parent'],data_point_dict['class2_parent'],data_point_dict['class2_children'],data_point_dict['class1_children']))
	    conn.commit()
	     
        response ={}
        for x in range(int(uuid_count)):     
            new_uuid = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(16))
	    print("UUID COUNT", uuid_count)
            cursor.execute('INSERT INTO test_set_user_login_id VALUES(\'{0}\', {1})'.format(test_set_id, new_uuid))
            conn.commit()
            for i in template_id:
	        cursor.execute('insert into test_set_result values(\'{0}\', {1}, NULL, NULL, NULL,NULL)'.format(i, new_uuid))
	        conn.commit()
        cursor.execute('SELECT test_set_id from test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id))
        data = cursor.fetchone()
        if len(data)>0:
            response = {'status':'success'}
        else:
	    response = {'status':'failed'}
	return json.dumps(response)	
    else:
        response = {'status':'failed'}
	return json.dumps(response)


@mod_auth.route('/get_next_test', methods=['GET', 'POST'])
def get_next_test():
    login_uuid = None
    login_uuid = request.json['login_uuid']
    response = {}
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('select test_set_id from test_set_user_login_id WHERE login_uuid=\'{0}\''.format(login_uuid))
    test_set_id = cursor.fetchone()
    cursor.execute('select close_time from test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id[0]))
    close_time = cursor.fetchone()	
    try:
        close_time = datetime.datetime.strptime(close_time, "%Y-%d-%mT%H:%M")
	current_time = datetime.datetime.now()
	if(current_time < close_time):
	    response = {'status':'success', 'messege':'On to next test'}
        else:
	    response = {'status':'success', 'messege':'Test is closed'}
            return json.dumps(response)
    except:
	response = {'status':'failed', 'messege':'Unable to parse string'}
	return json.dumps(response)


    if test_set_id is None:
        response = {'status':'success','messesge':'UUID not found'}
        return json.dumps(response)
    else:
        cursor.execute('select status from test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id[0]))
	status = cursor.fetchone()
        if status[0] != 1:
	    response = {'status':'success', 'messege':'No open tests'}
	    return json.dumps(response)
	
        cursor.execute('select template_id from test_set_result WHERE login_uuid=\'{0}\' and result is NULL'.format(login_uuid));
        data = cursor.fetchone()
        if data is None:
	    response = {'status':'success','messesge':'all templates complete'}
            return json.dumps(response)

        template_id = data[0]
        cursor.execute('select count(*) from test_set_result WHERE login_uuid=\'{0}\' and result is NULL;'.format(login_uuid))
        remaining_tests = cursor.fetchone()
        print(remaining_tests) 
      
        cursor.execute('SELECT class1_parent_data_points, class2_parent_data_points, class2_generated_data_points, class1_generated_data_points from test_set_template_list WHERE template_id=\'{0}\' and test_set_id=\'{1}\''.format(template_id, test_set_id[0]))
        data = cursor.fetchone()
        cursor.execute('SELECT graph_type from templates WHERE template_id=\'{0}\''.format(template_id))
        graph_type = cursor.fetchone()
	cursor.execute('SELECT wait_time, test_duration FROM test_set_details WHERE test_set_id=\'{0}\''.format(test_set_id[0]))
        time = cursor.fetchone()
        info = {'class1_parent_data_points': data[0], 'class2_parent_data_points':data[1], 'class2_generated_data_points':data[2], 'class1_generated_data_points':data[3],'wait_time':time[0], 'test_duration':time[1], 'graph_type':graph_type}
        response = {'status':'success','remaining':remaining_tests[0],'data':info}
        return json.dumps(response)


@mod_auth.route('/new_template', methods=['GET','POST'])
def new_template():
    login_token = None
    login_token = request.json['login_token']
    if(check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})
    graph_type = None
    total_data_points = None
    template_id = None
    graph_type = request.json['graph_type']
    total_data_points = request.json['total_data_points']
    template_id = request.json['template_id']

    response = {}
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM templates where template_id=\'{0}\''.format(template_id))
    data = cursor.fetchone()
    if data == None:
	cursor.execute('INSERT INTO templates VALUES(\'{0}\',{1},{2})'.format(template_id, total_data_points, graph_type))
	conn.commit()
        response = {'status':'success', 'messege':'Template added'}
    else:
       response = {'status':'success', 'messege':'Template already exists'}
    return json.dumps(response)


@mod_auth.route('/get_template_render', methods=['GET', 'POST'])
def get_template_render():
    login_token = None
    login_token = request.json['login_token']
    if (check_token(login_token) is False):
        return json.dumps({'Status': "Invalid Token"})

    template_id = None
    template_id = request.json['template_id']
    test_set_id = None
    test_set_id = request.json['test_set_id']

    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute('SELECT class1_parent_data_points, class2_parent_data_points, class2_generated_data_points, class1_generated_data_points from test_set_template_list WHERE template_id=\'{0}\' and test_set_id=\'{1}\''.format(template_id, test_set_id))

    data = cursor.fetchone()
    cursor.execute('SELECT graph_type from templates WHERE template_id=\'{0}\''.format(template_id))
    graph_type = cursor.fetchone()

    info = {'class1_parent_data_points': data[0], 'class2_parent_data_points': data[1], 'class2_generated_data_points': data[2], 'class1_generated_data_points': data[3], 'graph_type': graph_type}
    response = {'status': 'success', 'data': info}
    return json.dumps(response)


