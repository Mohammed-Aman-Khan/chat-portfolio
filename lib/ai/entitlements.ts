type Entitlements = {
  maxMessagesPerHour: number;
};

type UserType = "guest" | "regular";

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  guest: {
    maxMessagesPerHour: 10,
  },
  regular: {
    maxMessagesPerHour: 10,
  },
};
