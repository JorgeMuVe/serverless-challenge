import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { swapiControllerInstance } from '../../controllers/swapi.controller'
import { generateErrorResponse, generateSuccessResponse } from '../../utils/generate.response'

/**
 * @description Funcion Lambda para buscar Persona por id
 * @returns Callback con respuesta
 */
export const buscarPersonaLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error buscarPersonaLambda: Bad Request')
  try {
    const id = event?.pathParameters?.id ?? '' // Get Id from pathParameters
    const persona = await swapiControllerInstance.buscarPersona(id)
    response = generateSuccessResponse(persona)
  } catch (error: any) {
    response = generateErrorResponse(401, error.message)
  }
  callback(null, response)
}
