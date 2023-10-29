import axios from 'axios'
import { IEspecie, INave, IPelicula, IPersona, IPlaneta, IVehiculo } from '../models/swapi'

export class SwapiController {
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
   * @description Buscar Vehiculo SWAPI
   * @param id string Identificador de vehiculo
   * @returns Objecto IVehiculo
   */
  public buscarVehiculo = async (id: string): Promise<IVehiculo> => {
    try {
      const { data } = await axios.get(`https://swapi.py4e.com/api/vehicles/${id}`, { headers: { 'Accept-Encoding': 'application/json' } })
      const vehiculo: IVehiculo = {
        nombre: data.name,
        modelo: data.model,
        fabricante: data.manufacturer,
        costo_en_creditos: data.cost_in_credits,
        longitud: data.length,
        velocidad_maxima_admosfera: data.max_atmosphering_speed,
        tripulacion: data.crew,
        pasajeros: data.passengers,
        capacidad_carga: data.cargo_capacity,
        consumibles: data.consumables,
        clase_vehiculo: data.vehicle_class,
        pilotos: data.pilots,
        peliculas: data.films,
        creado: data.created,
        editado: data.edited,
        url: data.url
      }
      return vehiculo
    } catch (error) { throw new Error('Vehiculo no encontrado') }
  }

  /**
   * @description Buscar Nave SWAPI
   * @param id string Identificador de nave
   * @returns Objecto INave
   */
  public buscarNave = async (id: string): Promise<INave> => {
    try {
      const { data } = await axios.get(`https://swapi.py4e.com/api/starships/${id}`, { headers: { 'Accept-Encoding': 'application/json' } })
      const nave: INave = {
        nombre: data.name,
        modelo: data.model,
        fabricante: data.manufacturer,
        costo_en_creditos: data.cost_in_credits,
        longitud: data.length,
        velocidad_maxima_admosfera: data.max_atmosphering_speed,
        tripulacion: data.crew,
        pasajeros: data.passengers,
        capacidad_carga: data.cargo_capacity,
        consumibles: data.consumables,
        hiperimpulsor_calificacion: data.hyperdrive_rating,
        MGLT: data.MGLT, // MEGA LUZ POR HORA
        clase_nave: data.starship_class,
        pilotos: data.pilots,
        peliculas: data.films,
        creado: data.created,
        editado: data.edited,
        url: data.url
      }
      return nave
    } catch (error) { throw new Error('Nave no encontrada') }
  }

  /**
   * @description Buscar Especie SWAPI
   * @param id string Identificador de especie
   * @returns Objecto IEspecie
   */
  public buscarEspecie = async (id: string): Promise<IEspecie> => {
    try {
      const { data } = await axios.get(`https://swapi.py4e.com/api/species/${id}`, { headers: { 'Accept-Encoding': 'application/json' } })
      const especie: IEspecie = {
        nombre: data.name,
        clasificacion: data.classification,
        designacion: data.designation,
        altura_media: data.average_height,
        color_piel: data.skin_colors,
        color_cabello: data.hair_colors,
        color_ojos: data.eye_colors,
        promedio_vida: data.average_lifespan,
        planeta: data.homeworld,
        idioma: data.language,
        personas: data.people,
        peliculas: data.films,
        creado: data.created,
        editado: data.edited,
        url: data.url
      }
      return especie
    } catch (error) { throw new Error('Especie no encontrada') }
  }

  /**
   * @description Buscar Planeta SWAPI
   * @param id string Identificador de planeta
   * @returns Objecto APIGatewayProxyResult
   */
  public buscarPlaneta = async (id: string): Promise<IPlaneta> => {
    try {
      const { data } = await axios.get(`https://swapi.py4e.com/api/planets/${id}`, { headers: { 'Accept-Encoding': 'application/json' } })
      const planeta: IPlaneta = {
        nombre: data.name,
        clima: data.climate,
        gravedad: data.gravity,
        diametro: data.diameter,
        periodo_orbital: data.orbital_period,
        periodo_rotacion: data.rotation_period,
        poblacion: data.population,
        residentes: data.residents,
        peliculas: data.films,
        superficie_agua: data.surface_water,
        terreno: data.terrain,
        url: data.url,
        creado: data.created,
        editado: data.edited
      }
      return planeta
    } catch (error) { throw new Error('Planeta no creado') }
  }

  /**
   * @description Buscar Película SWAPI
   * @param id string Identificador de película
   * @returns Objecto IPelicula
   */
  public buscarPelicula = async (id: string): Promise<IPelicula> => {
    try {
      const { data } = await axios.get(`https://swapi.py4e.com/api/films/${id}`, { headers: { 'Accept-Encoding': 'application/json' } })
      const pelicula: IPelicula = {
        titulo: data.title,
        id_episodio: data.episode_id,
        texto_apertura: data.opening_crawl,
        director: data.director,
        productor: data.producer,
        fecha_lanzamiento: data.release_date,
        personas: data.characters,
        planetas: data.planets,
        naves: data.starships,
        vehiculos: data.vehicles,
        especies: data.species,
        creado: data.created,
        editado: data.edited,
        url: data.url
      }
      return pelicula
    } catch (error) { throw new Error('Película no encontrada') }
  }

  /**
   * @description Buscar Persona SWAPI
   * @param id string Identificador de persona
   * @returns Objecto IPersona
   */
  public buscarPersona = async (id: string): Promise<IPersona> => {
    try {
      const obtenerPlaneta = async (urlPlaneta: string): Promise<string> => {
        let nombrePlaneta = ''
        try {
          const id = urlPlaneta.replace('https://swapi.py4e.com/api/planets/', '').replace('/', '')
          const planet = await this.buscarPlaneta(id)
          nombrePlaneta = planet.nombre ?? ''
        } catch (error: any) { nombrePlaneta = error.message }
        return nombrePlaneta // Devuelve el nombre del planeta
      }

      const obtenerPeliculas = async (urlPeliculas: string[]): Promise<string[]> => {
        const listaPeliculas: string[] = []
        const listaIds = urlPeliculas.map(url => url.replace('https://swapi.py4e.com/api/films/', '').replace('/', ''))
        for await (const id of listaIds) {
          try {
            const pelicula = await this.buscarPelicula(id)
            listaPeliculas.push(pelicula.titulo ?? '')
          } catch (error) { console.log('error', error) }
        }
        return listaPeliculas
      }

      const obtenerEspecies = async (urlEspecies: string[]): Promise<string[]> => {
        const listaEspecies: string[] = []
        const listaIds = urlEspecies.map(url => url.replace('https://swapi.py4e.com/api/species/', '').replace('/', ''))
        for await (const id of listaIds) {
          try {
            const especie = await this.buscarEspecie(id)
            listaEspecies.push(especie.nombre ?? '')
          } catch (error) { console.log('error', error) }
        }
        return listaEspecies
      }

      const obtenerVehiculos = async (urlVehiculos: string[]): Promise<string[]> => {
        const listaVehiculos: string[] = []
        const listaIds = urlVehiculos.map(url => url.replace('https://swapi.py4e.com/api/vehicles/', '').replace('/', ''))
        for await (const id of listaIds) {
          try {
            const vehiculo = await this.buscarVehiculo(id)
            listaVehiculos.push(vehiculo.nombre ?? '')
          } catch (error) { console.log('error', error) }
        }
        return listaVehiculos
      }

      const obtenerNaves = async (urlNaves: string[]): Promise<string[]> => {
        const listaNaves: string[] = []
        const listaIds = urlNaves.map(url => url.replace('https://swapi.py4e.com/api/starships/', '').replace('/', ''))
        for await (const id of listaIds) {
          try {
            const nave = await this.buscarNave(id)
            listaNaves.push(nave.nombre ?? '')
          } catch (error) { console.log('error', error) }
        }
        return listaNaves
      }

      const { data } = await axios.get(`https://swapi.py4e.com/api/people/${id}`, { headers: { 'Accept-Encoding': 'application/json' } })
      const persona: IPersona = {
        nombre: data.name,
        altura: data.height,
        peso: data.mass,
        color_cabello: data.hair_color,
        color_piel: data.skin_color,
        color_ojos: data.eye_color,
        fecha_nacimiento: data.birth_year,
        genero: data.gender,
        planeta_natal: await obtenerPlaneta(data.homeworld ?? ''), // Obtiene el planeta natal de SWAPI
        peliculas: await obtenerPeliculas(data.films ?? []), // Obtiene las películas de SWAPI
        especies: await obtenerEspecies(data.species ?? []), // Obtiene las especies de SWAPI
        vehiculos: await obtenerVehiculos(data.vehicles ?? []), // Obtiene los vehiculos de SWAPI
        naves: await obtenerNaves(data.starships ?? []), // Obtiene las naves de SWAPI
        creado: data.created,
        editado: data.edited,
        url: data.url
      }
      return persona
    } catch (error) { throw new Error('Persona no encontrada') }
  }
}

export const swapiControllerInstance = new SwapiController()
