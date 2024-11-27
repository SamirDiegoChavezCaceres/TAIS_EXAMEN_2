""" This module contains the Flask application that registers a product """


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
else:
    dynamodb_client = boto3.client('dynamodb')

PRODUCTS_TABLE = os.environ['PRODUCTS_TABLE']

@app.route('/products/<string:product_id>')
@jwt_required()
def get_products(product_id):
    """ Get a product by product_id
    @return: JSON object with the product
    @param: product_id
    """
    result = dynamodb_client.get_item(
        TableName=PRODUCTS_TABLE, Key={'product_id': {'S': product_id}}
    )
    item = result.get('Item')
    if not item:
        return jsonify({'error': 'Could not find user with provided "product_id"'}), 404
# Campos: código, nombre, descripción, cantidad, precio unitario, categoría.
    return jsonify(
        {
            'product_id': item.get('product_id').get('S'),
            'name': item.get('name').get('S'),
            "description": item.get('description').get('S'),
            "quantity": int(item.get('quantity').get('N')),
            "price": float(item.get('price').get('N')),
            "category": item.get('category').get('S')
        }
    )

@app.route('/products')
@jwt_required()
def get_all_products():
    """ Get all products in the database"""
    result = dynamodb_client.scan(TableName=PRODUCTS_TABLE)
    items = result.get('Items')
    return jsonify(
        {
            'products': [
                {
                    'product_id': item.get('product_id').get('S'),
                    'name': item.get('name').get('S'),
                    "description": item.get('description').get('S'),
                    "quantity": int(item.get('quantity').get('N')),
                    "price": float(item.get('price').get('N')),
                    "category": item.get('category').get('S')
                }
                for item in items
            ]
        }
    )

@app.errorhandler(404)
def resource_not_found(e):
    """ Error handler for 404
    @return: JSON object with the error message
    """
    return make_response(jsonify(error='Not found!'), 404)
