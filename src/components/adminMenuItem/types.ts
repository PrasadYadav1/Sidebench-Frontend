interface AdminTableMenuProps {
  setDeleteAdmin(value: React.SetStateAction<boolean>): void;
  setDeactiveAdmin(value: React.SetStateAction<boolean>): void;
  selectedId: number,
  setSelectedId(value: React.SetStateAction<number>): void;
}
export default AdminTableMenuProps;
