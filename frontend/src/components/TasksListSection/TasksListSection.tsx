import React from 'react';
import { useAppSelector } from '@/store/hooks';
import type{ Task } from '@/features/tasks/types';
import TaskCard from '../cards/TaskCard';


interface TaskListSectionProps{
  showAll?:boolean
}




export default function TaskListSection(showAll:TaskListSectionProps) {


 const user=useAppSelector((state)=>state.auth.user)   
 const { tasks } = useAppSelector((state) => state.tasks);
 const { projects } = useAppSelector((state) => state.projects);
 


let  visibleTasks = React.useMemo(() => {
  if (!user) return [];

  switch (user.role) {
    case "admin":
       return showAll
       ?[...tasks]
      :[...tasks].slice(-3).reverse();
      
      

    case "project_manager":
       {
      const managedProjectIds = projects
        .filter((p) => p.managerId === user.id)
        .map((p) => p.id);

      return tasks.filter((t) => managedProjectIds.includes(t.projectId));
    }

    case "contractor":
      return tasks.filter((t) => t.contractorId === user.id);

    default:
      return [];
  }
}, [user, tasks, projects]);





 //


//






  return (
   <>
    {visibleTasks.map((task: Task) => {
            const project=projects.find(project=>project.id==task.projectId)!
        return(
          <TaskCard key={task.id} task={task} project={project} userRole={user ? user.role: undefined}  /> )
        })} 
   
   </>
  )
}
