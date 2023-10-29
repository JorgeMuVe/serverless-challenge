import { APIGatewayProxyResult } from 'aws-lambda'
import { IEmpleado } from '../models/empleado'
import { validateCrearEmpleado, validateId } from '../utils/validate.data'
import { generateErrorResponse, generateSuccessResponse } from '../utils/generate.response'
import { DynamoDB } from 'aws-sdk'

export class EmpleadoController {
  private readonly options: any = {}
  constructor () {
    if (process?.env?.JEST_WORKER_ID !== undefined) { // If testing mode
      this.options = {
        endpoint: 'http://localhost:8000', // Dynamodb localy
        region: 'local-env',
        sslEnabled: false,
        accessKeyId: 'XXXXXX',
        secretAccessKey: 'XXXXX'
      }
    }
  }

  /**
   * @description Crear Empleado
   * @param dataEmpleado Objeto IEmpleado con información del empleado
   * @returns Objecto APIGatewayProxyResult
   */
  public crearEmpleado = async (dataEmpleado: IEmpleado): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = generateErrorResponse(401, 'Empleado no creado')
    try {
      const errorList: string[] = await validateCrearEmpleado(dataEmpleado)
      if (errorList.length === 0) {
        const dynamodb = new DynamoDB.DocumentClient(this.options)
        await dynamodb.put({ TableName: 'Empleado', Item: dataEmpleado }).promise()
        response = generateSuccessResponse(dataEmpleado)
      } else { response = generateErrorResponse(401, errorList) }
    } catch (error) { console.log(error) }
    return response
  }

  /**
   * @description Editar Empleado
   * @param dataEmpleado Objeto IEmpleado con información del empleado
   * @returns Objecto APIGatewayProxyResult
   */
  public editarEmpleado = async (dataEmpleado: IEmpleado): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = generateErrorResponse(401, 'Empleado no editado')
    try {
      const dynamodb = new DynamoDB.DocumentClient(this.options)
      // const UpdateExpression: string[] = []
      // if (dataEmpleado.dni !== undefined) { UpdateExpression.push('dni = :dni') }
      // if (dataEmpleado.email !== undefined) { UpdateExpression.push('email = :email') }
      // if (dataEmpleado.nombres !== undefined) { UpdateExpression.push('nombres = :nombres') }
      // if (dataEmpleado.profesion !== undefined) { UpdateExpression.push('profesion = :profesion') }
      // if (dataEmpleado.experiencia !== undefined) { UpdateExpression.push('experiencia = :experiencia') }
      // console.log('UpdateExpression => ', UpdateExpression.join(','))
      await dynamodb.update({
        TableName: 'Empleado',
        Key: { id: dataEmpleado.id },
        UpdateExpression: 'set dni = :dni, email = :email, nombres = :nombres, profesion =:profesion, experiencia = :experiencia, editado = :editado',
        ExpressionAttributeValues: {
          ':dni': dataEmpleado.dni,
          ':email': dataEmpleado.email,
          ':nombres': dataEmpleado.nombres,
          ':profesion': dataEmpleado.profesion,
          ':experiencia': dataEmpleado.experiencia,
          ':editado': JSON.stringify(new Date())
        },
        ReturnValues: 'ALL_NEW'
      }).promise()
      response = generateSuccessResponse({ mensaje: `Empleado ${dataEmpleado.nombres} se actualizo` })
    } catch (error) { console.log(error) }
    return response
  }

  /**
   * @description Eliminar Empleado
   * @param id string Identificador
   * @returns Objecto APIGatewayProxyResult
   */
  public eliminarEmpleado = async (id: string): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = generateErrorResponse(401, 'Empleado no editado')
    try {
      const dynamodb = new DynamoDB.DocumentClient(this.options)
      await dynamodb.delete({ TableName: 'Empleado', Key: { id } }).promise()
      response = generateSuccessResponse({ mensaje: `Empleado ${id} se elimino` })
    } catch (error) { console.log(error) }
    return response
  }

  /**
   * @description Busqueda por id en Empleado
   * @param id string Identificador
   * @returns Objecto APIGatewayProxyResult
   */
  public buscarEmpleadoPorId = async (id: string): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = generateErrorResponse(401, 'Empleado no encontrado')
    try {
      if (validateId(id)) {
        const dynamodb = new DynamoDB.DocumentClient(this.options)
        const result = await dynamodb.get({ TableName: 'Empleado', Key: { id } }).promise()
        const empleadoFind = (result.Item === null || result.Item === undefined || JSON.stringify(result.Item) === '{}') ? false : result.Item
        if (empleadoFind === false) {
          response = generateErrorResponse(401, 'Empleado no encontrado')
        } else { response = generateSuccessResponse(empleadoFind) }
      } else { response = generateErrorResponse(401, 'El identificador es inválido') }
    } catch (error) { console.log(error) }
    return response
  }

  /**
   * @description Lista de Empleados
   * @returns Objecto APIGatewayProxyResult
   */
  public listarEmpleados = async (): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult = generateErrorResponse(401, 'Empleados no encontrados')
    try {
      const dynamodb = new DynamoDB.DocumentClient(this.options)
      const result = await dynamodb.scan({ TableName: 'Empleado' }).promise()
      response = generateSuccessResponse(result.Items ?? [])
    } catch (error) { console.log(error) }
    return response
  }
}

export const empleadoControllerInstance = new EmpleadoController()
