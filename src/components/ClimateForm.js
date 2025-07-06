import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MapPin, Calendar, Thermometer, Wind, Cloud, Droplets, Sun } from 'lucide-react';
import { CLIMATE_VARIABLES, CLIMATE_MODELS } from '../services/climateApi';

const ClimateForm = forwardRef(({ onSearch, loading, initialValues }, ref) => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
    variables: ['temperature_2m_mean', 'precipitation_sum'],
    models: ['EC_Earth3P_HR']
  });

  const [errors, setErrors] = useState({});

  // Atualiza o formulário quando initialValues mudam
  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...formData,
        ...initialValues
      });
    }
    // eslint-disable-next-line
  }, [initialValues]);

  // Permite que o pai atualize o formulário manualmente
  useImperativeHandle(ref, () => ({
    setFormData
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleVariableChange = (variable) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.includes(variable)
        ? prev.variables.filter(v => v !== variable)
        : [...prev.variables, variable]
    }));
  };

  const handleModelChange = (model) => {
    setFormData(prev => ({
      ...prev,
      models: prev.models.includes(model)
        ? prev.models.filter(m => m !== model)
        : [...prev.models, model]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.latitude || !formData.longitude) {
      newErrors.coordinates = 'Latitude e longitude são obrigatórias';
    } else {
      const lat = parseFloat(formData.latitude);
      const lng = parseFloat(formData.longitude);
      if (isNaN(lat) || isNaN(lng)) {
        newErrors.coordinates = 'Latitude e longitude devem ser números válidos';
      } else if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        newErrors.coordinates = 'Latitude deve estar entre -90 e 90, longitude entre -180 e 180';
      }
    }
    if (!formData.startDate || !formData.endDate) {
      newErrors.dates = 'Data de início e fim são obrigatórias';
    } else {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start >= end) {
        newErrors.dates = 'Data de início deve ser anterior à data de fim';
      }
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();
      if (startYear < 1950 || endYear > 2050) {
        newErrors.dates = 'Datas devem estar entre 1950 e 2050';
      }
    }
    if (formData.variables.length === 0) {
      newErrors.variables = 'Selecione pelo menos uma variável climática';
    }
    if (formData.models.length === 0) {
      newErrors.models = 'Selecione pelo menos um modelo climático';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSearch({
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        startDate: formData.startDate,
        endDate: formData.endDate,
        variables: formData.variables,
        models: formData.models
      });
    }
  };

  const variableCategories = {
    temperature: {
      icon: <Thermometer size={20} />,
      variables: ['temperature_2m_mean', 'temperature_2m_max', 'temperature_2m_min']
    },
    wind: {
      icon: <Wind size={20} />,
      variables: ['wind_speed_10m_mean', 'wind_speed_10m_max']
    },
    precipitation: {
      icon: <Droplets size={20} />,
      variables: ['precipitation_sum', 'rain_sum', 'snowfall_sum']
    },
    humidity: {
      icon: <Cloud size={20} />,
      variables: ['relative_humidity_2m_mean', 'relative_humidity_2m_max', 'relative_humidity_2m_min']
    },
    radiation: {
      icon: <Sun size={20} />,
      variables: ['shortwave_radiation_sum', 'cloud_cover_mean']
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>
        <MapPin size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        Buscar Dados Climáticos
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Coordenadas */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px', color: '#555' }}>Localização</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="Ex: -23.5505"
                step="any"
                className="input"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="Ex: -46.6333"
                step="any"
                className="input"
              />
            </div>
          </div>
          {errors.coordinates && (
            <div className="error">{errors.coordinates}</div>
          )}
        </div>
        {/* Datas */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px', color: '#555' }}>
            <Calendar size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Período
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                Data de Início
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                min="1950-01-01"
                max="2050-12-31"
                className="input"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                Data de Fim
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min="1950-01-01"
                max="2050-12-31"
                className="input"
              />
            </div>
          </div>
          {errors.dates && (
            <div className="error">{errors.dates}</div>
          )}
        </div>
        {/* Variáveis Climáticas */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px', color: '#555' }}>Variáveis Climáticas</h3>
          {Object.entries(variableCategories).map(([category, { icon, variables }]) => (
            <div key={category} style={{ marginBottom: '15px' }}>
              <h4 style={{ marginBottom: '8px', color: '#666', display: 'flex', alignItems: 'center' }}>
                {icon}
                <span style={{ marginLeft: '8px', textTransform: 'capitalize' }}>{category}</span>
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                {variables.map(variable => (
                  <label key={variable} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.variables.includes(variable)}
                      onChange={() => handleVariableChange(variable)}
                      style={{ marginRight: '8px' }}
                    />
                    {CLIMATE_VARIABLES[variable]}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {errors.variables && (
            <div className="error">{errors.variables}</div>
          )}
        </div>
        {/* Modelos Climáticos */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px', color: '#555' }}>Modelos Climáticos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
            {Object.entries(CLIMATE_MODELS).map(([key, name]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.models.includes(key)}
                  onChange={() => handleModelChange(key)}
                  style={{ marginRight: '8px' }}
                />
                {name}
              </label>
            ))}
          </div>
          {errors.models && (
            <div className="error">{errors.models}</div>
          )}
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Buscando dados...' : 'Buscar Dados Climáticos'}
        </button>
      </form>
    </div>
  );
});

export default ClimateForm; 