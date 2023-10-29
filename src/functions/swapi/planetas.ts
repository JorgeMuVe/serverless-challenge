import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { swapiControllerInstance } from '../../controllers/swapi.controller'
import { generateErrorResponse, generateSuccessResponse } from '../../utils/generate.response'

/**
 * @description Funcion Lambda para buscar Planeta por id
 * @returns Callback con respuesta
 */
export const buscarPlanetaLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error buscarPlanetaLambda: Bad Request')
  try {
    const id = event?.pathParameters?.id ?? '' // Get Id from pathParameters
    const planeta = await swapiControllerInstance.buscarPlaneta(id)
    response = generateSuccessResponse(planeta)
  } catch (error: any) {
    response = generateErrorResponse(401, error.message)
  }
  callback(null, response)
}
