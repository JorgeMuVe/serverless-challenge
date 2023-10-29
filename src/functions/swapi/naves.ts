import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { swapiControllerInstance } from '../../controllers/swapi.controller'
import { generateErrorResponse, generateSuccessResponse } from '../../utils/generate.response'

/**
 * @description Funcion Lambda para buscar Nave por id
 * @returns Callback con respuesta
 */
export const buscarNaveLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error buscarNaveLambda: Bad Request')
  try {
    const id = event?.pathParameters?.id ?? '' // Get Id from pathParameters
    const nave = await swapiControllerInstance.buscarNave(id)
    response = generateSuccessResponse(nave)
  } catch (error: any) {
    response = generateErrorResponse(401, error.message)
  }
  callback(null, response)
}
