import React from "react";
import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";

const DatePickerField = ({ ...props }) => {
  const { setFieldValue, validateField, setFieldTouched } = useFormikContext();
  const [field] = useField(props);
  
  return (
   
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        onCalendarClose={(val) => {
          validateField(field.name);
        }}
        onChangeRaw={(e) => {
          setFieldTouched(field.name, true, true);
        }}
      />
    
  );
};

export default DatePickerField;
