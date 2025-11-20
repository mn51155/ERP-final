
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';
import DashboardChart from '../../components/charts/dashboardChart';
import ProjectsListSection from '../../components/ProjectsListSection/ProjectsListSection';
import TaskListSection from '../../components/TasksListSection/TasksListSection';
import UserListSection from '../../components/UsersListSection/UserListSection';






const MainDashboard = () => {
  

  
 
  const user=useAppSelector((state)=>state.auth.user)

 

  

  

  




 return (
  <div className="p-6 space-y-8">

    {/*  Charts */}
    {user?.role =='admin' && 
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <DashboardChart  />
    </section>
}


    {/* Projects */}
    {(user?.role == 'admin' ||user?.role == 'project_manager') &&
    <section className="bg-white rounded-md shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">last Projects</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
       <ProjectsListSection showAll={false}/>
        </div>
          {user?.role == 'admin'  && (
        <div className='mt-4 flex justify-end gap-3'>
               <button><Link to={'/projects/new'}>new Project</Link></button>
         <button><Link to={'/projects'}>all projects  </Link></button> 
        </div>
          )}
         
    </section>
    }

    {/*  Tasks*/}

    {(user?.role == 'admin' ||user?.role == 'project_manager' ||user?.role == 'contractor') &&
     <section className="bg-white rounded-md shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
      <TaskListSection showAll={false}/>
        </div>
        <div  className='mt-4 flex justify-end gap-3'>
            {(user?.role == 'admin' || user?.role == 'project_manager') && (
           <button><Link to={'/tasks/new'}>new Task</Link></button>
           )}
           {user?.role == 'admin' && (
             <button><Link to={'/tasks'}>all tasks  </Link></button> 
           )}
        
        </div>
    </section> 
}


{/*  Users Management */}
{user?.role === 'admin' && (
  
    <section className="bg-white rounded-md shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
      <UserListSection />
        </div>
        <div  className='mt-4 flex justify-end gap-3'>
           
           <button><Link to={'/user/new'}>new user</Link></button>
           
        
             <button><Link to={'/users'}>all users  </Link></button> 
          
        
        </div>
    </section>

)}
  </div>
);
};

export default MainDashboard;