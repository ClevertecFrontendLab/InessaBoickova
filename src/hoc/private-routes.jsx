import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => (localStorage.getItem('token')? children : <Navigate to="/auth"/>)

