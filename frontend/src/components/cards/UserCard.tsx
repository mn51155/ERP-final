
import type { User } from '@/features/users/types';
import { Link } from 'react-router-dom';
import { useUserActions } from '../../features/users/hooks/useUserActions';



interface UserCardProps{
    user:User
}

const UserCard=({user}:UserCardProps)=>{

      const {handleDeleteUser}=useUserActions()




     return (
    <div className="flex flex-col    border rounded-lg p-4 shadow-sm bg-white space-y-3">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{user.username}</h2>
        
      </div>

      <p className="text-sm text-gray-600">{user.role}</p>
      <p className="text-sm text-gray-600">{user.email}</p>
       



      {/* buttons */}
      <div className="flex flex-col sm:flex-row justify-end">

         <div className=" mt-auto flex justify-end items-center gap-3 mt-4 text-sm">


        
          
          
             
         

        
           
        <button className="text-red-600 hover:underline"><Link to={`/users/${user.id}/edit`}>edit</Link></button>
        
        <button className="text-red-600 hover:underline" onClick={()=>handleDeleteUser(user)}>Delete</button>
               
        
         
         
      
        

        </div>
      </div>
   
      
        </div>
     )    
}


export default UserCard