import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Swal from "sweetalert2";
import { createProjectThunk } from "../projectSlice";
import { useNavigate } from "react-router-dom";
import { deleteProjectThunk } from "../projectSlice";
import type { Project } from "../types";
import { updateProjectThunk } from "../projectSlice";



export const useProjectActions=()=>{


     
      const dispatch=useAppDispatch()
      const navigate=useNavigate()


      const { users}=useAppSelector(state=>state.users)


//
const handleCreateProject= async (formData:any) => {
    

    if (
      !formData.title ||
      !formData.description ||
      formData.managerId === -1 ||
      !formData.startDate ||
      !formData.endDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Project",
      html: `
        <p><b>Title:</b> ${formData.title}</p>
        <p><b>Description:</b> ${formData.description}</p>
        <p><b>Manager:</b> ${users.find(user=>user.id == formData.managerId)?.username ?? 'Unoknown'}</p>
        <p><b>Start Date:</b> ${formData.startDate}</p>
        <p><b>End Date:</b> ${formData.endDate}</p>
        <p><b>Status:</b> ${formData.status}</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(createProjectThunk(formData)).unwrap();
      Swal.fire("Created!");
      navigate(-1); 
    } catch (err) {
      Swal.fire("Failed to create project.");
    }
  };


//
 const handleDeleteProject = (id:number) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ja',
      cancelButtonText: 'cancel'
    }).then((result) => {
      if (result.isConfirmed) {
 
        dispatch(deleteProjectThunk(id));

        Swal.fire(
          'deleted seccessfully',
         
        )
      }
    });
  };


  //
  const handleEditProject =async(project:Project,formData:any)=>{
     const hasChanges = Object.keys(formData).some(
      (key) => (formData as any)[key] !== (project as any)[key]
    );

    if (!hasChanges) {
      await Swal.fire("No changes");
      navigate(-1);  
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
    });

    if (result.isConfirmed) {
      await dispatch(updateProjectThunk({ id: project.id, data: formData }));
      await Swal.fire("Updated!");
      navigate(-1);
    }
  }









  return {handleCreateProject,handleDeleteProject,handleEditProject}
}




