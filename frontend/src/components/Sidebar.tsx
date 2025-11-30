import { logout } from '@/features/auth/authSlice';
import { useAppDispatch} from '@/store/hooks'
import { Link, useNavigate } from 'react-router-dom';





type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {

const dispatch=useAppDispatch()
const Navigate=useNavigate()
const logoutHandle=()=>{
  dispatch(logout())
  Navigate('/login')
}




  return (
    <aside
      className={`fixed z-40 inset-y-0 left-0 w-64 bg-blue-700 text-white p-4 transform transition-transform duration-300 md:static md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">MyERP</h2>
        <button className="md:hidden text-black" onClick={onClose}>✕</button>
      </div>
      <nav className="flex flex-col gap-2">
        <Link to={'/'} className="hover:bg-blue-800 p-2 rounded">Dashboard</Link>
        <Link to={"/projects"} className="hover:bg-blue-800 p-2 rounded">Projects</Link>
        <Link to={"/tasks"} className="hover:bg-blue-800 p-2 rounded">tasks</Link>
        <a onClick={logoutHandle}>logout</a>
      </nav>

      
    </aside>
  );
}