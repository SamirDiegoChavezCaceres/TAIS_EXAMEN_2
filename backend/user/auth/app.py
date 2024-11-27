import os

import boto3
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import jwt

app = Flask(__name__)
CORS(app) # allow CORS for all domains on all routes.
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
    try:
        response = dynamodb_client.query(
            TableName=USERS_TABLE,
            IndexName="UsernameIndex",
            KeyConditionExpression="username = :username",
            ExpressionAttributeValues={":username": {"S": username}}
        )
    except Exception as e:
        return jsonify({'error': 'DynamoDB query failed', 'details': str(e)}), 500
    
    items = response.get('Items', [])
    if not items or items[0]['password']['S'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    # Generar un token JWT
    token = create_access_token(identity=username)

    return jsonify({'token': token})

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
