import { useAppSelector } from '../../store/store';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    } else {
        return children;
    }
};

export default Protected;
