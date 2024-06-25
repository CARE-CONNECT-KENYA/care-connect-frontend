'use client'
import { useState } from 'react';

const ProviderDetails = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    providerType: '',
    website: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    // Define endpoint URLs for each step
    const endpoints = [
      '/api/step1',
      '/api/step2',
      '/api/step3'
    ];

    // Send data to the current step endpoint
    await fetch(endpoints[step - 1], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Move to the next step
    setStep(step + 1);
  };

  return (
    <div>
      {step === 1 && (
        <form>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter Name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="phone" 
            placeholder="+254" 
            value={formData.phone} 
            onChange={handleChange} 
          />
          <button type="button" onClick={handleNext}>Next</button>
        </form>
      )}

      {step === 2 && (
        <form>
          <input 
            type="text" 
            name="providerType" 
            placeholder="Provider Type" 
            value={formData.providerType} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="website" 
            placeholder="Website Link" 
            value={formData.website} 
            onChange={handleChange} 
          />
          <button type="button" onClick={handleNext}>Next</button>
        </form>
      )}

      {step === 3 && (
        <form>
          <textarea 
            name="description" 
            placeholder="Description About the provider type" 
            value={formData.description} 
            onChange={handleChange} 
          />
          <button type="button" onClick={handleNext}>Submit</button>
        </form>
      )}
    </div>
  );
};

export default ProviderDetails;
