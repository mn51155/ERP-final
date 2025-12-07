import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateTaskThunk, deleteTaskThunk,createTaskThunk } from "../taskSlice";
import Swal from "sweetalert2";
import type { Task } from "../types";
import { useNavigate } from "react-router-dom";




export const useTaskActions = () => {


    
  const dispatch = useAppDispatch();
  const navigate=useNavigate()
  const user = useAppSelector(state => state.auth.user);



    //
      const handleCreateTask = async (formData:any) => {
  
if(formData.contractorId == -1 ){
  Swal.fire('please select a contractor')
  return ;
}
if(formData.projectId==-1){
  Swal.fire('please select a project')
  return;
}
   
    const summaryHtml = `
      <p><b>Title:</b> ${formData.title}</p>
      <p><b>Status:</b> ${formData.status}</p>
      <p><b>Project:</b> ${formData.projectId}</p>
      <p><b>Contractor:</b> ${formData.contractorId}</p>
    `;

    const result = await Swal.fire({
      title: "Confirm Task Details",
      html: summaryHtml,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Create Task",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await dispatch(createTaskThunk({...formData,comments:[]}));
      Swal.fire("Created!");
      navigate(-1);  
    }
  };







//
  const handleChangeStatus = async (task: Task) => {

    if(!user){return;}

    const { value: formValues } = await Swal.fire({
      title: "Change Task Status",
      html: `
        <select id="status" class="swal2-input">
          <option value="pending" ${task.status==="pending"?"selected":""}>Pending</option>
          <option value="in progress" ${task.status==="in progress"?"selected":""}>In Progress</option>
          <option value="completed" ${task.status==="completed"?"selected":""}>Completed</option>
        </select>
        <textarea id="comment" class="swal2-textarea" placeholder="Write a comment"></textarea>
      `,
      preConfirm: () => {
        const status = (document.getElementById("status") as HTMLSelectElement).value;
        const comment = (document.getElementById("comment") as HTMLTextAreaElement).value;
        return { status, comment };
      },
      showCancelButton: true,
    });

    if (formValues) {
      const updatedTask = {
        ...task,
        status: formValues.status,
        comments: formValues.comment
          ? [...(task.comments || []), {
              id: Date.now(),
              author: user?.username || "unknown",
              text: formValues.comment,
              createdAt: new Date().toISOString(),
            }]
          : task.comments,
      };
      dispatch(updateTaskThunk({ id: task.id, data: updatedTask }))
    

      
    }
  };




  //
  const handleDeleteTask = async (task: Task) => {
    const result = await Swal.fire({
      title:` Delete task "${task.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      dispatch(deleteTaskThunk(task.id));
      Swal.fire("Deleted!");
      
    }
  };



//
    const handleUpdateTask = async (taskId:number,formData:any) => {
    await dispatch(updateTaskThunk({ id: taskId, data: formData }));
    Swal.fire("Saved!");
    navigate(-1); 
  };

  return { handleChangeStatus, handleDeleteTask,handleUpdateTask,handleCreateTask };
};