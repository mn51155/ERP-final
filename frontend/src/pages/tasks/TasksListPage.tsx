import { useAppSelector,useAppDispatch } from '../../store/hooks';

import type { Project } from '@/features/projects/types';
import type{ Task } from '@/features/tasks/types';
import { useEffect,useState } from 'react';
import { fetchProjectsThunk } from '@/features/projects/projectSlice';
import { fetchTasksThunk } from '@/features/tasks/taskSlice';
import TaskCard from '@/components/cards/TaskCard';

const AllTasks = () => {
   const user=useAppSelector((state)=>state.auth.user)   
  const { projects } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);
    const [taskTab, setTaskTab] = useState('all');
const dispatch=useAppDispatch()

useEffect(() => {
    dispatch(fetchProjectsThunk());
    dispatch(fetchTasksThunk());
  }, [dispatch]);





  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      
       

        <div className="mb-4 flex flex-wrap gap-2">
        {['all', 'planning', 'in progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setTaskTab(status)}
            className={`px-4 py-1 rounded-md border ${
              taskTab === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks
          .filter((p) => taskTab === 'all' || p.status === taskTab)
          .map((task:Task) => 
             {
            const project:Project=projects.find(project=>project.id==task.projectId)!
        return(
          <TaskCard key={task.id} task={task} project={project} userRole={user ? user.role: undefined}  /> )
        }
          )}
      </div>
      
    </div>
  );
};

export default AllTasks;
