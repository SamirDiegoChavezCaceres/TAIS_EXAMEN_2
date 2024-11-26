""" This module contains the Flask application that registers a product"""


import os
import boto3
import json
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app) # allow CORS for all domains on all routes.

dynamodb_client = boto3.client('dynamodb')
lambda_client = boto3.client('lambda')

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

@app.route('/products', methods=['POST'])
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
        return jsonify({'error': body_dict}), 400

    if validation_response.get('statusCode') != 200:
        return jsonify({'error': body_dict}), validation_response.get('statusCode')

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

# @app.route('/products/<string:product_id>')
# def get_products(product_id):
#     """ Get a product by product_id
#     @return: JSON object with the product
#     @param: product_id
#     """
#     result = dynamodb_client.get_item(
#         TableName=PRODUCTS_TABLE, Key={'product_id': {'S': product_id}}
#     )
#     item = result.get('Item')
#     if not item:
#         return jsonify({'error': 'Could not find user with provided "product_id"'}), 404
# # Campos: código, nombre, descripción, cantidad, precio unitario, categoría.
#     return jsonify(
#         {
#             'product_id': item.get('product_id').get('S'),
#             'name': item.get('name').get('S'),
#             "description": item.get('description').get('S'),
#             "quantity": int(item.get('quantity').get('N')),
#             "price": float(item.get('price').get('N')),
#             "category": item.get('category').get('S')
#         }
#     )

# @app.route('/products')
# def get_all_products():
#     """ Get all products in the database"""
#     result = dynamodb_client.scan(TableName=PRODUCTS_TABLE)
#     items = result.get('Items')
#     return jsonify(
#         {
#             'products': [
#                 {
#                     'product_id': item.get('product_id').get('S'),
#                     'name': item.get('name').get('S'),
#                     "description": item.get('description').get('S'),
#                     "quantity": int(item.get('quantity').get('N')),
#                     "price": float(item.get('price').get('N')),
#                     "category": item.get('category').get('S')
#                 }
#                 for item in items
#             ]
#         }
#     )

@app.errorhandler(404)
def resource_not_found(e):
    """ Error handler for 404
    @return: JSON object with the error message
    """
    return make_response(jsonify(error='Not found!'), 404)
