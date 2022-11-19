import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import styles from '../../containers/admin/styles';
import AdminTableMenuProps from './types';

const AdminTableMenu = ({ setDeleteAdmin }: AdminTableMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <div
      style={styles.actionMenuBtn}
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={(event) => {
        setAnchorEl(() => event.currentTarget);
      }}
      role="button"
      onKeyDown={(event) => {
        setAnchorEl(() => event.currentTarget);
      }}
      tabIndex={0}
    >
      <img src="more-horizontal 1.svg" alt="data-menu" />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={() => {
            setDeleteAdmin(true);
            setAnchorEl(null);
          }}
        >
          delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AdminTableMenu;
