import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { swapiControllerInstance } from '../../controllers/swapi.controller'
import { generateErrorResponse, generateSuccessResponse } from '../../utils/generate.response'

/**
 * @description Funcion Lambda para buscar Vehiculo por id
 * @returns Callback con respuesta
 */
export const buscarVehiculoLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error buscarVehiculoLambda: Bad Request')
  try {
    const id = event?.pathParameters?.id ?? '' // Get Id from pathParameters
    const vehiculo = await swapiControllerInstance.buscarVehiculo(id)
    response = generateSuccessResponse(vehiculo)
  } catch (error: any) {
    response = generateErrorResponse(401, error.message)
  }
  callback(null, response)
}
