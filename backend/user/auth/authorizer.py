import jwt
import os

def lambda_handler(event, context):
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
        return {
            'principalId': decoded['identity'],  # El usuario autenticado
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
    except jwt.ExpiredSignatureError:
        raise Exception("Unauthorized: Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Unauthorized: Invalid token")