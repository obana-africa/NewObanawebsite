import { unAuthenticatedApi } from '../../(instances)/axiosInstance';
import { NextRequest, NextResponse } from 'next/server';
import { termApi as termAPI } from '../../(instances)/axiosInstance';

export async function POST(request: NextRequest) {
  try {
    const payload =  request;
    
    console.log('Get Rates Request Payload:', JSON.stringify(payload, null, 2));

    // Forward request to backend
  const response = await termAPI.post(
          "/requests/terminalAfrica/get-rates",
          payload
        );

    if (!response.data) {
      const errorData = response;
      console.error('Backend Error:', errorData);
      
      return NextResponse.json(
        {
          status: 'error',
          message: errorData || 'Failed to fetch rates',
          data: null,
        },
        { status: response.status }
      );
    }

    const data = response;
    
    console.log('Get Rates Response:', JSON.stringify(data, null, 2));

    // Apply business rules (GIG -> Obana Express transformation)
    if (data && data.data && Array.isArray(data.data)) {
      data.data = data.data.map((rate: any) => {
        // Rename GIG Logistics to Obana Express
        if (rate.carrier_name === 'GIG Logistics') {
          return {
            ...rate,
            carrier_name: 'Obana Express',
          };
        }
        return rate;
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get Rates API Error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        data: null,
      },
      { status: 500 }
    );
  }
}