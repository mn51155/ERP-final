import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProjectsThunk } from '../features/projects/projectSlice';
import { fetchTasksThunk } from '../features/tasks/taskSlice';
import { fetchUsersThunk } from '../features/users/usersSlice';
import { fetchContractorsThunk } from '../features/contractors/contractorSlice';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch=useAppDispatch()
  const user=useAppSelector(state=>state.auth.user)
 
   

  useEffect(()=>{
    if (!user) return;
     dispatch(fetchProjectsThunk())
    dispatch(fetchTasksThunk());
    dispatch(fetchUsersThunk())
    dispatch(fetchContractorsThunk())
    
  },[dispatch,user])













  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar (Mobile & Desktop) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-zinc-500/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)}  />
        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}