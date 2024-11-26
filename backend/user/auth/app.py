import os

import boto3
from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import jwt

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret')  # Cambia por una clave segura
jwt = JWTManager(app)

dynamodb_client = boto3.client('dynamodb')

if os.environ.get('IS_OFFLINE'):
    dynamodb_client = boto3.client(
        'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
    )


USERS_TABLE = os.environ['USERS_TABLE']

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Buscar usuario en DynamoDB
    response = dynamodb_client.get_item(TableName=USERS_TABLE, Key={'username': username})
    user = response.get('Item')

    if not user or user['password']['S'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    # Generar un token JWT
    token = create_access_token(identity=username)

    return jsonify({'token': token})

@app.route('/users/<string:user_id>')
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

@app.route('/users', methods=['POST'])
def create_user():
    user_id = request.json.get('userId')
    username = request.json.get('username')
    password = request.json.get('password')
    if not user_id or not username or not password:
        return jsonify({'error': 'Please provide "userId" | "name" | "password"'}), 400

    dynamodb_client.put_item(
        TableName=USERS_TABLE,
        Item={
            'userId': {'S': user_id},
            'username': {'S': username},
            'password': {'S': password}
            }
    )

    return jsonify({
        'userId': user_id,
        'username': username,
        'password': password
        })

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
