import { Navigate,Outlet } from 'react-router-dom';

export const PrivateRoute = () => (localStorage.getItem('token')? <Outlet/> : <Navigate to="/auth"/>)

