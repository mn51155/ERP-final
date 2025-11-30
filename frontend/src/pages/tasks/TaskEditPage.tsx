import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useState, useEffect } from "react";
import type { Task, Comment } from "@/features/tasks/types";
import { useTaskActions } from "@/features/tasks/hooks/useTaskActions";

const EditTask = () => {


  const {handleDeleteTask,handleUpdateTask}=useTaskActions()
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState({
    title: "",
    status: "pending" as Task["status"],
    comments: [] as Comment[],
    projectId:0,
    contractorId:0
  });
  


  //task finding
  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === Number(id))
  );
    //
  const projects=useAppSelector(state=>state.projects.projects)

  //
  const contractors=useAppSelector(state=>state.contractors.contractors)
  console.log(contractors)







  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        status: task.status,
        comments: task.comments || [],
        projectId:task.projectId,
        contractorId:task.contractorId
      });
    }
  }, [task]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name,value}=e.target
    setFormData(prev=>({ ...prev, [name]: name === "projectId" || name==="contrectorId"? Number(value) : value }));
  };



  const handleDeleteComment = (id: number) => {
    setFormData({
      ...formData,
      comments: formData.comments.filter(c => c.id !== id)
    });
  };



console.log("task.contractorId",task?.contractorId)







 

  if (!task) return <p>Task not found!</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>

      <div className="mb-4">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded w-full p-2"
        >
          <option value="planning">Planning</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="mb-4">
            <label className="block font-medium">Project</label>
           <select
  name="projectId"
  value={formData.projectId}
  onChange={handleChange}
   className="border rounded w-full p-2"
>
  {projects.map(p => (
    <option key={p.id} value={p.id}>{p.title}</option>
  ))}
</select>

      </div>
     


<div className="mb-4">
      <label className="block font-medium">contractor</label>
    <select
  name="contractorId"
  value={formData.contractorId}
  onChange={handleChange}
   className="border rounded w-full p-2"
>
  {contractors.map(c => (
    <option key={c.id} value={c.id}>{c.name}</option>
  ))}
</select>

</div>
    





     { task.comments.length>0 &&<div className="mb-4">
        <label className="block font-medium">Comments</label>
        <ul className="mb-2 max-h-32 overflow-y-auto border p-2">
          {formData.comments.map(c => (
            <li key={c.id} className="flex justify-between items-center">
              <span>{c.text}</span>
              <button
                onClick={() => handleDeleteComment(c.id)}
                className="text-red-500 ml-2"
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
         
          
        </div>
      </div>
      }

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={()=>handleDeleteTask(task)} className="bg-red-500 px-3 py-1 rounded">
          Delete Task
        </button>
        <button onClick={()=>handleUpdateTask(task.id,formData)} className="bg-green-500  px-3 py-1 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTask;