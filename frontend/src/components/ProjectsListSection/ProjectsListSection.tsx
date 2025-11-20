import { useAppSelector } from '../../store/hooks';
import type { Project } from '../../features/projects/types';
import ProjectCard from '../cards/ProjectCard';




interface ProjectsListPageProps{
  showAll?:boolean
}

export default function ProjectsListSection({showAll}:ProjectsListPageProps) {


const user=useAppSelector((state)=>state.auth.user)
const { projects } = useAppSelector((state) => state.projects);
const { tasks } = useAppSelector((state) => state.tasks);




//
let visibleProjects:Project[] = [];
 if (!user){
    return;
 }
  switch(user.role) {
    case "admin":
      
      if(showAll){
        visibleProjects=[...projects]
      }else{
        // سه پروژه آخر
        visibleProjects = [...projects].slice(-3).reverse();
      }
      break;
    case "project_manager":
      // پروژه‌هایی که مدیرش این کاربره
      visibleProjects = projects.filter(p => p.managerId === user.id);
      break;
    default:
      visibleProjects=[]
  }



  //tasks
  

const projectsWithTasks = visibleProjects.map(project => ({
  ...project,
  tasks: tasks.filter(task => task.projectId === project.id)
}));


console.log(projectsWithTasks)


  return (
    <>

    {projectsWithTasks.length>0 && projectsWithTasks.map(p => 
    <ProjectCard key={p.id} project={p} projectTasks={p.tasks} userRole={user.role}/>)}
    
    
    </>
  )
}
