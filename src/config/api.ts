// API Configuration
const getApiUrl = () => {
  // For server-side (API routes, middleware, etc.)
  if (typeof window === 'undefined') {
    return  process.env.NEXT_PUBLIC_API_URL;
  }
  
  // For client-side
  return process.env.NEXT_PUBLIC_API_URL;
};

export const API_URL = getApiUrl();

// Validate that we have an API URL
if (!API_URL) {
  console.error('API_URL is not defined. Please set NEXT_PUBLIC_API_URL or API_URL environment variable.');
}
