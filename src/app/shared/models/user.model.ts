import { UserRoles } from "./user-rules.model";

export interface User {
  id: string;
  firstName: string;
  LastName: string;
  userName: string;
  email: string;
  roles: UserRoles[]
}
