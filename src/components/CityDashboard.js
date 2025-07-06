import React from 'react';

const CITIES = [
  { name: 'São Paulo - SP', latitude: -23.5505, longitude: -46.6333 },
  { name: 'Rio de Janeiro - RJ', latitude: -22.9068, longitude: -43.1729 },
  { name: 'Brasília - DF', latitude: -15.7942, longitude: -47.8822 },
  { name: 'Salvador - BA', latitude: -12.9777, longitude: -38.5016 },
  { name: 'Fortaleza - CE', latitude: -3.7172, longitude: -38.5433 },
  { name: 'Belo Horizonte - MG', latitude: -19.9167, longitude: -43.9345 },
  { name: 'Curitiba - PR', latitude: -25.4284, longitude: -49.2733 },
  { name: 'Manaus - AM', latitude: -3.1190, longitude: -60.0217 },
  { name: 'Porto Alegre - RS', latitude: -30.0346, longitude: -51.2177 },
  { name: 'Recife - PE', latitude: -8.0476, longitude: -34.8770 },
  { name: 'Belém - PA', latitude: -1.4558, longitude: -48.4902 },
  { name: 'Goiânia - GO', latitude: -16.6869, longitude: -49.2648 },
  { name: 'Campinas - SP', latitude: -22.9056, longitude: -47.0608 },
  { name: 'São Luís - MA', latitude: -2.5307, longitude: -44.3068 },
  { name: 'Natal - RN', latitude: -5.7945, longitude: -35.2110 }
];

const CityDashboard = ({ onSelectCity }) => {
  return (
    <div className="card" style={{ marginBottom: 32, background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)', boxShadow: '0 8px 32px rgba(102,126,234,0.10)' }}>
      <h2 style={{ textAlign: 'center', color: '#fbbf24', fontWeight: 800, fontSize: 28, marginBottom: 8, letterSpacing: 1 }}>
        Confira a previsão de clima e tempo da semana
      </h2>
      <p style={{ textAlign: 'center', color: '#555', fontSize: 18, marginBottom: 24 }}>
        para as principais cidades do Brasil:
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        justifyItems: 'center',
        margin: '0 auto',
        maxWidth: 900
      }}>
        {CITIES.map(city => (
          <button
            key={city.name}
            className="btn"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #fbbf24 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 0,
              boxShadow: '0 2px 8px rgba(102,126,234,0.10)',
              border: 'none',
              padding: '18px 0',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={() => onSelectCity(city)}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityDashboard; 