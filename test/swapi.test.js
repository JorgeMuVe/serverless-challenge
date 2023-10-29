const eventGenerator = require('./utils/eventGenerator')
const validators = require('./utils/validators')
const fncEspecies = require('../.build/src/functions/swapi/especies')
const fncNaves = require('../.build/src/functions/swapi/naves')
const fncPeliculas = require('../.build/src/functions/swapi/peliculas')
const fncPersonas = require('../.build/src/functions/swapi/personas')
const fncPlanetas = require('../.build/src/functions/swapi/planetas')
const fncVehiculos = require('../.build/src/functions/swapi/vehiculos')

test('Test buscarEspecies', async () => {
  const event = eventGenerator({ pathParametersObject: { id: '4' } })
  await fncEspecies.buscarEspecieLambda(event, null, (error, res) => {
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

test('Test buscarNaves', async () => {
  const event = eventGenerator({ pathParametersObject: { id: '6' } })
  await fncNaves.buscarNaveLambda(event, null, (error, res) => {
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

test('Test buscarPeliculas', async () => {
  const event = eventGenerator({ pathParametersObject: { id: '6' } })
  await fncPeliculas.buscarPeliculaLambda(event, null, (error, res) => {
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

test('Test buscarPersonas', async () => {
  const event = eventGenerator({ pathParametersObject: { id: '6' } })
  await fncPersonas.buscarPersonaLambda(event, null, (error, res) => {
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

test('Test buscarPlanetas', async () => {
  const event = eventGenerator({ pathParametersObject: { id: '6' } })
  await fncPlanetas.buscarPlanetaLambda(event, null, (error, res) => {
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})

test('Test buscarVehiculos', async () => {
  const event = eventGenerator({ pathParametersObject: { id: '6' } })
  await fncVehiculos.buscarVehiculoLambda(event, null, (error, res) => {
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toEqual(true)
  })
})
