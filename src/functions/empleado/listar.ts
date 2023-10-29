import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { empleadoControllerInstance } from '../../controllers/empleado.controller'
import { generateErrorResponse } from '../../utils/generate.response'

/**
 * @description Funcion Lambda para buscar Empleado por id
 * @returns Callback con respuesta
 */
export const listarEmpleadoLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error listarEmpleadoLambda: Bad Request')
  try {
    response = await empleadoControllerInstance.listarEmpleados()
  } catch (error) { console.log(error) } // Print error console
  callback(null, response)
}
