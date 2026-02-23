import apiClient from "./client";

export const authApi = {
  requestOtp: async (phone: string) => {
    const response = await apiClient.post("/v1/auth/otp/request", {
      phoneNumber: `+966${phone}`,
    });
    return response.data;
  },

  verifyOtp: async (phone: string, otp: string) => {
    const response = await apiClient.post<{ accessToken: string }>(
      "/v1/auth/otp/verify",
      {
        phoneNumber: `+966${phone}`,
        otp,
      }
    );
    return response.data;
  },
};

export default authApi;
