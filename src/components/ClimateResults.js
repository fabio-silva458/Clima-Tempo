import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Thermometer, Wind, Droplets, Cloud, Sun, BarChart3 } from 'lucide-react';
import { CLIMATE_VARIABLES } from '../services/climateApi';

const ClimateResults = ({ data, searchParams }) => {
  if (!data || !data.daily) {
    return null;
  }

  const { daily, daily_units, latitude, longitude, timezone } = data;
  const { time, ...variables } = daily;

  const getVariableIcon = (variableName) => {
    if (variableName.includes('temperature')) return <Thermometer size={16} />;
    if (variableName.includes('wind')) return <Wind size={16} />;
    if (variableName.includes('precipitation') || variableName.includes('rain') || variableName.includes('snow')) return <Droplets size={16} />;
    if (variableName.includes('humidity') || variableName.includes('cloud')) return <Cloud size={16} />;
    if (variableName.includes('radiation') || variableName.includes('shortwave')) return <Sun size={16} />;
    return <BarChart3 size={16} />;
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
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>
        Resultados dos Dados Climáticos
      </h2>

      {/* Informações da Localização */}
      <div style={{ marginBottom: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '10px', color: '#555' }}>Localização</h3>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Latitude:</strong> {latitude}° | <strong>Longitude:</strong> {longitude}°
        </p>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Fuso Horário:</strong> {timezone}
        </p>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Período:</strong> {formatDate(time[0])} a {formatDate(time[time.length - 1])}
        </p>
        <p style={{ margin: '5px 0', color: '#666' }}>
          <strong>Total de dias:</strong> {time.length}
        </p>
      </div>

      {/* Estatísticas por Variável */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>Estatísticas por Variável</h3>
        <div className="grid">
          {Object.entries(variables).map(([variableName, values]) => {
            const stats = calculateStats(values);
            const icon = getVariableIcon(variableName);
            
            return (
              <div key={variableName} style={{ 
                padding: '16px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {icon}
                  <h4 style={{ marginLeft: '8px', color: '#333', fontSize: '16px' }}>
                    {CLIMATE_VARIABLES[variableName] || variableName}
                  </h4>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '14px' }}>
                  <div>
                    <strong style={{ color: '#666' }}>Mín:</strong>
                    <br />
                    <span style={{ color: '#333' }}>
                      {typeof stats.min === 'number' ? formatValue(stats.min, variableName) : stats.min}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#666' }}>Máx:</strong>
                    <br />
                    <span style={{ color: '#333' }}>
                      {typeof stats.max === 'number' ? formatValue(stats.max, variableName) : stats.max}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#666' }}>Média:</strong>
                    <br />
                    <span style={{ color: '#333' }}>
                      {typeof stats.avg === 'number' ? formatValue(stats.avg, variableName) : stats.avg}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabela de Dados Detalhados */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>Dados Detalhados</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            background: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ background: '#667eea', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                  Data
                </th>
                {Object.keys(variables).map(variableName => (
                  <th key={variableName} style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {getVariableIcon(variableName)}
                      <span style={{ marginLeft: '4px', fontSize: '12px' }}>
                        {CLIMATE_VARIABLES[variableName]?.split(' ')[0] || variableName}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {time.slice(0, 10).map((date, index) => (
                <tr key={date} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: '#333' }}>
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
                    fontStyle: 'italic'
                  }}>
                    ... e mais {time.length - 10} registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informações sobre os Modelos */}
      {searchParams?.models && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px', color: '#555' }}>Modelos Utilizados</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {searchParams.models.map(model => (
              <span key={model} style={{
                padding: '6px 12px',
                background: '#667eea',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
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
          Exportar para CSV
        </button>
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