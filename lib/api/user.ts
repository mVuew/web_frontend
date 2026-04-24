import axios from "axios";

export type UserProfile = {
  id: string;
  firebaseUid: string;
  name: string | null;
  email: string | null;
  preferredCategories: string[] | null;
  homeCountry: string | null;
  phoneNumber: string | null;
  age: number | null;
  profession: string | null;
  premiumExpiryDate: string | null;
  createdAt: string;
  updatedAt: string;
  onboarded: boolean;
  premium: boolean;
};

export type VerifyAuthResponse = {
  message: string;
  user: UserProfile;
  newUser: boolean;
  onboarded: boolean;
};

export type OnboardingPayload = {
  name: string;
  preferredCategories: string[];
  homeCountry: string;
  phoneNumber: string;
  age: number;
  profession: string;
  fcmToken: string;
};

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

const apiClient = axios.create({
  baseURL: backendBaseUrl,
  timeout: 10_000,
});

function ensureBackendConfigured() {
  if (!backendBaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL is not configured. Please set it in your environment."
    );
  }
}

function createAuthHeaders(firebaseToken: string) {
  return {
    Authorization: `Bearer ${firebaseToken}`,
  };
}

export async function verifyAuthStatus(
  firebaseToken: string
): Promise<VerifyAuthResponse> {
  ensureBackendConfigured();

  if (!firebaseToken) {
    throw new Error("Firebase token is required to verify authentication.");
  }

  const response = await apiClient.post<VerifyAuthResponse>("/api/auth/verify", null, {
    headers: createAuthHeaders(firebaseToken),
  });

  return response.data;
}

export async function submitOnboarding(
  firebaseToken: string,
  payload: OnboardingPayload
): Promise<UserProfile> {
  ensureBackendConfigured();

  if (!firebaseToken) {
    throw new Error("Firebase token is required for onboarding.");
  }

  const response = await apiClient.post<UserProfile>("/api/user/onboarding", payload, {
    headers: {
      ...createAuthHeaders(firebaseToken),
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
