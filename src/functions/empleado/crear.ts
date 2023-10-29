import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { empleadoControllerInstance } from '../../controllers/empleado.controller'
import { generateErrorResponse } from '../../utils/generate.response'
import { IEmpleado } from '../../models/empleado'
import { v4 } from 'uuid'

/**
 * @description Funcion Lambda para crear Empleado
 * @returns Callback con respuesta
 */
export const crearEmpleadoLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateErrorResponse(401, 'Error crearEmpleadoLambda: Bad Request')
  try {
    const { email, nombres, profesion, experiencia, dni } = JSON.parse(event.body ?? '{}') // Get data from body
    const nuevoEmpleado: IEmpleado = { id: v4(), email, nombres, profesion, experiencia, dni, creado: JSON.stringify(new Date()) } // Generate Empleado
    response = await empleadoControllerInstance.crearEmpleado(nuevoEmpleado) // Create Empleado
  } catch (error) { console.log(error) } // Print error console
  callback(null, response)
}
