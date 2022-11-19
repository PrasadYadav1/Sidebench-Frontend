import { ChangeEvent } from 'react';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import DateRangePicker from '../../../components/elements/daterangepicker';
import styles from './styles';

export interface AdminToolBarProps {
  start: Date | null;
  end: Date | null;
  count: number;
  onDateRangeChange: (dates: [Date | null, Date | null]) => void;
  searchText?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ToolBar = ({
  start,
  end,
  onDateRangeChange,
  onSearchChange,
  searchText,
  count
}: AdminToolBarProps) => {
  return (
    <div style={styles.container}>
      <Stack
        sx={{ marginBottom: '2%' }}
        direction="row"
        spacing={{ lg: 127, xl: 190, md: 100 }}
      >
        <div style={styles.admin}>
          <div style={styles.adminTitle}>Admins</div>
          <div style={styles.adminCount}>{`Total admins: ${count}`}</div>
        </div>
        <div style={styles.adminBtnDiv}>
          <Button
            sx={styles.button}
            startIcon={<img style={styles.btnImg} src="add.svg" alt="" />}
          >
            Add Admin
          </Button>
        </div>
      </Stack>
      <Stack style={styles.searchStack} direction="row" spacing={1}>
        <TextField
          key="admin-search"
          sx={styles.search}
          type="text"
          data-testid="admin-search-test"
          InputProps={{
            sx: styles.searchInput,
            startAdornment: (
              <InputAdornment position="start">
                <img alt="" src="/images/search-normal.png" />
              </InputAdornment>
            )
          }}
          placeholder="Search by name"
          onChange={onSearchChange}
          value={searchText}
        />
        <div>
          <DateRangePicker
            id="sort-by"
            data-testid="sort-by-test"
            startDate={start}
            endDate={end}
            onChange={onDateRangeChange}
            maxDate={new Date()}
            placeholder="Sort by date"
          />
        </div>
      </Stack>
    </div>
  );
};
export default ToolBar;
