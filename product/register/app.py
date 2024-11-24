import os

import boto3
from flask import Flask, jsonify, make_response, request

app = Flask(__name__)


dynamodb_client = boto3.client('dynamodb')

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
    @param: productId, name, description, quantity, price, category
    """
    product_id = request.json.get('productId')
    name = request.json.get('name')
    description = request.json.get('description')
    quantity = request.json.get('quantity')
    price = request.json.get('price')
    category = request.json.get('category')
    if not product_id or not name:
        return jsonify({'error': 'Please provide both "product_id" and "name"'}), 400

    dynamodb_client.put_item(
        TableName=PRODUCTS_TABLE,
        Item={
            'productId': {'S': product_id},
            'name': {'S': name},
            "description": {'S': description},
            "quantity": {'N': str(quantity)},
            "price": {'N': str(price)},
            "category": {'S': category}
        }
    )

    return jsonify({
        'product_id': product_id,
        'name': name,
        'description': description,
        'quantity': quantity,
        'price': price,
        'category': category
        })

@app.errorhandler(404)
def resource_not_found(e):
    """ Error handler for 404
    @return: JSON object with the error message
    """
    return make_response(jsonify(error='Not found!'), 404)
