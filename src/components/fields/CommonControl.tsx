import React from 'react';
import {isFunction} from 'lodash';
import {InputOnChangeData} from 'semantic-ui-react';
import {Field, FieldAttributes, FieldProps} from 'formik';

type Control<T> = React.ComponentClass<T> | React.FC<T>;

export interface IBoundProps {
  name: string;
  value?: any;
  error?: string | boolean;
  onKeyDown?: (event: any) => any;
  onChange?: (event: any, data?: any) => any;
  onBlur?: (event: any) => any;
  showError?: boolean;
  label?: React.ReactNode;
  placeholder?: React.ReactNode;
  normalize?: (val: any) => any;
}

export function bindControl<T extends IBoundProps>(
  Component: Control<T>,
  customFieldProps: Partial<T> = {}
): React.FC<T> {
  return (fieldProps: FieldAttributes<T> & any) => {
    const {
      showError,
      normalize,
      error,
      onBlur,
      onChange,
      ...rest
    } = fieldProps;

    return (
      <Field
        render={(props: FieldProps) => {
          const {field, form: {setFieldValue, setFieldTouched, errors}} = props;

          return (
            <Component
              {...field}
              {...rest}
              error={error || (showError && errors[field.name])}
              onBlur={() => {
                if (isFunction(normalize)) {
                  setFieldValue(field.name, normalize(field.value));
                }
                setFieldTouched(field.name, true);
                if (isFunction(onBlur)) {
                  onBlur();
                }
              }}
              onChange={(v: any, {value}: InputOnChangeData) => {
                setFieldValue(field.name, value);
                if (isFunction(onChange)) {
                  onChange(v);
                }
              }}
            />
          );
        }}
        {...customFieldProps}
        {...fieldProps}
      />
    );
  };
}
