import { Pagination, Stack, TextField, Typography } from '@mui/material';
import styles from './styles';

export interface PaginationProps {
  dataTestId: string;
  count: number;
  page: number;
  onChange?: () => void;
  pageSize?: number;
  currentPageDataLength?: number;
}

export const CustomPagination = ({
  count,
  page,
  onChange,
  pageSize,
  currentPageDataLength,
  dataTestId
}: PaginationProps) => {
  return (
    <Stack
      data-testid={`${dataTestId}-container`}
      sx={styles.container}
      direction="row"
      // spacing={{ lg: 84, xl: 165, md: 100 }}
    >
      <div style={styles.mainDiv}>
        <Typography sx={styles.countDiv} component="label">
          Showing
        </Typography>
        {'    '}
        <TextField
          data-testid={`${dataTestId}-data-length`}
          InputProps={{ sx: styles.input }}
          size="small"
          sx={styles.textField}
          disabled
          value={(currentPageDataLength ?? 0) + (pageSize ?? 10) * (page - 1)}
        />
        {'    '}
        <Typography sx={styles.countDiv} component="label">
          of {count} entries
        </Typography>
      </div>
      <Pagination
        data-testid={`${dataTestId}-pagination`}
        count={count}
        page={page}
        shape="rounded"
        size="small"
        defaultPage={0}
        boundaryCount={2}
        onChange={onChange}
        sx={styles.ul}
      />
    </Stack>
  );
};
