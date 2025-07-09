# Clima Tempo

Dashboard moderno em React para consulta de dados climáticos históricos e projeções futuras, consumindo a API Open-Meteo Climate. Foco em usabilidade, visual moderno (glassmorphism/gradiente), responsividade e código modular.

---

## 🏗️ Arquitetura

- **Frontend:** React (JavaScript)
- **Estilo:** CSS-in-JS (inline + styled-jsx), design moderno com gradiente, bordas arredondadas e sombra.
- **API:** [Open-Meteo Climate](https://open-meteo.com/en/docs/climate-api)
- **Componentização:** Modular, com separação clara de responsabilidades.
- **MCPs:** Model Context Protocol para integrações avançadas (PostgreSQL, Brave Search, Google Maps)

---

## 📁 Estrutura de Pastas

```
src/
  App.js                # Layout principal e roteamento dos cards
  components/
    CityDashboard.js    # Seleção de estado/cidade
    ClimateForm.js      # Formulário de busca customizada
    ClimateResults.js   # Exibição dos resultados e exportação CSV
  services/
    climateApi.js       # Integração com a API Open-Meteo
    mcpService.js       # Integração com MCPs (PostgreSQL, Brave Search, Google Maps)
  assets/               # (opcional) Ícones, imagens, etc.
  styles/               # (opcional) Estilos globais
mcp-config.js           # Configuração dos MCPs instalados
MCP_README.md           # Documentação específica dos MCPs
```

---

## 🧩 Principais Componentes

### 1. CityDashboard
- Permite selecionar um estado brasileiro e buscar rapidamente o clima da capital.
- Chama `onSelectCity` ao selecionar, preenchendo automaticamente o formulário.

### 2. ClimateForm
- Formulário customizado para busca de clima por coordenadas, datas, variáveis e modelos.
- Validação de campos, loading spinner, UX moderna.

### 3. ClimateResults
- Exibe resultados em card com resumo, tabela detalhada e botão para exportar CSV.
- Visual consistente com os outros cards.

---

## 🔄 Fluxo de Dados

1. Seleção de cidade/estado ou preenchimento do formulário.
2. Disparo de busca (`handleSearch`), que chama o serviço da API.
3. Exibição de loading, erro ou resultados.
4. Resultados podem ser exportados em CSV.
5. **Novo:** Integração com MCPs para funcionalidades avançadas.

---

## 🌐 Integração com a API

- Utiliza o serviço `climateApi.js` para requisições HTTP (Axios).
- Valida datas, coordenadas e variáveis antes de enviar.
- Suporta múltiplos modelos e variáveis.

---

## 🤖 Model Context Protocol (MCPs)

O projeto agora inclui integração com MCPs para funcionalidades avançadas:

### MCPs Instalados:
- **@modelcontextprotocol/sdk** - SDK principal para MCPs
- **@modelcontextprotocol/server-postgres** - Banco de dados PostgreSQL
- **@modelcontextprotocol/server-brave-search** - Pesquisas web
- **@modelcontextprotocol/server-google-maps** - Geocodificação e mapas

### Funcionalidades MCP:
- **Geocodificação:** Converter endereços em coordenadas
- **Pesquisas:** Buscar informações climáticas complementares
- **Armazenamento:** Salvar dados históricos no PostgreSQL
- **Histórico:** Consultar dados climáticos anteriores

Para mais detalhes, consulte o arquivo `MCP_README.md`.

---

## 🎨 Estilo e Responsividade

- Cards com gradiente azul/roxo, bordas arredondadas, sombra e padding.
- Layout flexível: cards lado a lado em telas grandes, empilhados em telas pequenas.
- Ícones Lucide React, tipografia clara, espaçamento generoso.

---

## 📦 Dependências

- **React** (v18+)
- **Axios** (requisições HTTP)
- **Lucide React** (ícones)
- **date-fns** (manipulação de datas)
- **@modelcontextprotocol/sdk** (MCP SDK)
- **@modelcontextprotocol/server-postgres** (PostgreSQL MCP)
- **@modelcontextprotocol/server-brave-search** (Brave Search MCP)
- **@modelcontextprotocol/server-google-maps** (Google Maps MCP)

Instale com:
```bash
npm install
```

---

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd Clima-Tempo
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure os MCPs (opcional):
   - Configure PostgreSQL (veja `MCP_README.md`)
   - Obtenha API keys para Brave Search e Google Maps
   - Configure as chaves no arquivo `mcp-config.js`
4. Rode o app:
   ```bash
   npm start
   ```
5. Acesse em [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Customização

- Para adicionar cidades/estados, edite o array em `CityDashboard.js`.
- Para adicionar variáveis/modelos, edite as opções em `ClimateForm.js`.
- Para alterar o visual, ajuste os estilos em `App.js` ou crie um arquivo de estilos global.
- Para configurar MCPs, edite o arquivo `mcp-config.js`.

---

## 📄 Licença

- Dados climáticos: [CC BY 4.0](https://pcmdi.llnl.gov/CMIP6/TermsOfUse)
- Código: MIT 