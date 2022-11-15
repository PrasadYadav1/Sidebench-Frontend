import { render } from '@testing-library/react';
import DateRangePicker from './index';

describe('Daterange Picker tests', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const tree = render(
      <DateRangePicker
        id="abcdefg"
        startDate={new Date('11/10/2022')}
        endDate={new Date('11/10/2022')}
        onChange={onChange}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
