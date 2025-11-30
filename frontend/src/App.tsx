import { useEffect } from 'react'
import { useRoutes,useNavigate } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '../src/store/hooks'
import './App.css'
import routes from './router/routes'
import { restoreSession } from '@/features/auth/authSlice'
import { isTokenExpired } from '@/utils/authUtils'



function App() {
 const  router=useRoutes(routes)
  const dispatch = useAppDispatch();
  const navigate=useNavigate()


    const {  isInitialized} = useAppSelector(state => state.auth)

  useEffect(() => {
    
 

const skip = localStorage.getItem('skipRestoreSession');

    if (!skip) {
      console.log('dispatching restoressession')
      dispatch(restoreSession());
      
    } else {
      
      localStorage.removeItem('skipRestoreSession');
    }
    



   const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      console.log('5 minutes')
      if (token && isTokenExpired(token)) {
        navigate("/login");
        localStorage.removeItem('token');
        localStorage.removeItem('user')
      }
    }, 5*60*1000); 
    return () => clearInterval(interval);
   
       
  }, [navigate]);
  


if(!isInitialized){
return <div>connecting</div>
}
  
  return (
    <>
   {router}
      
    </>
  )
}

export default App
