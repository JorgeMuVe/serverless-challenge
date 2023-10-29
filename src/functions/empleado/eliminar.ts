import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { empleadoControllerInstance } from '../../controllers/empleado.controller'
import { generateErrorResponse } from '../../utils/generate.response'

/**
 * @description Funcion Lambda para eliminar Empleado
 * @returns Callback con respuesta
 */
export const eliminarEmpleadoLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error eliminarEmpleadoLambda: Bad Request')
  try {
    const id = event?.pathParameters?.id ?? '' // Get Id from pathParameters
    response = await empleadoControllerInstance.eliminarEmpleado(id) // Eliminar Empleado
  } catch (error) { console.log(error) } // Print error console
  callback(null, response)
}
