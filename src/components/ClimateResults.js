import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Thermometer, Wind, Droplets, Cloud, Sun, BarChart3, MapPin, Download } from 'lucide-react';
import { CLIMATE_VARIABLES } from '../services/climateApi';

const statCardStyle = {
  padding: '18px',
  background: 'rgba(102,126,234,0.07)',
  borderRadius: 16,
  border: '1.5px solid rgba(102,126,234,0.10)',
  boxShadow: '0 2px 12px rgba(102,126,234,0.07)',
  marginBottom: 0,
  minWidth: 180,
};

const getVariableColor = (variableName) => {
  if (variableName.includes('temperature')) return '#fbbf24';
  if (variableName.includes('wind')) return '#38bdf8';
  if (variableName.includes('precipitation') || variableName.includes('rain') || variableName.includes('snow')) return '#6366f1';
  if (variableName.includes('humidity') || variableName.includes('cloud')) return '#a3e635';
  if (variableName.includes('radiation') || variableName.includes('shortwave')) return '#f59e42';
  return '#667eea';
};

const ClimateResults = ({ data, searchParams }) => {
  if (!data || !data.daily) {
    return null;
  }

  const { daily, daily_units, latitude, longitude, timezone } = data;
  const { time, ...variables } = daily;

  const getVariableIcon = (variableName) => {
    if (variableName.includes('temperature')) return <Thermometer size={18} />;
    if (variableName.includes('wind')) return <Wind size={18} />;
    if (variableName.includes('precipitation') || variableName.includes('rain') || variableName.includes('snow')) return <Droplets size={18} />;
    if (variableName.includes('humidity') || variableName.includes('cloud')) return <Cloud size={18} />;
    if (variableName.includes('radiation') || variableName.includes('shortwave')) return <Sun size={18} />;
    return <BarChart3 size={18} />;
  };

  const formatValue = (value, variableName) => {
    if (value === null || value === undefined) return 'N/A';
    const unit = daily_units[variableName] || '';
    if (variableName.includes('temperature')) {
      return `${value.toFixed(1)}°C`;
    }
    if (variableName.includes('wind')) {
      return `${value.toFixed(1)} km/h`;
    }
    if (variableName.includes('precipitation') || variableName.includes('rain')) {
      return `${value.toFixed(1)} mm`;
    }
    if (variableName.includes('snow')) {
      return `${value.toFixed(1)} cm`;
    }
    if (variableName.includes('humidity') || variableName.includes('cloud')) {
      return `${value.toFixed(1)}%`;
    }
    if (variableName.includes('pressure')) {
      return `${value.toFixed(1)} hPa`;
    }
    if (variableName.includes('radiation')) {
      return `${value.toFixed(2)} MJ/m²`;
    }
    if (variableName.includes('soil_moisture')) {
      return `${value.toFixed(3)} m³/m³`;
    }
    return `${value.toFixed(2)} ${unit}`;
  };

  const calculateStats = (values) => {
    const validValues = values.filter(v => v !== null && v !== undefined);
    if (validValues.length === 0) return { min: 'N/A', max: 'N/A', avg: 'N/A' };
    const min = Math.min(...validValues);
    const max = Math.max(...validValues);
    const avg = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
    return { min, max, avg };
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

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
      <h2 style={{ marginBottom: 24, color: '#333', fontSize: 28, fontWeight: 800, letterSpacing: 1, textAlign: 'center' }}>
        <BarChart3 size={28} style={{ marginRight: 10, verticalAlign: 'middle', color: '#667eea' }} />
        Resultados dos Dados Climáticos
      </h2>

      {/* Informações da Localização */}
      <div style={{ marginBottom: 24, padding: '16px 20px', background: 'rgba(102,126,234,0.07)', borderRadius: 16, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#667eea', fontWeight: 700 }}>
          <MapPin size={20} />
          <span>{latitude}°, {longitude}°</span>
        </div>
        <span style={{ color: '#555', fontWeight: 600 }}>| Fuso: {timezone}</span>
        <span style={{ color: '#555', fontWeight: 600 }}>| Período: {formatDate(time[0])} a {formatDate(time[time.length - 1])}</span>
        <span style={{ color: '#555', fontWeight: 600 }}>| Dias: {time.length}</span>
      </div>

      {/* Estatísticas por Variável */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 18, color: '#555', fontWeight: 700, fontSize: 20, textAlign: 'center' }}>Estatísticas por Variável</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center' }}>
          {Object.entries(variables).map(([variableName, values]) => {
            const stats = calculateStats(values);
            const icon = getVariableIcon(variableName);
            const color = getVariableColor(variableName);
            return (
              <div key={variableName} style={{ ...statCardStyle, borderColor: color + '33', background: color + '0D', minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  {icon}
                  <h4 style={{ marginLeft: 8, color: color, fontSize: 16, fontWeight: 700 }}>
                    {CLIMATE_VARIABLES[variableName] || variableName}
                  </h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600, color: '#333' }}>
                  <span style={{ color: '#666' }}>Mín:</span>
                  <span>{typeof stats.min === 'number' ? formatValue(stats.min, variableName) : stats.min}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600, color: '#333' }}>
                  <span style={{ color: '#666' }}>Máx:</span>
                  <span>{typeof stats.max === 'number' ? formatValue(stats.max, variableName) : stats.max}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600, color: '#333' }}>
                  <span style={{ color: '#666' }}>Média:</span>
                  <span>{typeof stats.avg === 'number' ? formatValue(stats.avg, variableName) : stats.avg}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabela de Dados Detalhados */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 15, color: '#555', fontWeight: 700, fontSize: 20, textAlign: 'center' }}>Dados Detalhados</h3>
        <div style={{ overflowX: 'auto', borderRadius: 16, boxShadow: '0 2px 12px rgba(102,126,234,0.07)' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '16px',
            overflow: 'hidden',
            fontSize: 15
          }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #667eea 0%, #fbbf24 100%)', color: 'white' }}>
                <th style={{ padding: '14px', textAlign: 'left', borderBottom: '1px solid #eee', fontWeight: 700 }}>
                  Data
                </th>
                {Object.keys(variables).map(variableName => (
                  <th key={variableName} style={{ padding: '14px', textAlign: 'left', borderBottom: '1px solid #eee', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {getVariableIcon(variableName)}
                      <span style={{ marginLeft: 4, fontSize: 13 }}>
                        {CLIMATE_VARIABLES[variableName]?.split(' ')[0] || variableName}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {time.slice(0, 10).map((date, index) => (
                <tr key={date} style={{ background: index % 2 === 0 ? 'rgba(102,126,234,0.04)' : 'rgba(255,255,255,0.97)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: '#333' }}>
                    {formatDate(date)}
                  </td>
                  {Object.entries(variables).map(([variableName, values]) => (
                    <td key={variableName} style={{ padding: '12px', color: '#666' }}>
                      {formatValue(values[index], variableName)}
                    </td>
                  ))}
                </tr>
              ))}
              {time.length > 10 && (
                <tr>
                  <td colSpan={Object.keys(variables).length + 1} style={{
                    padding: '12px',
                    textAlign: 'center',
                    color: '#666',
                    fontStyle: 'italic',
                    background: 'rgba(255,255,255,0.97)'
                  }}>
                    ... e mais {time.length - 10} registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modelos Utilizados */}
      {searchParams?.models && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 10, color: '#555', fontWeight: 700, fontSize: 18 }}>Modelos Utilizados</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {searchParams.models.map(model => (
              <span key={model} style={{
                padding: '7px 16px',
                background: '#667eea',
                color: 'white',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 700
              }}>
                {model}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Botão para Exportar */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn"
          style={{
            width: '100%',
            padding: '16px 0',
            fontSize: '18px',
            fontWeight: 700,
            borderRadius: '14px',
            background: 'linear-gradient(90deg, #667eea 0%, #fbbf24 100%)',
            boxShadow: '0 4px 24px rgba(102,126,234,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px',
            cursor: 'pointer',
            transition: 'background 0.3s, transform 0.2s',
            letterSpacing: 1
          }}
          onClick={() => {
            const csvContent = generateCSV(data);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `climate_data_${latitude}_${longitude}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          <Download size={22} style={{ marginBottom: -2 }} />
          Exportar para CSV
        </button>
        <style>{`
          .btn:hover:not(:disabled) {
            background: linear-gradient(90deg, #fbbf24 0%, #667eea 100%);
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 8px 32px rgba(102,126,234,0.18);
          }
        `}</style>
      </div>
    </div>
  );
};

// Função para gerar CSV
const generateCSV = (data) => {
  const { daily, daily_units } = data;
  const { time, ...variables } = daily;
  // Cabeçalho
  const headers = ['Data', ...Object.keys(variables).map(v => CLIMATE_VARIABLES[v] || v)];
  const csvRows = [headers.join(',')];
  // Dados
  time.forEach((date, index) => {
    const row = [
      date,
      ...Object.values(variables).map(values => values[index] || '')
    ];
    csvRows.push(row.join(','));
  });
  return csvRows.join('\n');
};

export default ClimateResults; 