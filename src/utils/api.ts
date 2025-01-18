// // utils/axios.ts
// import axios from "axios";

// // Public API instance
// export const publicApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL
// });

// // Protected API instance with token
// export const createProtectedApi = (token: string) => {
//   const protectedApi = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
  
//   // Add response interceptor for error handling
//   protectedApi.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         // Handle unauthorized error (e.g., redirect to login)
//       }
//       return Promise.reject(error);
//     }
//   );
  
//   return protectedApi;
// };

// // Hook for getting authenticated API instance
// import { useSession } from "next-auth/react";

// export const useAuthApi = () => {
//   const { data: session } = useSession();
  
//   const authApi = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL
//   });
  
//   authApi.interceptors.request.use((config) => {
//     if (session?.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return config;
//   });
  
//   return { authApi };
// };

// // Usage example functions
// export const api = {
//   // Public routes
//   public: {
//     getProducts: () => publicApi.get('/products'),
//     getCategories: () => publicApi.get('/categories')
//   },
  
//   // Protected routes
//   protected: (token: string) => {
//     const protectedApi = createProtectedApi(token);
    
//     return {
//       createProduct: (data: any) => protectedApi.post('/products', data),
//       updateProduct: (id: string, data: any) => protectedApi.put(`/products/${id}`, data),
//       deleteProduct: (id: string) => protectedApi.delete(`/products/${id}`),
//       // Add other protected routes
//     };
//   }
// };