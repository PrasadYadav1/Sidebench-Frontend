interface DeleteAdminProps {
  deleteAdmin: boolean;
  setDeleteAdmin(value: React.SetStateAction<boolean>): void;
  selectedId: number;
}
export default DeleteAdminProps;
