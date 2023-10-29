import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { swapiControllerInstance } from '../../controllers/swapi.controller'
import { generateErrorResponse, generateSuccessResponse } from '../../utils/generate.response'

/**
 * @description Funcion Lambda para buscar Especie por id
 * @returns Callback con respuesta
 */
export const buscarEspecieLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error buscarEspecieLambda: Bad Request')
  try {
    const id = event?.pathParameters?.id ?? '' // Get Id from pathParameters
    const especie = await swapiControllerInstance.buscarEspecie(id)
    response = generateSuccessResponse(especie)
  } catch (error: any) {
    response = generateErrorResponse(401, error.message)
  }
  callback(null, response)
}
