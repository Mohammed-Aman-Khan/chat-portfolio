export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

export const PORTFOLIO_USER_ID = "portfolio-user-id";

export const suggestions = [
  "What kind of projects have you worked on?",
  "Tell me about your experience at TechCorp",
  "What technologies do you specialize in?",
  "Can you show me your education background?",
];
