
import {  useAppSelector } from '../../store/hooks';
import type { User } from '@/features/users/types';
import UserCard from '../cards/UserCard';





export default function UserListSection() {


const { users } = useAppSelector((state) => state.users);






  return (
   <>
   {
    users.map((user:User)=>(
        <UserCard  user={user}></UserCard>
    ))
   }
   
   
   
   </>
  )
}
