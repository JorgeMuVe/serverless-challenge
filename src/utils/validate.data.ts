import { IEmpleado } from '../models/empleado'

export const validateId = (id: string | undefined): boolean => {
  if ((id ?? '').length < 1) {
    return false
  }
  return true
}

export const validateDNI = (dni: string): boolean => {
  if (dni.length !== 8) {
    return false
  }
  return true
}

export const validateEmail = (email: string): boolean => {
  if ((!/^\w+([.-]?\w+)*@(?:|gmail.com|hotmail.com|yahoo.es)+$/.test(email)) || email.length > 100 || email.length < 5) {
    return false
  }
  return true
}

export const validateNombres = (nombres: string): boolean => {
  if ((!/^[a-zA-Z ñÑ]+$/.test(nombres)) || nombres.length < 2) {
    return false
  }
  return true
}

export const validateCrearEmpleado = async (dataEmpleado: IEmpleado): Promise<string[]> => {
  const errorList: string[] = []
  if (!validateId(dataEmpleado.id)) { errorList.push('El identificador es inválido') }
  if (!validateDNI(dataEmpleado.dni)) { errorList.push('El número de DNI es inválido') }
  if (!validateEmail(dataEmpleado.email)) { errorList.push('El correo electronico es inválido') }
  if (!validateNombres(dataEmpleado.nombres)) { errorList.push('El nombre es inválido') }
  return errorList
}
