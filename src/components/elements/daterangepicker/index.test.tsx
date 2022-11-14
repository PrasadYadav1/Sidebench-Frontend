import { render } from '@testing-library/react';
import DateRangePicker from './index';

describe('Daterange Picker tests', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const tree = render(
      <DateRangePicker
        dataTestId="abcdefg"
        startDate={new Date()}
        endDate={new Date()}
        onChange={onChange}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
