import SignIn from '../components/templates/SignIn/SignIn';
import SignUp from '../components/templates/SignUp/SignUp';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const useStyles = makeStyles({
    container: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9F2FF'
    }
});

const Authentication = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const isSignIn = useAppSelector((state) => state.authentication.isSignIn);
    const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
    useEffect(() => {
        if (isLoggedIn) navigate('/dashboard');
    }, [isLoggedIn]);

    return <Box className={classes.container}>{isLoggedIn ? null : isSignIn ? <SignIn /> : <SignUp />}</Box>;
};

export default Authentication;
