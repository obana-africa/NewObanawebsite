/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface Country {
  isoCode: string;
  name: string;
  phonecode: string;
  flag: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones: Array<{
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }>;
}

interface UseCountriesReturn {
  countries: Country[];
  isLoading: boolean;
  error: string | null;
}

const useCountries = (): UseCountriesReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_TERMINAL_AFRICA_BASE_URL}/countries`, {
          headers: {
            'Authorization': `${process.env.NEXT_PUBLIC_TERMINAL_AFRICA_SECRET_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }

        const result = await response.json();
        
        if (result.status && result.data) {
          setCountries(result.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load countries');
        console.error('Error fetching countries:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, isLoading, error };
};

export default useCountries;