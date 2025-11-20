import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';



interface ProtectedRouteProps{
  allowedRoles?:string[],
  children?:React.ReactNode

}




const ProtectedRoute = ({allowedRoles,children}:ProtectedRouteProps) => {


  const {loading,user} = useSelector((state: RootState) => state.auth);
  
if(loading){
  return <div>loading...</div>
}
if(!user ){
  console.log('no user found')
  return <Navigate to="/login"  replace/>;
}
if(allowedRoles?.length && !allowedRoles.includes(user.role)){
  return <Navigate to={'/unauthorized'} replace/>
}
  return children ? children : <Outlet /> 
};

export default ProtectedRoute;
