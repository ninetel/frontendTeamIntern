import { Grid } from '@mui/material';
import FormTopSection from '../../molecules/LoginTopSection/LoginTopSection';
import Heading from '../../atoms/Heading/Heading';
import SignUpForm from '../../orgamisms/SignUp/SignUpForm';

const SignUp = () => {

    return (
        <Grid
            container
            sx={{
                width: '480px',
            }}
        >
            <Grid item xs={12} sx={{ height: '15%', display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                <Heading />
            </Grid>

            <Grid
                item
                sx={{
                    height: '500px',
                    padding: '28.5px 33px',
                    backgroundColor: '#FFFFFF'
                }}
            >
                <Grid container gap="28px">
                    <Grid item xs={12} sx={{ height: '55px' }}>
                        <FormTopSection heading="Sign up" text="Don't have an account?" link="Sign in" />
                    </Grid>
                    <Grid item xs={12}>
                        <SignUpForm />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SignUp;
