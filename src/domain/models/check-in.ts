export interface CheckIn {
  id: string;
  userId: string;
  gymId: string;
  created_at: Date | string;
  validated_at?: Date | string | null;
}