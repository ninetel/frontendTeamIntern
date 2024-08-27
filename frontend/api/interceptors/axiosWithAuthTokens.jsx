// import axios from 'axios';
// const baseURL = '';


// export function getRefreshToken() {
//     return JSON.parse(localStorage.getItem('refreshToken'));
// }

// export function getAccessToken() {
//     return JSON.parse(localStorage.getItem('accessToken'));
// }

// function setAuthTokens(values) {
//     localStorage.setItem('accessToken', JSON.stringify(values.accessToken));
//     localStorage.setItem('refreshToken', JSON.stringify(values.refreshToken));
// }

// const axiosWithAuthToken = axios.create({
//     baseURL
// });

// axiosWithAuthToken.interceptors.request.use(
//     (config) => {
//         config.headers.Authorization = `Bearer ${getAccessToken()}`;
//         return config;
//     },
//     (err) => {
//         return Promise.reject(err);
//     }
// );

// axiosWithAuthToken.interceptors.response.use(
//     (res) =>  res,
//     async (error) => {
//         const originalConfig = error.config;
//         if (error.response.status === 401 && error.response.data) {
//             console.log(error.response.data);
//             return Promise.reject(error.response.data);
//         }

//         if (error.response.status === 403 && !originalConfig._retry) {
//             originalConfig._retry = true;
//             const refreshToken = getRefreshToken();
//             try {
//                 const response = await axios.get('', {
//                     headers: {
//                         Authorization: `Bearer ${refreshToken}`
//                     }
//                 });
//                 setAuthTokens(response.data);
//                 //Here the axiosWithAuthToken.interceptors.request.use will run if we retry our axios(originalConfig) so instead of setting the new accessToken here we jst update it's values the it will be set in the interceptor.request.use
//                 return await axios(originalConfig);
//                 //puting it to await runs the catch block once indication jwit expired error
//             } catch (error) {
//                 return Promise.reject(error);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosWithAuthToken;
