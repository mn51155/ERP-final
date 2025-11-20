
import { useParams} from "react-router-dom";
import {  useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";
import type { User } from "../../features/users/types";

import {useUserActions} from "../../features/users/hooks/useUserActions"



const EditUser = () => {
  const { id } = useParams<{ id: string }>();
 
  const {handleEditUser}=useUserActions()

  const user = useAppSelector((state) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  const contractor=useAppSelector((state)=>
    state.contractors.contractors.find((c)=>c.userId === Number(id)))

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user" as User["role"],
  });

  const [contractorData,setContractorData]=useState({
    name:"",
    email:"",
    phone:""
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
    if(contractor){
      setContractorData({
        name:contractor.name,
        email:contractor.email,
        phone:contractor.phone
      })
    }
  }, [user,contractor]);


  //form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  //contractor form
  const handleContractorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setContractorData({ ...contractorData, [e.target.name]: e.target.value });
  };




  const handleSubmit =(e: React.FormEvent) => {

  e.preventDefault();

if(!id) return;
if(!user) return;

handleEditUser(
  Number(id),
  user,
  contractor,
  formData,
  contractorData,
 )

  

 


};



    if (!id) {
      return <p>Invalid user id</p>;
            }



  if (!user) return <p>User not found!</p>;





  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="admin">Admin</option>
            <option value="project_manager">Project Manager</option>
            <option value="contractor">Contractor</option>
            <option value="employee">Employee</option>
            <option value="client">Client</option>
            <option value="user">User</option>
          </select>
        </div>


        
       
        {formData.role === "contractor" && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Contractor Info</h3>

            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={contractorData.name}
                onChange={handleContractorChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={contractorData.email}
                onChange={handleContractorChange}
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={contractorData.phone}
                onChange={handleContractorChange}
                className="border rounded w-full p-2"
              />
            </div>
          </div>
        )}






        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;