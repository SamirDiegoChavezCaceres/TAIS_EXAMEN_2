import os

import boto3
from flask import Flask, jsonify, make_response, request

app = Flask(__name__)

dynamodb_client = boto3.client('dynamodb')

if os.environ.get('IS_OFFLINE'):
    dynamodb_client = boto3.client(
        'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
    )


USERS_TABLE = os.environ['USERS_TABLE']

@app.route('/users/<string:user_id>')
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

    # Verificar si el userId ya existe
    user_id_response = dynamodb_client.get_item(
        TableName=USERS_TABLE,
        Key={'userId': {'S': user_id}}
    )
    if 'Item' in user_id_response:
        return jsonify({'error': 'User ID already exists'}), 400

    # Verificar si el username ya existe
    username_response = dynamodb_client.scan(
        TableName=USERS_TABLE,
        FilterExpression="username = :username",
        ExpressionAttributeValues={":username": {"S": username}}
    )
    if username_response.get('Items'):  # Si encuentra algún resultado, significa que el username ya existe
        return jsonify({'error': 'Username already exists'}), 400

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
