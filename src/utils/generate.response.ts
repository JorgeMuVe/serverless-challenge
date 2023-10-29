import { APIGatewayProxyResult } from 'aws-lambda'

/**
 * @description Genera un Objecto APIGatewayProxyResult con los paremtros
 * @param response any Data para enviar
 * @returns objecto APIGatewayProxyResult con statusCode y body
 */
export const generateSuccessResponse = (response: any): APIGatewayProxyResult => {
  return { statusCode: 200, body: JSON.stringify(response) }
}

/**
 * @description Genera un Objecto APIGatewayProxyResult con los paremtros
 * @param code number Codigo de estado de solicitud
 * @param error any Error puede ser un string o array
 * @returns objecto APIGatewayProxyResult con statusCode y body
 */
export const generateErrorResponse = (code: number, error: any): APIGatewayProxyResult => {
  return { statusCode: 400, body: JSON.stringify({ code, error }) }
}
