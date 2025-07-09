// Serviço para integração dos MCPs com o projeto Clima Tempo
// Este arquivo demonstra como usar os MCPs instalados

import { initializeMCP, searchClimateData, getLocationCoordinates, saveClimateData } from '../../mcp-config.js';

class MCPService {
  constructor() {
    this.client = null;
    this.isInitialized = false;
  }

  // Inicializar o cliente MCP
  async initialize() {
    try {
      this.client = await initializeMCP();
      this.isInitialized = true;
      console.log('MCP Service inicializado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao inicializar MCP Service:', error);
      return false;
    }
  }

  // Buscar informações climáticas complementares via Brave Search
  async searchClimateInfo(query) {
    if (!this.isInitialized) {
      console.warn('MCP Service não inicializado');
      return null;
    }

    try {
      const results = await searchClimateData(query);
      return results;
    } catch (error) {
      console.error('Erro ao buscar informações climáticas:', error);
      return null;
    }
  }

  // Geocodificar endereço via Google Maps
  async geocodeAddress(address) {
    if (!this.isInitialized) {
      console.warn('MCP Service não inicializado');
      return null;
    }

    try {
      const coordinates = await getLocationCoordinates(address);
      return coordinates;
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
      return null;
    }
  }

  // Salvar dados climáticos no PostgreSQL
  async saveClimateDataToDatabase(data) {
    if (!this.isInitialized) {
      console.warn('MCP Service não inicializado');
      return false;
    }

    try {
      await saveClimateData(data);
      console.log('Dados climáticos salvos com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados climáticos:', error);
      return false;
    }
  }

  // Buscar dados climáticos históricos do PostgreSQL
  async getHistoricalData(city, startDate, endDate) {
    if (!this.isInitialized) {
      console.warn('MCP Service não inicializado');
      return null;
    }

    try {
      // Implementar busca de dados históricos
      console.log(`Buscando dados históricos para ${city} de ${startDate} a ${endDate}`);
      return [];
    } catch (error) {
      console.error('Erro ao buscar dados históricos:', error);
      return null;
    }
  }

  // Verificar se o serviço está disponível
  isAvailable() {
    return this.isInitialized;
  }
}

// Instância singleton do serviço
const mcpService = new MCPService();

export default mcpService; 