import jwt
import os
import json

def lambda_handler(event, context):
    if 'headers' not in event:
        raise ValueError("Headers not found in the event")

    token = event['headers'].get('Authorization')

    if not token:
        raise Exception("Unauthorized: No token found")

    # Eliminar el prefijo "Bearer " si existe
    if token.startswith("Bearer "):
        token = token[7:]

    try:
        # Decodificar el token usando la clave secreta
        decoded = jwt.decode(token, os.environ['JWT_SECRET_KEY'], algorithms=['HS256'])
        
        # Retornar un policy document con el acceso permitido si el token es válido
        response = {
            'principalId': decoded['sub'],  # El usuario autenticado
            'policyDocument': {
                'Version': '2012-10-17',
                'Statement': [
                    {
                        'Effect': 'Allow',
                        'Action': 'execute-api:Invoke',
                        'Resource': event['methodArn']  # ARN de la API Gateway
                    }
                ]
            }
        }
        return response
    except jwt.ExpiredSignatureError:
        raise Exception("Unauthorized: Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Unauthorized: Invalid token")
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error decoding JWT: {str(e)}'
        }
