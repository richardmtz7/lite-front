const API_AUTH_URL = 'https://app-lite-auth-c04dbb37c33d.herokuapp.com';
const API_BASE_URL = 'https://app-lite-business-64921b5b3bb9.herokuapp.com';

export const ENDPOINTS = {
  AUTH: `${API_AUTH_URL}/api/auth`,
  BUSINESS_CATEGORY: `${API_BASE_URL}/api/business/category`,
  BUSINESS_COMPANY: `${API_BASE_URL}/api/business/company`,
  BUSINESS_CUSTOMER: `${API_BASE_URL}/api/business/customer`,
  BUSINESS_ORDER: `${API_BASE_URL}/api/business/order`,
  BUSINESS_PRODUCT: `${API_BASE_URL}/api/business/product`
};
