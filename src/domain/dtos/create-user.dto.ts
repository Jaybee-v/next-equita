export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  lastname?: string;
  role: string;
}
