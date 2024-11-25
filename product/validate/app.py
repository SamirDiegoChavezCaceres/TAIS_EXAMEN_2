""" Validate the product data """


import os
import json
import boto3

dynamodb_client = boto3.client('dynamodb')

if os.environ.get('IS_OFFLINE'):
    dynamodb_client = boto3.client(
        'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
    )
else:
    dynamodb_client = boto3.client('dynamodb')

PRODUCTS_TABLE = os.environ['PRODUCTS_TABLE']

def handler(event, context):
    """
    Lambda function to validate product input.
    @param event: AWS Lambda input event
    @return: Validation response
    """

    event = json.loads(event['body'])
    product_id = event.get('product_id')

    if not product_id:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Missing product_id'})
        }

    # Consultar DynamoDB
    response = dynamodb_client.get_item(
        TableName=PRODUCTS_TABLE,
        Key={'product_id': {'S': product_id}}
    )

    if "Item" in response:
        return {
            'statusCode': 409,
            'body': json.dumps({'message': 'Product already exists'})
        }

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Validation successful'})
    }
