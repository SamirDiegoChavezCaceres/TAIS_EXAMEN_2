import json
import jwt
import os


def lambda_handler(event, context):
    response = {
        "isAuthorized": False,
        "context": {
            "stringKey": "value",
            "numberKey": 1,
            "booleanKey": True,
            "arrayKey": ["value1", "value2"],
            "mapKey": {"value1": "value2"}
        }
    }

    token = event["headers"]["authorization"]
    token = token[7:]

    try:
        decoded = jwt.decode(token, os.environ['JWT_SECRET_KEY'], algorithms=['HS256'])
        response = {
            "isAuthorized": True,
            "context": {
                "stringKey": "value",
                "numberKey": 1,
                "booleanKey": True,
                "arrayKey": ["value1", "value2"],
                "mapKey": {"value1": "value2"}
            }
        }
        return json.loads(response)
    except jwt.ExpiredSignatureError:
        raise Exception("Unauthorized: Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Unauthorized: Invalid token")
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error decoding JWT: {str(e)}'
        }