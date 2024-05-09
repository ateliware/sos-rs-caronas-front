import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePickerInput from './DatePickerInput';

describe('DatePickerInput', () => {
  it('renders input', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <DatePickerInput
        dateSelected="12/01/2000"
        onSelect={() => {}}
        name="datepicker"
        className="custom-input"
      />
    );

    const calendarButton = container.querySelector(
      '.popover-wrapper'
    ) as Element;

    await user.hover(calendarButton);

    //.rdp is a class from daypicker
    expect(container.querySelector('.rdp')).toBeInTheDocument();
  });
});
