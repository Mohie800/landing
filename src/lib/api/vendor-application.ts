import apiClient from "./client";

export interface VendorApplicationPayload {
  designerName: string;
  email: string;
  phone: string;
  city: string;
  brandName: string;
  category: string;
  storeLink?: string;
  brandStory: string;
  logo: string;
  bankDetails: string;
  commercialRegister: string;
  taxCertificate?: string;
  policiesAccepted: boolean;
}

export const vendorApplicationApi = {
  submit: async (data: VendorApplicationPayload) => {
    const response = await apiClient.post("/v1/vendor-applications", data);
    return response.data;
  },
};

export default vendorApplicationApi;
