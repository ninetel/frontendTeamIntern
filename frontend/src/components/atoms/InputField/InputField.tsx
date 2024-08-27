import { TextField, TextFieldProps } from '@mui/material';
type InputFieldProps = {
    label: string;
    name: string;
    error: boolean;
    errorMessage: string | undefined;
    touched: boolean | undefined;
    // otherProps: TextFieldProps
};
const labelStyles = {
    color: '#000',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '16px',
    fontWeight: 400
};
const InputField = ({ label, name, error, errorMessage, touched, ...otherProps }: InputFieldProps & TextFieldProps) => {
    return (
        <TextField
            name={name}
            label={label}
            error={error}
            helperText={error && touched && errorMessage}
            {...otherProps}
            inputProps={{
                style: {
                    height: '19px'
                }
            }}
            InputLabelProps={{
                style: labelStyles
            }}
        />
    );
};

export default InputField;
