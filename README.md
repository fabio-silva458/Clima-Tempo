# Clima Tempo - Aplicação de Dados Climáticos

Uma aplicação React moderna que consome a API Open-Meteo Climate para fornecer dados climáticos históricos e projeções futuras.

## 🌟 Características

- **Interface moderna e responsiva** com design glassmorphism
- **Dados climáticos de alta resolução** (até 10km) de 1950 a 2050
- **Múltiplos modelos climáticos** do IPCC CMIP6
- **Variáveis climáticas abrangentes**: temperatura, precipitação, vento, umidade, radiação solar
- **Validação de dados** em tempo real
- **Exportação para CSV** dos resultados
- **Design responsivo** para desktop e mobile

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework principal
- **Axios** - Cliente HTTP para requisições à API
- **Lucide React** - Ícones modernos
- **Date-fns** - Manipulação de datas
- **CSS3** - Estilos modernos com glassmorphism

## 📊 API Utilizada

Esta aplicação utiliza a [API Open-Meteo Climate](https://open-meteo.com/en/docs/climate-api), que fornece:

- **Dados climáticos históricos** (1950-2023)
- **Projeções futuras** (2024-2050)
- **7 modelos climáticos** de alta resolução
- **20+ variáveis climáticas**
- **Resolução de até 10km**

### Modelos Climáticos Disponíveis

1. **CMCC-CM2-VHR4** (Itália) - 30km
2. **FGOALS-f3-H** (China) - 28km
3. **HiRAM-SIT-HR** (Taiwan) - 25km
4. **MRI-AGCM3-2-S** (Japão) - 20km
5. **EC-Earth3P-HR** (Europa) - 29km
6. **MPI-ESM1-2-XR** (Alemanha) - 51km
7. **NICAM16-8S** (Japão) - 31km

### Variáveis Climáticas

- **Temperatura**: Média, máxima e mínima (2m)
- **Vento**: Velocidade média e máxima (10m)
- **Precipitação**: Total, chuva e neve
- **Umidade**: Relativa média, máxima e mínima
- **Radiação**: Solar total e cobertura de nuvens
- **Pressão**: Atmosférica média
- **Solo**: Umidade do solo (0-10cm)

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd clima-tempo
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria a versão de produção
- `npm test` - Executa os testes
- `npm eject` - Ejecta do Create React App

## 📱 Como Usar

1. **Insira as coordenadas** da localização desejada (latitude e longitude)
2. **Selecione o período** de análise (entre 1950 e 2050)
3. **Escolha as variáveis climáticas** que deseja analisar
4. **Selecione os modelos climáticos** para comparação
5. **Clique em "Buscar Dados Climáticos"**
6. **Visualize os resultados** com estatísticas e dados detalhados
7. **Exporte os dados** para CSV se necessário

### Exemplos de Coordenadas

- **São Paulo, Brasil**: -23.5505, -46.6333
- **Rio de Janeiro, Brasil**: -22.9068, -43.1729
- **Brasília, Brasil**: -15.7942, -47.8822
- **Nova York, EUA**: 40.7128, -74.0060
- **Londres, Reino Unido**: 51.5074, -0.1278

## 🎨 Design e UX

A aplicação utiliza um design moderno com:

- **Glassmorphism**: Efeito de vidro fosco com blur
- **Gradientes**: Cores suaves e modernas
- **Ícones intuitivos**: Lucide React para melhor UX
- **Responsividade**: Funciona perfeitamente em mobile
- **Animações suaves**: Transições e hover effects
- **Feedback visual**: Loading states e mensagens de erro

## 📊 Funcionalidades

### Formulário Inteligente
- Validação em tempo real
- Categorização de variáveis climáticas
- Seleção múltipla de modelos
- Interface intuitiva

### Visualização de Dados
- Estatísticas resumidas (mín, máx, média)
- Tabela detalhada dos dados
- Formatação adequada de unidades
- Exportação para CSV

### Tratamento de Erros
- Validação de coordenadas
- Verificação de período válido
- Mensagens de erro claras
- Fallbacks para dados ausentes

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── ClimateForm.js      # Formulário de busca
│   └── ClimateResults.js   # Exibição dos resultados
├── services/
│   └── climateApi.js       # Serviço da API
├── App.js                  # Componente principal
├── index.js               # Ponto de entrada
└── index.css              # Estilos globais
```

## 📄 Licença

Este projeto está sob a licença MIT. Os dados climáticos são fornecidos pela Open-Meteo sob Creative Commons Attribution 4.0 International License (CC BY 4.0).

## 🙏 Agradecimentos

- [Open-Meteo](https://open-meteo.com/) pela API gratuita e de alta qualidade
- [IPCC CMIP6](https://www.wcrp-climate.org/wgcm-cmip/wgcm-cmip6) pelos modelos climáticos
- [Lucide](https://lucide.dev/) pelos ícones modernos
- [Date-fns](https://date-fns.org/) pela manipulação de datas

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando React e a API Open-Meteo Climate** 