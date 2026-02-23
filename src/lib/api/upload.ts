import apiClient from "./client";

export const uploadApi = {
  uploadDocument: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<{ url: string }>(
      "/v1/upload/document",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.url;
  },
};

export default uploadApi;
