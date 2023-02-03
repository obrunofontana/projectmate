export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGenericResponse {
  status: string;
  message: string;
}
