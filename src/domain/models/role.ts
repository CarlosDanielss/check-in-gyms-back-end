export const RoleValues = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export type Role = (typeof RoleValues)[keyof typeof RoleValues];
