export interface CheckIn {
  id: string;
  userId: string;
  gymId: string;
  create_at?: Date | string;
  validated_at?: Date | string | null;
}