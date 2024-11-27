""" This module contains the Flask application that registers a product"""


import os
import boto3
import json
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app) # allow CORS for all domains on all routes.
dynamodb_client = boto3.client('dynamodb')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret')  # Cambia por una clave segura
jwt = JWTManager(app)

lambda_client = boto3.client('lambda')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret')  # Cambia por una clave segura

def invoke_lambda(product_id):
    """ Invoke the lambda function
    @return: JSON object with the response from the lambda function
    @param: product_id
    """
    payload = {
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({"product_id": product_id})
    }
    params = {
        'FunctionName': os.environ['LAMBDA_NAME'],
        'InvocationType': 'RequestResponse',
        'Payload': json.dumps(payload)
    }
    try :
        response = lambda_client.invoke(**params)
        response_payload = json.loads(response['Payload'].read())
        return response_payload

    except Exception as e:
        return 0

if os.environ.get('IS_OFFLINE'):
    dynamodb_client = boto3.client(
        'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
    )
else:
    dynamodb_client = boto3.client('dynamodb')

PRODUCTS_TABLE = os.environ['PRODUCTS_TABLE']

@app.route('/products-create', methods=['POST'])
@jwt_required()
def create_products():
    """ Create a new product
    @return: JSON object with the product created
    @param: product_id, name, description, quantity, price, category
    """
    product_id = request.json.get('product_id')
    name = request.json.get('name')
    description = request.json.get('description')
    quantity = request.json.get('quantity')
    price = request.json.get('price')
    category = request.json.get('category')

    if not product_id or not name:
        return jsonify({'error': 'Please provide both "product_id" and "name"'}), 400

    validation_response = invoke_lambda(product_id)

    body_dict = json.loads(validation_response.get('body'))

    if validation_response == 0:
        return jsonify({'error': body_dict["message"]}), 400

    if validation_response.get('statusCode') != 200:
        return jsonify({'error': body_dict["message"]}), validation_response.get('statusCode')

    dynamodb_client.put_item(
        TableName=PRODUCTS_TABLE,
        Item={
            'product_id': {'S': product_id},
            'name': {'S': name},
            'description': {'S': description},
            'quantity': {'N': str(quantity)},
            'price': {'N': str(price)},
            'category': {'S': category}
        }
    )
    return jsonify(
        {
            "message": body_dict.get('message'),
            "product": {
                'product_id': product_id,
                'name': name,
                'description': description,
                'quantity': quantity,
                'price': price,
                'category': category
            }
        }
    )

@app.errorhandler(404)
def resource_not_found(e):
    """ Error handler for 404
    @return: JSON object with the error message
    """
    return make_response(jsonify(error='Not found!'), 404)
