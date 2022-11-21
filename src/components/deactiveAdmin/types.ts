interface DeActiveAdminProps {
  deactiveAdmin: boolean;
  setDeactiveAdmin(value: React.SetStateAction<boolean>): void;
  selectedId: number;
  setOpenSuccessToast(value: React.SetStateAction<boolean>): void;
  setToastSuccessMsg(value: React.SetStateAction<string>): void;
  setToastErrorMsg(value: React.SetStateAction<string>): void;
  setOpenErrorToast(value: React.SetStateAction<boolean>): void;
}
export default DeActiveAdminProps;
