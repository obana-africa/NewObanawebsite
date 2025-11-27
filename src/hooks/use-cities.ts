/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface City {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude: string;
  longitude: string;
}

interface UseCitiesReturn {
  cities: City[];
  isLoading: boolean;
  error: string | null;
}

const useCities = (countryCode: string | null, stateCode: string | null): UseCitiesReturn => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (!countryCode || !stateCode) {
        setCities([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TERMINAL_AFRICA_BASE_URL}/cities?country_code=${countryCode}&state_code=${stateCode}`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TERMINAL_AFRICA_SECRET_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const result = await response.json();
        
        if (result.status && result.data) {
          setCities(result.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load cities');
        console.error('Error fetching cities:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [countryCode, stateCode]);

  return { cities, isLoading, error };
};

export default useCities;