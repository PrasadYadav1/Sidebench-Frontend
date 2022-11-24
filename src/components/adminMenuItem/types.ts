import { AdminApiProps } from '../../containers/admin/types';

interface AdminTableMenuProps {
  setDeleteAdmin(value: React.SetStateAction<boolean>): void;
  setDeactiveAdmin(value: React.SetStateAction<boolean>): void;
  rowData: AdminApiProps;
  setSelectedId(value: React.SetStateAction<number>): void;
}
export default AdminTableMenuProps;
