
import type { Task } from '../../features/tasks/types';
import type { Project } from '../../features/projects/types';
import type { User } from '@/features/users/types';


import Swal from 'sweetalert2';
import { useTaskActions } from '../../features/tasks/hooks/useTaskActions';
import { Link } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  project: Project;
  userRole?:User['role'],
  showAll?:boolean
  

}

const statusColor = {
  completed: 'bg-green-100 text-green-800',
  'in progress': 'bg-yellow-100 text-yellow-800',
  pending: 'bg-gray-100 text-gray-800',
};







const TaskCard = ({ task, project,userRole}: TaskCardProps) => {


  const {handleChangeStatus,handleDeleteTask}=useTaskActions()



//



  //
const onClickShowComments = async () => {
 
  console.log(task.comments)
  const commentsHtml = (task.comments &&task.comments.length)
    ?` <ul class=" pl-5 space-y-2">${task.comments.map(c => `<li class="bg-gray-100 text-gray-800 p-2 rounded-md shadow-sm">${c.text}</li>`).join('')}</ul>`
    : '<p>no comments</p>';

  await Swal.fire({
    title: 'Comments',
    html: commentsHtml,
    confirmButtonText: 'close',
    width: 400,
  });
};


//


  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColor[task.status]}`}>
          {task.status}
        </span>
      </div>

      {project && (
        <p className="text-sm text-gray-600">
          Project: <span className="font-medium">{project.title}</span>
        </p>
      )}



    {/* buttons */}
    <div className="flex flex-col sm:flex-row justify-end">

  {/* نسخه دسکتاپ */}
  <div className="hidden sm:flex mt-auto justify-end items-center gap-3 mt-4 text-sm flex-wrap">

    {(userRole === 'contractor' || userRole === 'admin') && (
      <>
        <button className="text-red-600 hover:underline" onClick={() => handleChangeStatus(task)}>change Status</button>
        <button className="text-blue-600 hover:underline" onClick={onClickShowComments}>comments</button>
      </>
    )}

    {userRole === 'admin' && (
      <>
        <button className="text-red-600 hover:underline">
          <Link to={`/tasks/${task.id}/edit`}>edit</Link>
        </button>

        <button className="text-red-600 hover:underline" onClick={() => handleDeleteTask(task)}>Delete</button>
      </>
    )}

  </div>

  {/* نسخه موبایل */}
  <div className="sm:hidden mt-4">
    <details className="bg-gray-100 rounded p-2 cursor-pointer">
      <summary className="font-medium text-center">Actions</summary>

      <div className="flex flex-col gap-2 mt-2 text-sm">

        {(userRole === 'contractor' || userRole === 'admin') && (
          <>
            <button className="text-red-600 hover:underline" onClick={() => handleChangeStatus(task)}>change Status</button>
            <button className="text-blue-600 hover:underline" onClick={onClickShowComments}>comments</button>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <button className="text-red-600 hover:underline">
              <Link to={`/tasks/${task.id}/edit`}>edit</Link>
            </button>

            <button className="text-red-600 hover:underline" onClick={() => handleDeleteTask(task)}>Delete</button>
          </>
        )}

      </div>

    </details>
  </div>

</div>
    </div>
  );
};

export default TaskCard;