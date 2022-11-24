export interface AuthenticatedUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
}
