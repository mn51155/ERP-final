import {useAppSelector } from "../store/hooks";






type HeaderProps = {
  onMenuClick: () => void;
 
};

export default function Header({ onMenuClick }: HeaderProps) {





 const {user}=useAppSelector(state=>state.auth)
  


 


  





  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <button onClick={onMenuClick} className="md:hidden text-xl">☰</button>
      <h1 className="text-xl font-semibold">MY ERP</h1>
   
      <div className="flex items-center space-x-4 relative">
        
       
       

        <div className="text-gray-600">Welcome, {user?.username}</div>
      </div>
    
    </header>
  );
}