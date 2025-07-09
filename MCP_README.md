# Model Context Protocol (MCP) - Clima Tempo

Este documento explica os MCPs instalados no projeto Clima Tempo e como utilizá-los.

## 📦 MCPs Instalados

### 1. @modelcontextprotocol/sdk (v1.15.0)
**Descrição:** SDK principal para trabalhar com Model Context Protocol
**Uso:** Base para integração com outros servidores MCP
**Documentação:** [GitHub](https://github.com/modelcontextprotocol/js)

### 2. @modelcontextprotocol/server-postgres (v0.6.2)
**Descrição:** Servidor MCP para interação com bancos PostgreSQL
**Uso:** Armazenar dados climáticos históricos, cache de consultas
**Configuração:** Requer PostgreSQL instalado e configurado

### 3. @modelcontextprotocol/server-brave-search (v0.6.2)
**Descrição:** Servidor MCP para integração com Brave Search API
**Uso:** Pesquisar informações climáticas, notícias meteorológicas
**Configuração:** Requer API key do Brave Search

### 4. @modelcontextprotocol/server-google-maps (v0.6.2)
**Descrição:** Servidor MCP para integração com Google Maps API
**Uso:** Geocodificação, informações de localização, mapas
**Configuração:** Requer API key do Google Maps

## 🚀 Como Configurar

### 1. Configurar PostgreSQL
```bash
# Instalar PostgreSQL (Windows)
# Baixe de: https://www.postgresql.org/download/windows/

# Criar banco de dados
createdb clima_tempo

# Configurar variáveis de ambiente
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
export POSTGRES_DB=clima_tempo
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=sua_senha
```

### 2. Obter API Keys

#### Brave Search API
1. Acesse: https://api.search.brave.com/
2. Crie uma conta e obtenha sua API key
3. Configure no arquivo `mcp-config.js`

#### Google Maps API
1. Acesse: https://console.cloud.google.com/
2. Crie um projeto e habilite as APIs:
   - Geocoding API
   - Maps JavaScript API
   - Places API
3. Obtenha sua API key
4. Configure no arquivo `mcp-config.js`

## 💡 Exemplos de Uso

### Pesquisar Informações Climáticas
```javascript
import { searchClimateData } from './mcp-config.js';

// Pesquisar sobre mudanças climáticas
const results = await searchClimateData('mudanças climáticas Brasil 2024');
```

### Geocodificar Endereço
```javascript
import { getLocationCoordinates } from './mcp-config.js';

// Obter coordenadas de uma cidade
const coords = await getLocationCoordinates('São Paulo, SP, Brasil');
```

### Salvar Dados no PostgreSQL
```javascript
import { saveClimateData } from './mcp-config.js';

// Salvar dados climáticos
const climateData = {
  city: 'São Paulo',
  temperature: 25.5,
  humidity: 65,
  date: new Date()
};

await saveClimateData(climateData);
```

## 🔧 Integração com o Projeto Atual

### Expandir CityDashboard
- Usar Google Maps MCP para geocodificação automática
- Implementar busca de cidades por nome

### Expandir ClimateForm
- Usar Brave Search para informações meteorológicas complementares
- Implementar sugestões de localização

### Expandir ClimateResults
- Salvar resultados no PostgreSQL para histórico
- Implementar comparação com dados históricos

## 📋 Próximos Passos

1. **Configurar APIs:** Obter e configurar as API keys necessárias
2. **Implementar Integrações:** Conectar os MCPs com os componentes React
3. **Testar Funcionalidades:** Verificar se todos os MCPs estão funcionando
4. **Otimizar Performance:** Implementar cache e otimizações

## 🛠️ Troubleshooting

### Erro de Conexão PostgreSQL
```bash
# Verificar se PostgreSQL está rodando
pg_ctl status

# Reiniciar PostgreSQL
pg_ctl restart
```

### Erro de API Key
- Verificar se as API keys estão configuradas corretamente
- Verificar se as APIs estão habilitadas nos consoles respectivos
- Verificar limites de uso das APIs

### Erro de Módulo não encontrado
```bash
# Reinstalar dependências
npm install

# Verificar versões
npm list @modelcontextprotocol
```

## 📚 Recursos Adicionais

- [Documentação MCP](https://modelcontextprotocol.io/)
- [Brave Search API Docs](https://api.search.brave.com/app/dashboard)
- [Google Maps API Docs](https://developers.google.com/maps/documentation)
- [PostgreSQL Docs](https://www.postgresql.org/docs/) 