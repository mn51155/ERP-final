import { useAppSelector,useAppDispatch } from '@/store/hooks';
import ProjectCard from '@/components/cards/ProjectCard';
import { useEffect,useState } from 'react';
import { fetchProjectsThunk } from '@/features/projects/projectSlice';
import { fetchTasksThunk } from '@/features/tasks/taskSlice';

const AllProjects = () => {
  const { projects } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);
    const [projectTab, setProjectTab] = useState('all');
    const {user}=useAppSelector(state=>state.auth)
const dispatch=useAppDispatch()

useEffect(() => {
    dispatch(fetchProjectsThunk());
    dispatch(fetchTasksThunk());
  }, [dispatch]);


const projectsWithTasks = projects.map(project => ({
  ...project,
  tasks: tasks.filter(task => task.projectId === project.id)
}));

console.log(projectsWithTasks)

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>

      
       

        <div className="mb-4 flex flex-wrap gap-2">
        {['all', 'planning', 'in progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setProjectTab(status)}
            className={`px-4 py-1 rounded-md border ${
              projectTab === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsWithTasks
          .filter((p) => projectTab === 'all' || p.status === projectTab)
          .map((project) => (
           <ProjectCard project={project} projectTasks={project.tasks} userRole={user?.role}/>
          ))}
      </div>
      
    </div>
  );
};

export default AllProjects;