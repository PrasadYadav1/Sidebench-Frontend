import React from 'react';

interface AddNewAdminProps {
  addNewAdmin: boolean;
  setAddNewAdmin(value: React.SetStateAction<boolean>): void;
}
export default AddNewAdminProps;
