import React, { useState, useEffect } from 'react';
import { getProvinces, getRegencies, getDistricts, getVillages } from '../api/province'; // Pastikan path ini sesuai dengan struktur proyek Anda

const RegionForm = () => {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('51');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  useEffect(() => {
    getProvinces()
      .then(response => {
        if (response.data) {
          setProvinces(response.data);
        } else {
          console.error('Provinces data is missing in the response');
        }
      })
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getRegencies(selectedProvince)
        .then(response => {
          if (response.data) {
            setRegencies(response.data);
            setDistricts([]);
            setVillages([]);
            setSelectedRegency('');
            setSelectedDistrict('');
            setSelectedVillage('');
          } else {
            console.error('Regencies data is missing in the response');
          }
        })
        .catch(error => console.error('Error fetching regencies:', error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency) {
      getDistricts(selectedRegency)
        .then(response => {
          if (response.data) {
            setDistricts(response.data);
            setVillages([]);
            setSelectedDistrict('');
            setSelectedVillage('');
          } else {
            console.error('Districts data is missing in the response');
          }
        })
        .catch(error => console.error('Error fetching districts:', error));
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      getVillages(selectedDistrict)
        .then(response => {
          if (response.data) {
            setVillages(response.data);
            setSelectedVillage('');
          } else {
            console.error('Villages data is missing in the response');
          }
        })
        .catch(error => console.error('Error fetching villages:', error));
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleRegencyChange = (e) => {
    setSelectedRegency(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
  };

  return (
    <form className="card">
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="provinceSelect" className="form-label">Province:</label>
          <select 
            id="provinceSelect" 
            className="form-select" 
            value={selectedProvince} 
            onChange={handleProvinceChange}
          >
            <option value="">Select a Province</option>
            {provinces.map(province => (
              <option key={province.id} value={province.id}>{province.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="regencySelect" className="form-label">Regency:</label>
          <select 
            id="regencySelect" 
            className="form-select" 
            value={selectedRegency} 
            onChange={handleRegencyChange}
            disabled={!selectedProvince}
          >
            <option value="">Select a Regency</option>
            {regencies.map(regency => (
              <option key={regency.id} value={regency.id}>{regency.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="districtSelect" className="form-label">District:</label>
          <select 
            id="districtSelect" 
            className="form-select" 
            value={selectedDistrict} 
            onChange={handleDistrictChange}
            disabled={!selectedRegency}
          >
            <option value="">Select a District</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>{district.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="villageSelect" className="form-label">Village:</label>
          <select 
            id="villageSelect" 
            className="form-select" 
            value={selectedVillage} 
            onChange={handleVillageChange}
            disabled={!selectedDistrict}
          >
            <option value="">Select a Village</option>
            {villages.map(village => (
              <option key={village.id} value={village.id}>{village.name}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default RegionForm;