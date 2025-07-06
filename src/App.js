import React, { useState, useRef } from 'react';
import { Cloud, Info, Github } from 'lucide-react';
import ClimateForm from './components/ClimateForm';
import ClimateResults from './components/ClimateResults';
import CityDashboard from './components/CityDashboard';
import { climateApi } from './services/climateApi';

function App() {
  const [climateData, setClimateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState(null);
  const formRef = useRef();

  const handleSearch = async (params) => {
    setLoading(true);
    setError(null);
    setSearchParams(params);
    try {
      const data = await climateApi.getClimateData(
        params.latitude,
        params.longitude,
        params.startDate,
        params.endDate,
        params.variables,
        params.models
      );
      setClimateData(data);
    } catch (err) {
      setError(err.message);
      setClimateData(null);
    } finally {
      setLoading(false);
    }
  };

  // Busca automática para cidade selecionada
  const handleSelectCity = (city) => {
    const today = new Date();
    const startDate = today.toISOString().slice(0, 10);
    const endDate = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const values = {
      latitude: city.latitude,
      longitude: city.longitude,
      startDate,
      endDate,
      variables: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum'],
      models: ['EC_Earth3P_HR']
    };
    setInitialFormValues(values);
    handleSearch(values);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '20px 0',
        marginBottom: '30px'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Cloud size={32} style={{ color: '#667eea', marginRight: '12px' }} />
              <h1 style={{ 
                margin: 0, 
                color: '#333', 
                fontSize: '28px',
                fontWeight: '700'
              }}>
                Clima Tempo
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a 
                href="https://open-meteo.com/en/docs/climate-api" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <Info size={16} style={{ marginRight: '4px' }} />
                API Docs
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <Github size={16} style={{ marginRight: '4px' }} />
                GitHub
              </a>
            </div>
          </div>
          <p style={{ 
            margin: '8px 0 0 0', 
            color: '#666', 
            fontSize: '16px',
            maxWidth: '600px'
          }}>
            Explore dados climáticos históricos e projeções futuras usando a API Open-Meteo Climate. 
            Analise temperaturas, precipitações, ventos e outras variáveis climáticas de 1950 a 2050.
          </p>
        </div>
      </header>

      <main className="container">
        <div className="main-flex" style={{
          display: 'flex',
          gap: 32,
          alignItems: 'stretch',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 32,
          width: '100%',
          maxWidth: 1500,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div className="main-card card1" style={{ flex: 1, minWidth: 0 }}>
            <CityDashboard onSelectCity={handleSelectCity} />
          </div>
          <div className="main-card card2" style={{ flex: 1, minWidth: 0 }}>
            <ClimateForm onSearch={handleSearch} loading={loading} ref={formRef} initialValues={initialFormValues} />
          </div>
          <div className="main-card card3" style={{ flex: 1, minWidth: 0 }}>
            {climateData && !loading && (
              <ClimateResults data={climateData} searchParams={searchParams} />
            )}
          </div>
        </div>

        {loading && (
          <div className="card">
            <div className="loading">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }}></div>
                <p>Buscando dados climáticos...</p>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  Isso pode levar alguns segundos dependendo do período e variáveis selecionadas.
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="card">
            <div className="error">
              <h3 style={{ marginBottom: '8px', color: '#c33' }}>Erro ao buscar dados</h3>
              <p>{error}</p>
              <p style={{ marginTop: '12px', fontSize: '14px' }}>
                Verifique se as coordenadas estão corretas e se o período selecionado está entre 1950 e 2050.
              </p>
            </div>
          </div>
        )}

        {/* Informações sobre a API */}
        <div className="card">
          <h3 style={{ marginBottom: '15px', color: '#555' }}>
            <Info size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Sobre a API Open-Meteo Climate
          </h3>
          <div style={{ lineHeight: '1.6', color: '#666' }}>
            <p style={{ marginBottom: '12px' }}>
              Esta aplicação utiliza a <strong>API Open-Meteo Climate</strong>, que fornece dados climáticos 
              de alta resolução baseados em modelos do IPCC CMIP6. Os dados estão disponíveis de 1950 a 2050 
              com resolução de até 10 km.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Modelos disponíveis:</strong> CMCC-CM2-VHR4, FGOALS-f3-H, HiRAM-SIT-HR, MRI-AGCM3-2-S, 
              EC-Earth3P-HR, MPI-ESM1-2-XR, NICAM16-8S
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Variáveis climáticas:</strong> Temperatura, precipitação, velocidade do vento, 
              umidade relativa, radiação solar, cobertura de nuvens, pressão atmosférica e mais.
            </p>
            <p style={{ fontSize: '14px', fontStyle: 'italic' }}>
              Dados licenciados sob Creative Commons Attribution 4.0 International License (CC BY 4.0). 
              Consulte os <a href="https://pcmdi.llnl.gov/CMIP6/TermsOfUse" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea' }}>termos de uso</a> para mais informações.
            </p>
          </div>
        </div>
      </main>

      <footer style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '20px 0',
        marginTop: '50px',
        textAlign: 'center',
        color: '#666'
      }}>
        <div className="container">
          <p style={{ margin: '0 0 8px 0' }}>
            Desenvolvido com ❤️ usando React e a API Open-Meteo Climate
          </p>
          <p style={{ margin: 0, fontSize: '14px' }}>
            © 2024 Clima Tempo App | Dados fornecidos por Open-Meteo
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .main-flex {
          gap: 32px !important;
        }
        .main-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
          /* Novo visual inspirado na imagem */
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 32px;
          box-shadow: 0 8px 32px 0 rgba(76, 110, 245, 0.18);
          padding: 20px 12px;
          max-width: 370px;
          width: 100%;
          color: #fff;
          margin-bottom: 0;
          border: none;
        }
        .main-card :global(h2),
        .main-card :global(h3),
        .main-card :global(label),
        .main-card :global(p),
        .main-card :global(span) {
          color: #fff !important;
        }
        .main-card:not(:last-child) {
          margin-right: 32px;
        }
        @media (max-width: 1280px) {
          .main-flex {
            flex-direction: column;
            gap: 0 !important;
          }
          .main-card {
            margin-right: 0 !important;
            margin-bottom: 24px;
            max-width: 100%;
          }
        }
        @media (max-width: 900px) {
          .main-flex > div {
            min-width: 100% !important;
            max-width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .container {
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          .main-flex {
            gap: 0 !important;
          }
          .main-card {
            margin-bottom: 18px;
            padding: 18px 6px;
            border-radius: 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default App; 