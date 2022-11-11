interface LoginData {
  email: string;
  password: string;
}

interface Role {
  name: string;
  id: number;
}

interface Status {
  name: string;
  id: number;
}

export interface User {
  firstname: string;
  lastname: string;
  role: Role;
  status: Status;
  id: number;
  email: string;
  token: string;
}

export default LoginData;
