interface DeActiveAdminProps {
  deactiveAdmin: boolean;
  setDeactiveAdmin(value: React.SetStateAction<boolean>): void;
  handleDeactive(): void;
}
export default DeActiveAdminProps;
