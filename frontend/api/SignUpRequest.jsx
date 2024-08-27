
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const SignUpRequestProcessor = () => {
    return useMutation((payload) => {
        // console.log('SignUp payload', payload);
        return axios.post('/usersWithoutAuth/signUpUser', payload);
    });
};


export default SignUpRequestProcessor;
