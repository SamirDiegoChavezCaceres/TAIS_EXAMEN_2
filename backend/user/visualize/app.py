

import os
import boto3
from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app) # allow CORS for all domains on all routes.
dynamodb_client = boto3.client('dynamodb')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret')  # Cambia por una clave segura
jwt = JWTManager(app)

if os.environ.get('IS_OFFLINE'):
    dynamodb_client = boto3.client(
        'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
    )


USERS_TABLE = os.environ['USERS_TABLE']


@app.route('/user/<string:user_id>')
@jwt_required()
def get_user(user_id):
    result = dynamodb_client.get_item(
        TableName=USERS_TABLE, Key={'userId': {'S': user_id}}
    )
    item = result.get('Item')
    if not item:
        return jsonify({'error': 'Could not find user with provided "userId"'}), 404

    return jsonify(
        {
            'userId': item.get('userId').get('S'),
            'username': item.get('username').get('S'),
            'password': item.get('password').get('S')
        },
    )

@app.route("/all-users", methods=["GET"])
@jwt_required()
def get_all_users():
    result = dynamodb_client.scan(TableName=USERS_TABLE)
    items = result.get('Items')
    return jsonify(
        {
            'users': [
                {
                    'userId': item.get('userId').get('S'),
                    'name': item.get('name').get('S'),
                    "password": item.get('password').get('S'),
                } for item in items
            ]
        }
    )

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
