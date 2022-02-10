import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import moment from 'moment'

// import Styles from './styles';

import { useState } from 'react';

export const InputText = ({
    field,
    label,
    placeholder,
    withError = true,
    form,
    prefix = false,
    required=true,
}) => {
    // const classes = Styles.InputStyles();
    label = label.charAt(0).toUpperCase() + label.slice(1);
    // return (
    //     <div style={{ position: 'relative' }}>
    //     <div
    //         className={`${classes.wrapperInput} ${(form.errors[field.name] && form.isSubmitting && withError) && 'error'}`}>
    //         <label className={classes.textLable}>{label}</label>
    //         <div className={classes.inputWrapper}>
    //         {
    //             prefix && <span className={classes.prefix}>{prefix}</span>
    //         }
    //         <input {...field} className={classes.input} placeholder={placeholder} type="text" autoCapitalize={false} />
    //         </div>
    //     </div>
    //     {
    //     (form.errors[field.name] && form.isSubmitting && withError) && (
    //     <span className={classes.textError}>{form.errors[field.name]}</span>
    //     )
    //     }
    //     </div>
    // )
    return (
        <Stack spacing={3}>
            <TextField
                required={required}
                {...field}
                label={label}
                defaultValue="Email"
                variant="standard"
                />
        </Stack>
    )
}

export const InputPassword = ({
    field,
    label,
    placeholder,
    form,
    withError = true,
}) => {
    // const classes = Styles.InputStyles();
    label = label.charAt(0).toUpperCase() + label.slice(1);
    return (
        <div >

            <TextField
                {...field}
                label={label}
                type='password'
                autoComplete="current-password"
                variant="standard"
            />
        </div>
        
    )
}



export const InputDate = ({
    field,
    label,
    form,
}) => {
  let nowDate = moment().format('YYYY-MM-DD').toString()
  const [value, setValue] = useState(nowDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          {...field}
          label={label}
          value={value}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            setValue(newValue);
            form.setFieldValue(field.name, moment(newValue,'YYYY-MM-DD').format('YYYY-MM-DD').toString())
          }}
          renderInput={(params) => {
            return <TextField {...params} {...field} />
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}