import axios from "axios";
import { signOut } from "next-auth/react";

let isLoggingOut = false;

const handleUnauthorized = async () => {
  if (typeof window === "undefined" || isLoggingOut) return;
  isLoggingOut = true;

  try {
    localStorage.clear();
  } catch {
    // ignore storage errors
  }

  await signOut({ callbackUrl: "/login" });
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const headers = error.config?.headers;
    const hadAuthHeader = Boolean(
      headers?.Authorization || headers?.authorization
    );

    if (error.response?.status === 401 && hadAuthHeader) {
      await handleUnauthorized();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
