interface DeleteAdminProps {
  deleteAdmin: boolean;
  setDeleteAdmin(value: React.SetStateAction<boolean>): void;
  handleDelete(): void;
}
export default DeleteAdminProps;
