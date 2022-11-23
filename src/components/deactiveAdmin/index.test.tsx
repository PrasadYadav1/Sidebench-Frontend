import { act, fireEvent, render, screen } from '@testing-library/react';
import DeactiveAdmin from '.';

describe('Tests for Delete Admin Popup  ', () => {
  const setDeactiveAdmin = jest.fn();
  const handleDeactive = jest.fn();
  it('Should popup close when click on cancel button', async () => {
    const { getByRole } = render(
      <DeactiveAdmin
        deactiveAdmin
        setDeactiveAdmin={setDeactiveAdmin}
        handleDeactive={handleDeactive}
      />
    );

    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('deactive-button')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to Deactivate the Admin?')
    ).toBeInTheDocument();

    const cancelButton = getByRole('button', {
      name: /Cancel/i
    });

    fireEvent.click(cancelButton);

    await act(async () => {
      expect(setDeactiveAdmin).toBeCalled();
    });
  });

  it('API Should call when click on Deactivate button', async () => {
    const { getByRole } = render(
      <DeactiveAdmin
        deactiveAdmin
        setDeactiveAdmin={setDeactiveAdmin}
        handleDeactive={handleDeactive}
      />
    );

    expect(screen.getByTestId('deactive-button')).toBeInTheDocument();

    const deactiveButton = getByRole('button', {
      name: /Deactivate/i
    });

    fireEvent.click(deactiveButton);

    await act(async () => {});
    expect(handleDeactive).toHaveBeenCalledTimes(1);
  });
});
