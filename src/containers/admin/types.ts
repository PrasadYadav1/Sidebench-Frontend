export interface AdminApiProps {
  id: 6;
  email: string;
  firstname: string;
  lastname: string;
  roleId: number;
  statusId: number;
  lastActive: string;
  role: {
    name: string;
  };
  status: {
    name: string;
  };
}

export interface AdminApiResponse {
  data: {
    rows: Array<AdminApiProps>;
    count: number;
  };
}
