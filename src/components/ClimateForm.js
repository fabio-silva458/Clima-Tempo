import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MapPin, Calendar, Thermometer, Wind, Cloud, Droplets, Sun, Search, Map } from 'lucide-react';
import { CLIMATE_VARIABLES, CLIMATE_MODELS } from '../services/climateApi';

const inputGroupStyle = {
  position: 'relative',
  marginBottom: 24,
};
const iconStyle = {
  position: 'absolute',
  left: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#667eea',
  opacity: 0.8,
};
const inputStyle = {
  width: '100%',
  padding: '14px 16px 14px 44px',
  border: '2px solid #e1e5e9',
  borderRadius: 12,
  fontSize: 17,
  background: 'rgba(255,255,255,0.7)',
  boxShadow: '0 2px 12px rgba(102,126,234,0.07)',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  outline: 'none',
};
const labelStyle = {
  position: 'absolute',
  left: 44,
  top: 14,
  fontSize: 15,
  color: '#888',
  background: 'transparent',
  pointerEvents: 'none',
  transition: 'all 0.2s',
  zIndex: 2,
};
const labelFloatStyle = {
  top: -10,
  left: 40,
  fontSize: 12,
  color: '#667eea',
  background: 'rgba(255,255,255,0.9)',
  padding: '0 4px',
  borderRadius: 4,
};

const ClimateForm = forwardRef(({ onSearch, loading, initialValues }, ref) => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
    variables: ['temperature_2m_mean', 'precipitation_sum'],
    models: ['EC_Earth3P_HR']
  });
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...formData,
        ...initialValues
      });
    }
    // eslint-disable-next-line
  }, [initialValues]);

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
  const handleFocus = (e) => setFocus(f => ({ ...f, [e.target.name]: true }));
  const handleBlur = (e) => setFocus(f => ({ ...f, [e.target.name]: false }));

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
      icon: <Thermometer size={20} />, color: '#fbbf24',
      variables: ['temperature_2m_mean', 'temperature_2m_max', 'temperature_2m_min']
    },
    wind: {
      icon: <Wind size={20} />, color: '#38bdf8',
      variables: ['wind_speed_10m_mean', 'wind_speed_10m_max']
    },
    precipitation: {
      icon: <Droplets size={20} />, color: '#6366f1',
      variables: ['precipitation_sum', 'rain_sum', 'snowfall_sum']
    },
    humidity: {
      icon: <Cloud size={20} />, color: '#a3e635',
      variables: ['relative_humidity_2m_mean', 'relative_humidity_2m_max', 'relative_humidity_2m_min']
    },
    radiation: {
      icon: <Sun size={20} />, color: '#f59e42',
      variables: ['shortwave_radiation_sum', 'cloud_cover_mean']
    }
  };

  return (
    <div className="card" style={{
      background: 'rgba(255,255,255,0.85)',
      boxShadow: '0 8px 32px rgba(102,126,234,0.10)',
      border: '1.5px solid rgba(102,126,234,0.10)',
      borderRadius: 24,
      padding: 32,
      maxWidth: 700,
      margin: '0 auto',
      marginBottom: 32
    }}>
      <h2 style={{ marginBottom: '28px', color: '#333', fontSize: '28px', fontWeight: 800, letterSpacing: 1, textAlign: 'center' }}>
        <MapPin size={28} style={{ marginRight: '10px', verticalAlign: 'middle', color: '#667eea' }} />
        Buscar Dados Climáticos
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Localização */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 8 }}>
          <div style={inputGroupStyle}>
            <Map style={iconStyle} size={20} />
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder=" "
              step="any"
              style={inputStyle}
              autoComplete="off"
            />
            <label
              style={{
                ...labelStyle,
                ...(focus.latitude || formData.latitude ? labelFloatStyle : {})
              }}
            >Latitude</label>
          </div>
          <div style={inputGroupStyle}>
            <Map style={iconStyle} size={20} />
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder=" "
              step="any"
              style={inputStyle}
              autoComplete="off"
            />
            <label
              style={{
                ...labelStyle,
                ...(focus.longitude || formData.longitude ? labelFloatStyle : {})
              }}
            >Longitude</label>
          </div>
        </div>
        {errors.coordinates && (
          <div className="error">{errors.coordinates}</div>
        )}
        {/* Datas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 8 }}>
          <div style={inputGroupStyle}>
            <Calendar style={iconStyle} size={20} />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              min="1950-01-01"
              max="2050-12-31"
              style={inputStyle}
              autoComplete="off"
            />
            <label
              style={{
                ...labelStyle,
                ...(focus.startDate || formData.startDate ? labelFloatStyle : {})
              }}
            >Data de Início</label>
          </div>
          <div style={inputGroupStyle}>
            <Calendar style={iconStyle} size={20} />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              min="1950-01-01"
              max="2050-12-31"
              style={inputStyle}
              autoComplete="off"
            />
            <label
              style={{
                ...labelStyle,
                ...(focus.endDate || formData.endDate ? labelFloatStyle : {})
              }}
            >Data de Fim</label>
          </div>
        </div>
        {errors.dates && (
          <div className="error">{errors.dates}</div>
        )}
        {/* Variáveis Climáticas */}
        <div style={{ marginBottom: '24px', marginTop: 16 }}>
          <h3 style={{ marginBottom: '10px', color: '#555', fontWeight: 700, fontSize: 18 }}>Variáveis Climáticas</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
            {Object.entries(variableCategories).map(([category, { icon, variables, color }]) => (
              <div key={category} style={{ minWidth: 180, background: 'rgba(102,126,234,0.07)', borderRadius: 12, padding: 12, flex: 1 }}>
                <h4 style={{ marginBottom: 8, color, display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 15 }}>
                  {icon}
                  <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>{category}</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {variables.map(variable => (
                    <label key={variable} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 15 }}>
                      <input
                        type="checkbox"
                        checked={formData.variables.includes(variable)}
                        onChange={() => handleVariableChange(variable)}
                        style={{ marginRight: 8, accentColor: color }}
                      />
                      {CLIMATE_VARIABLES[variable]}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {errors.variables && (
            <div className="error">{errors.variables}</div>
          )}
        </div>
        {/* Modelos Climáticos */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '10px', color: '#555', fontWeight: 700, fontSize: 18 }}>Modelos Climáticos</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {Object.entries(CLIMATE_MODELS).map(([key, name]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', background: formData.models.includes(key) ? 'rgba(102,126,234,0.13)' : 'rgba(0,0,0,0.03)', borderRadius: 8, padding: '8px 14px', fontWeight: 600, fontSize: 15, border: formData.models.includes(key) ? '2px solid #667eea' : '2px solid transparent', transition: 'all 0.2s' }}>
                <input
                  type="checkbox"
                  checked={formData.models.includes(key)}
                  onChange={() => handleModelChange(key)}
                  style={{ marginRight: 8, accentColor: '#667eea' }}
                />
                {name}
              </label>
            ))}
          </div>
          {errors.models && (
            <div className="error">{errors.models}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn"
          disabled={loading}
          style={{
            width: '100%',
            padding: '18px 0',
            fontSize: '20px',
            fontWeight: 700,
            borderRadius: '14px',
            background: 'linear-gradient(90deg, #667eea 0%, #fbbf24 100%)',
            boxShadow: '0 4px 24px rgba(102,126,234,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s, transform 0.2s',
            letterSpacing: 1
          }}
        >
          {loading ? (
            <>
              <span className="spinner" style={{
                width: 24,
                height: 24,
                border: '3px solid #fff',
                borderTop: '3px solid #fbbf24',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 1s linear infinite',
                marginRight: 8
              }} />
              Buscando dados...
            </>
          ) : (
            <>
              <Search size={24} style={{ marginBottom: -3 }} />
              Buscar Dados Climáticos
            </>
          )}
        </button>
      </form>
      <style>{`
        .btn:hover:not(:disabled) {
          background: linear-gradient(90deg, #fbbf24 0%, #667eea 100%);
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 32px rgba(102,126,234,0.18);
        }
        input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 2px #667eea22;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

export default ClimateForm; 