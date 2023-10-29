import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { empleadoControllerInstance } from '../../controllers/empleado.controller'
import { generateErrorResponse } from '../../utils/generate.response'
import { IEmpleado } from '../../models/empleado'

/**
 * @description Funcion Lambda para editar Empleado
 * @returns Callback con respuesta
 */
export const editarEmpleadoLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error editarEmpleadoLambda: Bad Request')
  try {
    const id = event?.pathParameters?.id ?? '' // Get Id from pathParameters
    const { email, dni, nombres, profesion, experiencia } = JSON.parse(event.body ?? '{}') // Get data from body
    const editarEmpleado: IEmpleado = { id, email, dni, nombres, profesion, experiencia } // Generate Empleado
    response = await empleadoControllerInstance.editarEmpleado(editarEmpleado) // Create Empleado
  } catch (error) { console.log(error) } // Print error console
  callback(null, response)
}
