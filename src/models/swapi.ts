/**
 * @description Interface para datos de Especie
 */
export interface IEspecie {
  nombre?: string
  clasificacion?: string
  designacion?: string
  altura_media?: string
  color_piel?: string
  color_cabello?: string
  color_ojos?: string
  promedio_vida?: string
  planeta?: string
  idioma?: string
  personas?: string
  peliculas?: string
  creado?: string
  editado?: string
  url?: string
}

/**
 * @description Interface para datos de Nave
 */
export interface INave {
  nombre?: string
  modelo?: string
  fabricante?: string
  costo_en_creditos?: string
  longitud?: string
  velocidad_maxima_admosfera?: string
  tripulacion?: string
  pasajeros?: string
  capacidad_carga?: string
  consumibles?: string
  hiperimpulsor_calificacion?: string
  MGLT?: string
  clase_nave?: string
  pilotos?: string
  peliculas?: string
  creado?: string
  editado?: string
  url?: string
}

/**
 * @description Interface para datos de Película
 */
export interface IPelicula {
  titulo?: string
  id_episodio?: string
  texto_apertura?: string
  director?: string
  productor?: string
  fecha_lanzamiento?: string
  personas?: string
  planetas?: string
  naves?: string
  vehiculos?: string
  especies?: string
  creado?: string
  editado?: string
  url?: string
}

/**
 * @description Interface para datos de Persona
 */
export interface IPersona {
  nombre?: string
  altura?: string
  peso?: string
  color_cabello?: string
  color_piel?: string
  color_ojos?: string
  fecha_nacimiento?: string
  genero?: string
  planeta_natal?: string
  peliculas?: any
  especies?: any
  vehiculos?: any
  naves?: any
  creado?: string
  editado?: string
  url?: string
}

/**
 * @description Interface para datos de Planeta
 */
export interface IPlaneta {
  nombre?: string
  clima?: string
  gravedad?: string
  diametro?: string
  periodo_orbital?: string
  periodo_rotacion?: string
  poblacion?: string
  residentes?: string
  peliculas?: string
  superficie_agua?: string
  terreno?: string
  url?: string
  creado?: string
  editado?: string
}

/**
 * @description Interface para datos de Vehiculo
 */
export interface IVehiculo {
  nombre?: string
  modelo?: string
  fabricante?: string
  costo_en_creditos?: string
  longitud?: string
  velocidad_maxima_admosfera?: string
  tripulacion?: string
  pasajeros?: string
  capacidad_carga?: string
  consumibles?: string
  clase_vehiculo?: string
  pilotos?: string
  peliculas?: string
  creado?: string
  editado?: string
  url?: string
}
