import {Button, CircularProgress} from "@mui/material"

import './SubmitButtonStyles.css';

const configButton = {
    sx: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1rem',
        fontWeight: '500',
        color: '#fff',
        padding: '10px',
        textTransform: 'none',
        height: '52px'
    }
};
//change isLoading value later
const SubmitButton = ({ children, isLoading=false, isFetching, isFetched, submitting, isSuccess, successText, isValid, ...otherProps }) => {
    return (
        <Button type="submit" color={isSuccess ? 'success' : 'primary'} variant="contained" {...configButton} {...otherProps}>
            {isSuccess ? successText : isLoading ? <CircularProgress sx={{ color: '#ffffff' }} /> : children}
        </Button>
    );
};

export default SubmitButton;
