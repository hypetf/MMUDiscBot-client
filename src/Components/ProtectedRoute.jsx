import { Navigate } from 'react-router-dom';
import useUserStore from '../utils/userStore'

const ProtectedRoute = ({children}) => {
    const user = useUserStore(state => state.user);
    const getUser = () => {
        return user;
    }    
    if (!getUser().username)
        return <Navigate replace to={"/home"} />;
    else
    return children
};

export default ProtectedRoute;