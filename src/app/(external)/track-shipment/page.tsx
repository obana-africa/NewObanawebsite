"use client";

import React, { useState } from "react";
import { Package, Search, Truck, MapPin, Calendar, CheckCircle, AlertCircle, Shield, Clock } from "lucide-react";
import Button from "@/components/ui/button";
import { termApi } from "@/app/api/(instances)/axiosInstance";
import logoImage from "@/app/assets/images/logos/obana-logo.svg";


interface TerminalAddressMetadata {
  google_postal_code?: string;
  customerId?: number;
}

interface TerminalUserMetadata {
  storeId?: string;
  tracking_only?: boolean;
}

interface TerminalCoordinates {
  place_id: string;
  lat: number;
  lng: number;
  google_postal_code?: string;
}

interface TerminalAddress {
  user: string;
  child_user: string;
  alias: string;
  city: string;
  coordinates: TerminalCoordinates;
  country: string;
  email: string;
  first_name: string;
  is_residential: boolean;
  last_name: string;
  line1: string;
  line2: string;
  phone: string;
  alt_phone: string;
  place_id: string;
  sender_default: boolean;
  child_default: boolean;
  state: string;
  shop_ship: string;
  type: string;
  zip: string;
  is_deleted: boolean;
  geocoded: boolean;
  address_id: string;
  created_at: string;
  updated_at: string;
  metadata?: TerminalAddressMetadata;
  __v?: number;
}

interface TerminalCarrierContact {
  email: string;
  phone: string;
}

interface TerminalCarrierMetadata {
  rate_version?: number;
  markup_version?: number;
}

interface TerminalCarrier {
  disabled_countries_multi_parcel: string[];
  supports_duty: boolean;
  requires_duty: boolean;
  active: boolean;
  available_countries: string[];
  contact: TerminalCarrierContact;
  domestic: boolean;
  international: boolean;
  logo: string;
  name: string;
  regional: boolean;
  requires_invoice: boolean;
  requires_waybill: boolean;
  slug: string;
  carrier_id: string;
  __v?: number;
  created_at: string;
  updated_at: string;
  available_countries_regional: string[];
  disabled_countries: string[];
  available_countries_international: string[];
  available_countries_local: string[];
  location_approved: boolean;
  metadata?: TerminalCarrierMetadata;
  supports_cash_on_delivery: boolean;
  supports_multi_parcels: boolean;
  supports_personal_accounts: boolean;
  supports_scheduled_pickup: boolean;
  id: string | null;
}

interface TerminalEvent {
  status: string;
  created_at: string;
  description: string;
  location: string;
  timestamp?: string;
}

interface TerminalTrackingStatus {
  status: string;
  created_at: string;
  description: string;
  location: string;
}

interface TerminalUserCarriers {
  domestic: string[];
  international: string[];
  regional: string[];
}

interface TerminalUser {
  _id: string;
  account_active: boolean;
  account_type: string;
  admin: boolean;
  barred_countries: string[];
  business_category: string;
  business_operation: string;
  business_type: string;
  carriers: TerminalUserCarriers;
  company_logo: string;
  company_name: string;
  country: string;
  country_state: string;
  device_tokens: string[];
  email: string;
  enforce_verification: boolean;
  first_name: string;
  last_name: string;
  metadata?: TerminalUserMetadata;
  notifications_enabled: boolean;
  payment_gateway_status: string;
  phone: string;
  plan: string;
  referralCode: string;
  staff_number: number;
  shipment_limit: number;
  pass_code: string;
  parent_thub_user: string;
  child_thub_email: string;
  wallet: string;
  wallet_enabled: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  __v?: number;
  customer_rank?: number;
  new_publication?: boolean;
}

interface TerminalShipmentData {
  carrier: TerminalCarrier;
  address_from: TerminalAddress;
  address_to: TerminalAddress;
  delivery_date: string;
  pickup_date: string;
  events: TerminalEvent[];
  tracking_status: TerminalTrackingStatus;
  shipment_id: string;
  delivery_arranged: string;
  status: string;
  carrier_tracking_number?: string;
  user?: TerminalUser;
}

interface TerminalTrackingResponse {
  status: boolean;
  message: string;
  data: TerminalShipmentData;
}

export default function TrackShipmentPage() {
  const [trackingId, setTrackingId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trackingError, setTrackingError] = useState<string>("");
  const [trackingData, setTrackingData] = useState<TerminalTrackingResponse | null>(null);

  const handleTrackShipment = async (): Promise<void> => {
    if (!trackingId.trim()) {
      setTrackingError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setTrackingError("");
    setTrackingData(null);

    try {
      const response = await termApi.get<TerminalTrackingResponse>(
        `/shipments/track/${trackingId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TERMINAL_AFRICA_SECRET_KEY}`,
          },
        }
      );

      // Fixed: Check response.data.status instead of response.status
      if (!response.data.status) {
        throw new Error(`Unable to track shipment. Please check the tracking number.`);
      }

      setTrackingData(response.data);
    } catch (error) {
      console.error("Tracking error:", error);
      if (error instanceof Error) {
        setTrackingError(error.message);
      } else {
        setTrackingError("Unable to track shipment. Please check the tracking number.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_transit":
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in_transit":
      case "confirmed":
        return <Truck className="h-5 w-5 text-blue-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to format date and time
  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your Shipment
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Enter your tracking number below to get real-time updates on your shipment status, location, and estimated delivery time.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Tracking Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:flex-1">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => {
                      setTrackingId(e.target.value);
                      setTrackingError("");
                    }}
                    placeholder="Enter your tracking number (e.g., SH-16380611554)"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleTrackShipment();
                      }
                    }}
                  />
                </div>
                {trackingError && (
                  <p className="mt-2 text-sm text-red-600">{trackingError}</p>
                )}
              </div>
              <Button
                onClick={handleTrackShipment}
                disabled={isLoading}
                variant="primary"
                className="w-full md:w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Tracking...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Track Shipment
                  </div>
                )}
              </Button>
            </div>
            
            {/* Information Tips */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-3">Where to find your tracking number:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Order Confirmation Email</p>
                    <p className="text-sm text-gray-600">Check the email you received after placing your order</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Package className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Shipping History</p>
                    <p className="text-sm text-gray-600">Log in to your account and your shipment history</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Account Dashboard</p>
                    <p className="text-sm text-gray-600">Log in to your account and check order history</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Results */}
          {trackingData && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Status Overview */}
              <div className="p-6 md:p-8 border-b border-gray-200">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(trackingData.data.status)}
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(trackingData.data.status)}`}>
                        {trackingData.data.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-600">Shipment ID: <span className="font-mono font-semibold">{trackingData.data.shipment_id}</span></p>
                      {trackingData.data.carrier_tracking_number && (
                        <p className="text-gray-600">Tracking #: <span className="font-semibold">{trackingData.data.carrier_tracking_number}</span></p>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {trackingData.data.delivery_date 
                        ? formatDate(trackingData.data.delivery_date)
                        : "To be confirmed"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Carrier Information */}
              {trackingData.data.carrier && (
                <div className="p-6 md:p-8 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Carrier Information</h3>
                  <div className="flex items-center space-x-4">
                    {trackingData.data.carrier.logo && (
                      <div className="h-12 w-12 relative">
                        <img
                          src={(trackingData.data.carrier.name=== "GIG Logistics" || trackingData.data.carrier.name === "DHL Express") ? logoImage : trackingData.data.carrier.logo}
                          alt={trackingData.data.carrier.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{trackingData.data.carrier.name=== "GIG Logistics" ? " Obana Express (Local)" : trackingData.data.carrier.name === "DHL Express" ? "Obana Express (International)" : trackingData.data.carrier.name || 'Not specified'}</p>
                      <div className="flex space-x-4 mt-1">
                        <p className="text-sm text-gray-600">📞 {trackingData.data.carrier.contact.phone}</p>
                        <p className="text-sm text-gray-600">✉️ {trackingData.data.carrier.contact.email=== "info@giglogistics.com" ? "obana.africa@gmail.com" : trackingData.data.carrier.name === "DHL Express" ? "obana.africa@gmail.com" : trackingData.data.carrier.contact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tracking Timeline */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Tracking History</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                  
                  <div className="space-y-8 relative">
                    {trackingData.data.events && trackingData.data.events.length > 0 ? (
                      trackingData.data.events.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 relative">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </div>
                            {index === 0 && (
                              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-blue-200"></div>
                            )}
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <p className="font-semibold text-gray-900">{event.status}</p>
                              <p className="text-sm text-gray-500">
                                {event.created_at ? formatDateTime(event.created_at) : "N/A"}
                              </p>
                            </div>
                            <p className="text-gray-600 mt-1">{event.description}</p>
                            {event.location && (
                              <p className="text-sm text-gray-500 mt-2 flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No tracking events available yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="p-6 md:p-8 border-t border-gray-200 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Shipment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sender */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Sender</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">
                        {trackingData.data.address_from.first_name} {trackingData.data.address_from.last_name}
                      </p>
                      <p className="text-gray-600">{trackingData.data.address_from.line1}</p>
                      <p className="text-gray-600">
                        {trackingData.data.address_from.city}, {trackingData.data.address_from.state} {trackingData.data.address_from.zip}
                      </p>
                      <p className="text-gray-600">{trackingData.data.address_from.country}</p>
                      <div className="pt-2 space-y-1">
                        <p className="text-sm text-gray-500">📞 {trackingData.data.address_from.phone}</p>
                        <p className="text-sm text-gray-500">✉️ {trackingData.data.address_from.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Receiver */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Receiver</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">
                        {trackingData.data.address_to.first_name} {trackingData.data.address_to.last_name}
                      </p>
                      <p className="text-gray-600">{trackingData.data.address_to.line1}</p>
                      <p className="text-gray-600">
                        {trackingData.data.address_to.city}, {trackingData.data.address_to.state} {trackingData.data.address_to.zip}
                      </p>
                      <p className="text-gray-600">{trackingData.data.address_to.country}</p>
                      <div className="pt-2 space-y-1">
                        <p className="text-sm text-gray-500">📞 {trackingData.data.address_to.phone}</p>
                        <p className="text-sm text-gray-500">✉️ {trackingData.data.address_to.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 md:p-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-600 text-sm">
                    Need help? Contact our support team for assistance with your shipment.
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => window.print()}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Print Details
                    </Button>
                    <Button
                      variant="primary"
                      href="/contact"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}