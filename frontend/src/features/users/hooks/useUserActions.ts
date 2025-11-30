import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import type { Contractor, ContractorFormData } from "@/features/contractors/types";
import Swal from "sweetalert2";
import { removeUserThunk } from "../usersSlice";
import { useAppDispatch } from "@/store/hooks";
import { editUserThunk } from "../../users/usersSlice";
import { createContractorThunk, updateContractorThunk } from "../../contractors/contractorSlice";






export const useUserActions=()=>{
    const dispatch=useAppDispatch()
    const navigate=useNavigate()

//
 const handleDeleteUser = (user:User) => {
  
   Swal.fire({
      title:` Delete ${user.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeUserThunk(user.id));
        Swal.fire('Deleted!');
      }
    });
  };



//
const handleEditUser=async(
  
  id:number,
  user:User,
  contractorData:ContractorFormData,
  formData:Partial<User>,
  contractor?:Contractor,
  
)=>{


  if(!user){
   return
  }
  if(!id){
    return
  }
 const userChanged=
  formData.username !== user?.username ||
  formData.email !== user?.email ||
  formData.role !== user?.role;

  
  const contractorChanged=
  formData.role === 'contractor' &&
  (contractorData?.name !==contractor?.name ||
   contractor.email !== contractor.email ||
   contractor.phone !== contractor.phone
  )




   if(!userChanged && !contractorChanged){
    Swal.fire('No changes').then(()=>{
      navigate(-1)
    })
    return;
   }

  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, update it!",
    cancelButtonText: "Cancel",
  }).then(async(result) => {
    if (result.isConfirmed) {
     await dispatch(editUserThunk({ id: Number(id), data: {...user,...formData}})).unwrap();
         if(formData.role === "contractor"){
            if(contractor?.id !== undefined){
              dispatch(updateContractorThunk({id:contractor.id , data:{...contractorData , userId:user.id}})).unwrap()
            }else{
              dispatch(createContractorThunk({...contractorData,userId:user.id})).unwrap()
            }

           
         }
      Swal.fire("Updated!");
      navigate(-1);
    }
  });






}





    return{handleDeleteUser,handleEditUser}
}