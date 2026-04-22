import axios from "axios";
import type { User as FirebaseUser } from "firebase/auth";

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

type MockProfileStore = Record<string, UserProfile>;

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  timeout: 10_000,
});

const MOCK_LATENCY_MS = 400;
const MOCK_PROFILE_STORE_KEY = "mvuew.mock-user-profiles";
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readMockProfiles(): MockProfileStore {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(MOCK_PROFILE_STORE_KEY);

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as MockProfileStore;
  } catch {
    return {};
  }
}

function writeMockProfiles(store: MockProfileStore) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MOCK_PROFILE_STORE_KEY, JSON.stringify(store));
}

function createMockUserSkeleton(firebaseUser?: FirebaseUser | null): UserProfile {
  const now = new Date().toISOString();
  const uid = firebaseUser?.uid ?? "mock_firebase_uid";

  return {
    id: `mock-${uid.slice(0, 10)}`,
    firebaseUid: uid,
    name: firebaseUser?.displayName ?? null,
    email: firebaseUser?.email ?? null,
    preferredCategories: null,
    homeCountry: null,
    phoneNumber: null,
    age: null,
    profession: null,
    premiumExpiryDate: null,
    createdAt: now,
    updatedAt: now,
    onboarded: false,
    premium: false,
  };
}

function createMockOnboardedUser(
  firebaseUser: FirebaseUser | null | undefined,
  payload: OnboardingPayload,
  previous?: UserProfile
): UserProfile {
  const now = new Date().toISOString();
  const uid = firebaseUser?.uid ?? "mock_firebase_uid";

  return {
    id: previous?.id ?? `mock-${uid.slice(0, 10)}`,
    firebaseUid: uid,
    name: payload.name,
    email: firebaseUser?.email ?? previous?.email ?? null,
    preferredCategories: payload.preferredCategories,
    homeCountry: payload.homeCountry,
    phoneNumber: payload.phoneNumber,
    age: payload.age,
    profession: payload.profession,
    premiumExpiryDate: previous?.premiumExpiryDate ?? null,
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
    onboarded: true,
    premium: previous?.premium ?? false,
  };
}

function createAuthHeaders(firebaseToken: string) {
  return {
    Authorization: `Bearer ${firebaseToken}`,
  };
}

export async function verifyAuthStatus(
  firebaseToken: string,
  firebaseUser?: FirebaseUser | null
): Promise<VerifyAuthResponse> {
  if (!firebaseToken) {
    throw new Error("Firebase token is required to verify authentication.");
  }

  if (!USE_MOCK_API) {
    const response = await apiClient.post<VerifyAuthResponse>("/api/auth/verify", null, {
      headers: createAuthHeaders(firebaseToken),
    });

    return response.data;
  }

  await wait(MOCK_LATENCY_MS);

  const uid = firebaseUser?.uid ?? "mock_firebase_uid";
  const store = readMockProfiles();
  const existingUser = store[uid];

  if (existingUser?.onboarded) {
    return {
      message: "User authenticated successfully",
      user: existingUser,
      newUser: false,
      onboarded: true,
    };
  }

  return {
    message: "New user created",
    user: existingUser ?? createMockUserSkeleton(firebaseUser),
    newUser: !existingUser,
    onboarded: false,
  };
}

export async function submitOnboarding(
  firebaseToken: string,
  payload: OnboardingPayload,
  firebaseUser?: FirebaseUser | null
): Promise<UserProfile> {
  if (!firebaseToken) {
    throw new Error("Firebase token is required for onboarding.");
  }

  if (!USE_MOCK_API) {
    const response = await apiClient.post<UserProfile>("/api/user/onboarding", payload, {
      headers: {
        ...createAuthHeaders(firebaseToken),
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }

  await wait(MOCK_LATENCY_MS);

  const uid = firebaseUser?.uid ?? "mock_firebase_uid";
  const store = readMockProfiles();
  const updatedUser = createMockOnboardedUser(firebaseUser, payload, store[uid]);

  store[uid] = updatedUser;
  writeMockProfiles(store);

  return updatedUser;
}
