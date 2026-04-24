import axios from "axios";

export type EarlyAccessSubmissionPayload = {
  email: string;
};

export type EarlyAccessResponse = {
  message: string;
  email: string;
};

const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://engine.mtruth.news/api/",
  timeout: 10_000,
});

export async function submitEarlyAccess(
  payload: EarlyAccessSubmissionPayload
): Promise<EarlyAccessResponse> {
  const email = payload.email.trim();

  if (!email) {
    throw new Error("Email is required.");
  }

  const response = await apiClient.post<EarlyAccessResponse>("/early", {
    email,
  });

  return response.data;
}