const eventGenerator = require('./utils/eventGenerator')
const validators = require('./utils/validators')
const fncListarEmpleado = require('../.build/src/functions/empleado/listar')
const fncBuscarEmpleado = require('../.build/src/functions/empleado/buscar')
const fncCrearEmpleado = require('../.build/src/functions/empleado/crear')
const fncEditarEmpleado = require('../.build/src/functions/empleado/editar')
const fncEliminarEmpleado = require('../.build/src/functions/empleado/eliminar')

var idNuevo = null;

// Crear Empleado
test('Test crearEmpleado', async () => {
  const event = eventGenerator({
    body: {
      "dni": "72947633",
      "email": "jkmvz5@gmail.com",
      "nombres": "Jorge Muñiz",
      "profesion": "Ingeniero de sistemas",
      "experiencia": "5 Años"
    }
  })
  await fncCrearEmpleado.crearEmpleadoLambda(event, null, (error, res) => {
    idNuevo = JSON.parse(res.body).id;
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

// Listar Empleados
test('Test listarEmpleados', async () => {
  const event = eventGenerator({})
  await fncListarEmpleado.listarEmpleadoLambda(event, null, (error, res) => {
    // console.log(res)
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

// Editar Empleado
test('Test editarEmpleado', async () => {
  const event = eventGenerator({
    pathParametersObject: { id: idNuevo },
    body: {
      "dni": "72947621",
      "email": "jorge.muvez@gmail.com",
      "nombres": "Jorge Muñiz Velasquez",
      "profesion": "Ingeniero de Sistemas",
      "experiencia": "8 Años"
    }
  })
  await fncEditarEmpleado.editarEmpleadoLambda(event, null, (error, res) => {
    // console.log(res)
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

// Buscar Empleado
test('Test buscarEmpleado', async () => {
  const event = eventGenerator({ pathParametersObject: { id: idNuevo } })
  await fncBuscarEmpleado.buscarEmpleadoLambda(event, null, (error, res) => {
    // console.log(res)
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

// Eliminar Empleado
test('Test eliminarEmpleado', async () => {
  const event = eventGenerator({ pathParametersObject: { id: idNuevo } })
  await fncEliminarEmpleado.eliminarEmpleadoLambda(event, null, (error, res) => {
    // console.log(res)
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})
