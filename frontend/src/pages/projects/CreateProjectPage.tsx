import { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import {useProjectActions} from '../../features/projects/hooks/useProjectActions'


const NewProject = () => {
 
  const {handleCreateProject}=useProjectActions()




  // فقط کاربرانی که نقش‌شون project_manager هست
  const managers = useAppSelector((state) =>
    state.users.users.filter((u) => u.role === "project_manager")
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    managerId: -1,
    startDate: "",
    endDate: "",
    status: "planning" as "planning" | "in progress" | "completed",
  });





  const handleSubmit = async (e: React.FormEvent,formData:any) => {
    e.preventDefault();
    handleCreateProject(formData)

  };








  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">New Project</h2>
      <form onSubmit={(e)=>handleSubmit(e,formData)} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <select
          value={formData.managerId}
          onChange={(e) =>
            setFormData({ ...formData, managerId: Number(e.target.value) })
          }
          className="border p-2 w-full rounded"
        >
          <option value={-1} disabled>
            Select a manager
          </option>
          {managers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.username}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "planning" | "in progress" | "completed",
            })
          }
          className="border p-2 w-full rounded"
        >
          <option value="planning">Planning</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProject;