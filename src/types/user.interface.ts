import { UserRole } from "@/lib/auth-utils";

export interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  location?: string | null;
  isDeleted?: boolean;
  //    admin?: IAdmin;
  // patient?: IPatient;
  // doctor?: IDoctor;
  createdAt: string;
  updatedAt: string;
}
