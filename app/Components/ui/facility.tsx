// components/ui/facilities.tsx

"use client";

import { useEffect, useState } from "react";
import axios from 'axios';

interface Facility {
  id: number;
  facilityphotos: string[];
  insurance: string[];
  specialties: string[];
}

interface FacilitiesProps {
  providerID: number;
}

const Facilities: React.FC<FacilitiesProps> = ({ providerID }) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFacilities() {
      try {
        const response = await axios.get(`http://localhost:5000/facility/${providerID}`, {
          headers: {
            'Authorization': `Bearer YOUR_JWT_TOKEN`
          }
        });
        setFacilities(response.data.facility);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchFacilities();
  }, [providerID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Facilities for Provider {providerID}</h1>
      <ul>
        {facilities.map(facility => (
          <li key={facility.id}>
            <p>Facility ID: {facility.id}</p>
            <p>Photos: {facility.facilityphotos.join(', ')}</p>
            <p>Insurance: {facility.insurance.join(', ')}</p>
            <p>Specialties: {facility.specialties.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Facilities;
