const cookieSection = [
  {
    id: "essential",
    name: "Essential Cookies",
    description:
      "These cookies are required for the platform to function. They enable core features such as authentication, session management, and security. They cannot be disabled.",
    required: true,
    defaultOn: true,
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    description:
      "These cookies help us understand how you interact with mVuew - which articles you read, how long you spend on each section, and how you navigate the app. This data is aggregated and anonymous, and is used solely to improve the platform.",
    required: false,
    defaultOn: true,
  },
  {
    id: "personalization",
    name: "Personalization Cookies",
    description:
      "These cookies allow mVuew to remember your preferences, selected categories, reading history, and theme settings, so each session feels tailored to your interests.",
    required: false,
    defaultOn: true,
  },
  {
    id: "marketing",
    name: "Marketing Cookies",
    description:
      "We do not use third-party advertising on mVuew. If in the future we run targeted marketing campaigns, this category will allow us to measure their effectiveness without compromising your privacy.",
    required: false,
    defaultOn: false,
  },
];
export default cookieSection;