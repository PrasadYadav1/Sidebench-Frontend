import React, { ReactNode } from 'react';
import DatePicker from 'react-datepicker';

export interface DateRangeProps {
  id: string;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [start: Date | null, end: Date | null]) => void;
  maxDate?: Date | null;
  customInput?: ReactNode;
  placeholder?: string;
}

const DateRangeComp = ({
  startDate,
  endDate,
  onChange,
  customInput,
  maxDate,
  id,
  placeholder
}: DateRangeProps) => {
  return (
    <DatePicker
      id={id}
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      isClearable
      customInput={customInput}
      maxDate={maxDate}
      dateFormat="MM/dd/yyyy"
      placeholderText={placeholder}
    />
  );
};
export default DateRangeComp;
