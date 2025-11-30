
import { Link } from 'react-router-dom';
import type { Project } from '@/features/projects/types';
import type { Task } from '@/features/tasks/types';
import type { User } from '@/features/users/types';

import { useProjectActions } from '@/features/projects/hooks/useProjectActions';

interface ProjectCardProps {
  project: Project;
  projectTasks: Task[];
  userRole?:User['role'];
}

const statusColor = {
  completed: 'bg-green-100 text-green-800',
  'in progress': 'bg-yellow-100 text-yellow-800',
  planning: 'bg-blue-100 text-blue-800',
};

const ProjectCard = ({ project, projectTasks, userRole}: ProjectCardProps) => {



  const {handleDeleteProject}=useProjectActions()






 





  

  return (
    <div className="flex flex-col h-full   border rounded-lg p-4 shadow-sm bg-white space-y-3">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColor[project.status]}`}>
          {project.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">{project.description}</p>

    {userRole =='admin' && projectTasks.length>0 &&
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Tasks:</h3>
          <ul className=" text-sm text-gray-600">
            {projectTasks.map((task) => (
 <li key={task.id}>
        <Link
          to={`/tasks/${task.id}/edit`}
          className="flex justify-between items-center bg-gray-50 p-2 rounded hover:bg-gray-100 transition text-blue-600 hover:underline"
        >
          <span>{task.title}</span>
          <span className="text-xs text-gray-500">edit</span>
        </Link>
      </li>            ))}
          </ul>
        </div>
}
    
    {userRole =='admin' && 
      <div className=" mt-auto flex justify-end items-center gap-3 mt-4 text-sm">
        <Link to={`/projects/${project.id}/edit`} className="text-blue-600 hover:underline">
          Edit
        </Link>
        <button className="text-red-600 hover:underline" onClick={()=>handleDeleteProject(project.id)}>Delete</button>
      </div>
      
      }
    </div>
  );
};

export default ProjectCard;