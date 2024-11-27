import os

import boto3
from flask import Flask, jsonify, make_response, request

from flask_cors import CORS, cross_origin
import hashlib

app = Flask(__name__)

CORS(app) # allow CORS for all domains on all routes.

dynamodb_client = boto3.client('dynamodb')

if os.environ.get('IS_OFFLINE'):
    dynamodb_client = boto3.client(
        'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
    )


USERS_TABLE = os.environ['USERS_TABLE']

@app.route('/users', methods=['POST'])
def create_user():
    name = request.json.get('name')
    password = request.json.get('password')
    user_id = hashlib.sha256(name.encode()).hexdigest()
    if not password or not name:
        return jsonify({'error': 'Please provide both "name" and "password"'}), 400
    item = dynamodb_client.get_item(
        TableName=USERS_TABLE, Key={'userId': {'S': user_id}}
    )
    if 'Item' in item:
        return jsonify({'error': 'User with provided "name" already exists (same hash id)'}), 409

    dynamodb_client.put_item(
        TableName=USERS_TABLE,
        Item={
            'userId': {'S': user_id}, 
            'name': {'S': name},
            "password": {'S': password}
        }
    )

    return jsonify({'userId': user_id, 'name': name, 'password': password, "item": item}), 201

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
