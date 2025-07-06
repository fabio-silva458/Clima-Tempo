import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const CITIES = [
  { name: 'São Paulo - SP', state: 'SP', latitude: -23.5505, longitude: -46.6333 },
  { name: 'Rio de Janeiro - RJ', state: 'RJ', latitude: -22.9068, longitude: -43.1729 },
  { name: 'Belo Horizonte - MG', state: 'MG', latitude: -19.9167, longitude: -43.9345 },
  { name: 'Salvador - BA', state: 'BA', latitude: -12.9777, longitude: -38.5016 },
  { name: 'Fortaleza - CE', state: 'CE', latitude: -3.7172, longitude: -38.5433 },
  { name: 'Brasília - DF', state: 'DF', latitude: -15.7942, longitude: -47.8822 },
  { name: 'Curitiba - PR', state: 'PR', latitude: -25.4284, longitude: -49.2733 },
  { name: 'Manaus - AM', state: 'AM', latitude: -3.1190, longitude: -60.0217 },
  { name: 'Porto Alegre - RS', state: 'RS', latitude: -30.0346, longitude: -51.2177 },
  { name: 'Recife - PE', state: 'PE', latitude: -8.0476, longitude: -34.8770 },
  { name: 'Belém - PA', state: 'PA', latitude: -1.4558, longitude: -48.4902 },
  { name: 'Goiânia - GO', state: 'GO', latitude: -16.6869, longitude: -49.2648 },
  { name: 'Campinas - SP', state: 'SP', latitude: -22.9056, longitude: -47.0608 },
  { name: 'São Luís - MA', state: 'MA', latitude: -2.5307, longitude: -44.3068 },
  { name: 'Natal - RN', state: 'RN', latitude: -5.7945, longitude: -35.2110 },
  { name: 'João Pessoa - PB', state: 'PB', latitude: -7.1195, longitude: -34.8450 },
  { name: 'Maceió - AL', state: 'AL', latitude: -9.6658, longitude: -35.7350 },
  { name: 'Teresina - PI', state: 'PI', latitude: -5.0892, longitude: -42.8016 },
  { name: 'Campo Grande - MS', state: 'MS', latitude: -20.4697, longitude: -54.6201 },
  { name: 'Cuiabá - MT', state: 'MT', latitude: -15.6014, longitude: -56.0979 },
  { name: 'Aracaju - SE', state: 'SE', latitude: -10.9472, longitude: -37.0731 },
  { name: 'Florianópolis - SC', state: 'SC', latitude: -27.5954, longitude: -48.5480 },
  { name: 'Palmas - TO', state: 'TO', latitude: -10.1840, longitude: -48.3336 },
  { name: 'Macapá - AP', state: 'AP', latitude: 0.0349, longitude: -51.0694 },
  { name: 'Rio Branco - AC', state: 'AC', latitude: -9.97499, longitude: -67.8243 },
  { name: 'Boa Vista - RR', state: 'RR', latitude: 2.8235, longitude: -60.6758 },
  { name: 'Porto Velho - RO', state: 'RO', latitude: -8.7608, longitude: -63.8999 },
];

const STATES = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
];

const STATE_NAMES = {
  AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins'
};

const CityDashboard = ({ onSelectCity }) => {
  const [selectedState, setSelectedState] = useState('');
  const mainCity = selectedState ? CITIES.find(c => c.state === selectedState) : null;

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
      <p style={{ textAlign: 'center', color: '#555', fontSize: 18, marginBottom: 18 }}>
        Selecione um estado e busque a previsão para a capital:
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          style={{
            fontSize: 17,
            padding: '10px 18px',
            borderRadius: 10,
            border: '2px solid #e1e5e9',
            background: 'rgba(255,255,255,0.9)',
            color: '#333',
            fontWeight: 600,
            boxShadow: '0 2px 12px rgba(102,126,234,0.07)',
            outline: 'none',
            minWidth: 180,
            cursor: 'pointer',
            marginRight: 8
          }}
        >
          <option value="">Selecione um estado</option>
          {STATES.map(uf => (
            <option key={uf} value={uf}>{STATE_NAMES[uf]}</option>
          ))}
        </select>
        {mainCity && (
          <button
            className="btn city-btn"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #fbbf24 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 17,
              border: 'none',
              padding: '10px 22px',
              borderRadius: 10,
              marginLeft: 8,
              cursor: 'pointer',
              transition: 'background 0.3s, transform 0.2s',
              letterSpacing: 1
            }}
            onClick={() => onSelectCity(mainCity)}
          >
            Buscar {mainCity.name}
          </button>
        )}
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