const fncEspecies = require('../.build/src/functions/swapi/especies')
const fncNaves = require('../.build/src/functions/swapi/naves')
const fncPeliculas = require('../.build/src/functions/swapi/peliculas')
const fncPersonas = require('../.build/src/functions/swapi/personas')
const fncPlanetas = require('../.build/src/functions/swapi/planetas')
const fncVehiculos = require('../.build/src/functions/swapi/vehiculos')
const fncListarEmpleado = require('../.build/src/functions/empleado/listar')
const fncBuscarEmpleado = require('../.build/src/functions/empleado/buscar')
const fncCrearEmpleado = require('../.build/src/functions/empleado/crear')
const fncEditarEmpleado = require('../.build/src/functions/empleado/editar')
const fncEliminarEmpleado = require('../.build/src/functions/empleado/eliminar')

describe('Prueba la existencia de lambdas SWAPI', () => {
    test('Todas las funciones lambda de integración con SWAPI', () => {
        expect(typeof fncEspecies.buscarEspecieLambda).toBe('function');
        expect(typeof fncNaves.buscarNaveLambda).toBe('function');
        expect(typeof fncPeliculas.buscarPeliculaLambda).toBe('function');
        expect(typeof fncPersonas.buscarPersonaLambda).toBe('function');
        expect(typeof fncPlanetas.buscarPlanetaLambda).toBe('function');
        expect(typeof fncVehiculos.buscarVehiculoLambda).toBe('function');
    });
});

describe('Prueba la existencia de lambdas DYNAMODB', () => {
    test('Todas las funciones lambda de integración con DYNAMODB', () => {
        expect(typeof fncListarEmpleado.listarEmpleadoLambda).toBe('function');
        expect(typeof fncBuscarEmpleado.buscarEmpleadoLambda).toBe('function');
        expect(typeof fncCrearEmpleado.crearEmpleadoLambda).toBe('function');
        expect(typeof fncEditarEmpleado.editarEmpleadoLambda).toBe('function');
        expect(typeof fncEliminarEmpleado.eliminarEmpleadoLambda).toBe('function');
    });
});
