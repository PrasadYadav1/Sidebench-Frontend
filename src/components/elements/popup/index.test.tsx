import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@mui/material';
import Popup from '.';

describe('Popup component test', () => {
  it('Popup should be render with title and description', () => {
    const { getByText } = render(
      <Popup
        open
        title="Timeout Alert"
        textAlign="left"
        handleClose={() => null}
        description={
          <>
            You are about to be logged out. Please click below to stay logged in
            for another hour.
          </>
        }
      >
        <Button variant="contained" fullWidth>
          Close
        </Button>
      </Popup>
    );
    expect(getByText('Timeout Alert')).toBeInTheDocument();
    expect(
      getByText(
        'You are about to be logged out. Please click below to stay logged in for another hour.'
      )
    ).toBeInTheDocument();
  });
});
