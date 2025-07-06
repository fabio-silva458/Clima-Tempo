import React from 'react';
import { MapPin } from 'lucide-react';

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
    <div className="card" style={{
      background: 'rgba(255,255,255,0.85)',
      boxShadow: '0 8px 32px rgba(102,126,234,0.10)',
      border: '1.5px solid rgba(102,126,234,0.10)',
      borderRadius: 24,
      padding: 32,
      maxWidth: 900,
      margin: '0 auto',
      marginBottom: 32
    }}>
      <h2 style={{ textAlign: 'center', color: '#fbbf24', fontWeight: 800, fontSize: 28, marginBottom: 8, letterSpacing: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <MapPin size={28} style={{ color: '#667eea', marginBottom: -4 }} />
        Confira a previsão de clima e tempo da semana
      </h2>
      <p style={{ textAlign: 'center', color: '#555', fontSize: 18, marginBottom: 28 }}>
        para as principais cidades do Brasil:
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 18,
        justifyItems: 'center',
        margin: '0 auto',
        maxWidth: 900
      }}>
        {CITIES.map(city => (
          <button
            key={city.name}
            className="btn city-btn"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #fbbf24 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 0,
              boxShadow: '0 2px 8px rgba(102,126,234,0.10)',
              border: 'none',
              padding: '22px 0',
              borderRadius: 16,
              cursor: 'pointer',
              transition: 'background 0.3s, transform 0.2s',
              letterSpacing: 1
            }}
            onClick={() => onSelectCity(city)}
          >
            {city.name}
          </button>
        ))}
      </div>
      <style>{`
        .city-btn:hover:not(:disabled) {
          background: linear-gradient(90deg, #fbbf24 0%, #667eea 100%);
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 32px rgba(102,126,234,0.18);
        }
      `}</style>
    </div>
  );
};

export default CityDashboard; 