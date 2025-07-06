import axios from 'axios';

const BASE_URL = 'https://climate-api.open-meteo.com/v1/climate';

// Modelos climáticos disponíveis
export const CLIMATE_MODELS = {
  CMCC_CM2_VHR4: 'CMCC_CM2_VHR4',
  FGOALS_f3_H: 'FGOALS_f3_H',
  HiRAM_SIT_HR: 'HiRAM_SIT_HR',
  MRI_AGCM3_2_S: 'MRI_AGCM3_2_S',
  EC_Earth3P_HR: 'EC_Earth3P_HR',
  MPI_ESM1_2_XR: 'MPI_ESM1_2_XR',
  NICAM16_8S: 'NICAM16_8S'
};

// Variáveis climáticas disponíveis
export const CLIMATE_VARIABLES = {
  temperature_2m_mean: 'Temperatura Média (2m)',
  temperature_2m_max: 'Temperatura Máxima (2m)',
  temperature_2m_min: 'Temperatura Mínima (2m)',
  wind_speed_10m_mean: 'Velocidade Média do Vento (10m)',
  wind_speed_10m_max: 'Velocidade Máxima do Vento (10m)',
  cloud_cover_mean: 'Cobertura Média de Nuvens',
  shortwave_radiation_sum: 'Radiação Solar Total',
  relative_humidity_2m_mean: 'Umidade Relativa Média (2m)',
  relative_humidity_2m_max: 'Umidade Relativa Máxima (2m)',
  relative_humidity_2m_min: 'Umidade Relativa Mínima (2m)',
  dewpoint_2m_mean: 'Ponto de Orvalho Médio (2m)',
  dewpoint_2m_min: 'Ponto de Orvalho Mínimo (2m)',
  dewpoint_2m_max: 'Ponto de Orvalho Máximo (2m)',
  precipitation_sum: 'Precipitação Total',
  rain_sum: 'Chuva Total',
  snowfall_sum: 'Neve Total',
  pressure_msl_mean: 'Pressão Atmosférica Média',
  soil_moisture_0_to_10cm_mean: 'Umidade do Solo (0-10cm)',
  et0_fao_evapotranspiration: 'Evapotranspiração de Referência (ET₀)'
};

export const climateApi = {
  /**
   * Busca dados climáticos para uma localização específica
   * @param {number} latitude - Latitude da localização
   * @param {number} longitude - Longitude da localização
   * @param {string} startDate - Data de início (YYYY-MM-DD)
   * @param {string} endDate - Data de fim (YYYY-MM-DD)
   * @param {Array} variables - Array de variáveis climáticas
   * @param {Array} models - Array de modelos climáticos
   * @returns {Promise} Dados climáticos
   */
  async getClimateData(latitude, longitude, startDate, endDate, variables = [], models = []) {
    try {
      const params = {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        daily: variables.join(','),
        models: models.join(','),
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        precipitation_unit: 'mm',
        timeformat: 'iso8601'
      };

      const response = await axios.get(BASE_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados climáticos:', error);
      throw new Error(error.response?.data?.reason || 'Erro ao buscar dados climáticos');
    }
  },

  /**
   * Busca dados climáticos para múltiplas localizações
   * @param {Array} coordinates - Array de coordenadas [{latitude, longitude}]
   * @param {string} startDate - Data de início (YYYY-MM-DD)
   * @param {string} endDate - Data de fim (YYYY-MM-DD)
   * @param {Array} variables - Array de variáveis climáticas
   * @param {Array} models - Array de modelos climáticos
   * @returns {Promise} Dados climáticos para múltiplas localizações
   */
  async getClimateDataMultiple(coordinates, startDate, endDate, variables = [], models = []) {
    try {
      const latitudes = coordinates.map(coord => coord.latitude).join(',');
      const longitudes = coordinates.map(coord => coord.longitude).join(',');

      const params = {
        latitude: latitudes,
        longitude: longitudes,
        start_date: startDate,
        end_date: endDate,
        daily: variables.join(','),
        models: models.join(','),
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        precipitation_unit: 'mm',
        timeformat: 'iso8601'
      };

      const response = await axios.get(BASE_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados climáticos múltiplos:', error);
      throw new Error(error.response?.data?.reason || 'Erro ao buscar dados climáticos');
    }
  },

  /**
   * Valida se as coordenadas são válidas
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @returns {boolean} Se as coordenadas são válidas
   */
  validateCoordinates(latitude, longitude) {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  },

  /**
   * Valida se a data está no formato correto
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {boolean} Se a data é válida
   */
  validateDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  },

  /**
   * Valida se a data está dentro do intervalo permitido (1950-2050)
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {boolean} Se a data está no intervalo permitido
   */
  validateDateRange(date) {
    const year = parseInt(date.split('-')[0]);
    return year >= 1950 && year <= 2050;
  }
}; 