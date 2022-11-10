import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LEFT_PANNEL_TEXT } from '../../utils/constants';
import LeftPannel from './index';

describe('LeftPannel Component test', () => {
  it('Left Pannel icons should be rendered when items', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LeftPannel />
      </BrowserRouter>
    );
    expect(getByText(LEFT_PANNEL_TEXT.DASHBOARD)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.INVENTORY)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.CUSTOMER_LIST)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.TEAM)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.SETTINGS)).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });
});
