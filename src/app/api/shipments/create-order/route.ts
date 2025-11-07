/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { unAuthenticatedApi } from '../../(instances)/axiosInstance';
// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-backend-api.com';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    console.log('Create Order Request Payload:', JSON.stringify(payload, null, 2));

    // Build query parameters
    const params = new URLSearchParams({
      deliveryMethod: payload.dispatchType === 'pickup' ? 'pickup' : 'shipment',
      paymentMethod: 'PAYSTACK', // or get from payload
      pickUpMethod: payload.pickUpMethod || 'delivery',
    });

    // Forward request to backend
    const response = await unAuthenticatedApi.post(
        `/requests/zoho/orders?${params.toString()}`,
            payload,
      
    );

    if (!response.data) {
      const errorData =  response
      console.error('Backend Error:', errorData);
      
      return NextResponse.json(
        {
          status: 'error',
          message: errorData || 'Failed to create order',
          data: null,
        },
        { status: response.status }
      );
    }

    const data =  response;
    
    console.log('Create Order Response:', JSON.stringify(data, null, 2));

    // Check shipment results
    const shipmentSummary = data.data?.shipment_summary;
    const shipmentResults = data.data?.shipment_results;
    
    let statusCode = 200;
    let message = data.data?.message;

    if (shipmentSummary) {
      if (shipmentSummary.status === 'all_shipments_created') {
        message = `Order created successfully. All ${shipmentSummary.successful} shipment(s) created.`;
        statusCode = 200;
      } else if (shipmentSummary.status === 'partial_shipments_created') {
        const failedVendors = shipmentResults?.failed || [];
        const failureDetails = failedVendors.map((f: any) => 
          `${f.vendor_id}: ${f.error}`
        ).join('; ');
        
        message = `${data.data.message}\n\nFailed: ${failureDetails}`;
        statusCode = 207; // Multi-status
      } else if (shipmentSummary.status === 'no_shipments_created') {
        const failedVendors = shipmentResults?.failed || [];
        const failureDetails = failedVendors.map((f: any) => 
          `${f.vendor_id}: ${f.error}`
        ).join('; ');
        
        message = `Order created but shipments failed. ${failureDetails}`;
        statusCode = 207;
      }
    }

    return NextResponse.json(
      {
        status: 'success',
        message,
        data: data.data,
      },
      { status: statusCode }
    );
  } catch (error) {
    console.error('Create Order API Error:', error);
    
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