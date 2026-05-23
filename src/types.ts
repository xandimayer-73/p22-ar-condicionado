export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  tagline: string;
  price: number;
  basePriceText: string;
  image: string;
  duration: string;
  features: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  notes: string;
  btus?: number;
  estimatedPrice: number;
  createdAt: string;
}

export interface EstimatorInput {
  area: number;
  solarExposure: 'morning' | 'afternoon' | 'full';
  people: number;
  appliances: number;
  acType: 'split' | 'window' | 'cassette' | 'multi';
}

export interface EstimatorResult {
  btus: number;
  recommendedAcPower: string;
  servicesSelected: {
    installation: boolean;
    cleaning: boolean;
    maintenance: boolean;
  };
  priceBreakdown: {
    installation: number;
    cleaning: number;
    maintenance: number;
    discount: number;
    total: number;
  };
}
