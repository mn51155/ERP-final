// src/pages/projects/EditProject.tsx
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useProjectActions } from "../../features/projects/hooks/useProjectActions";
import type { Project } from "../../features/projects/types";

const EditProject = () => {

  const { id } = useParams<{ id: string }>();
  const {handleEditProject}=useProjectActions()

//
  const project = useAppSelector((state) =>
    state.projects.projects.find((p) => p.id === Number(id))
  );


//
  const managers=useAppSelector((state)=>
    state.users.users.filter((u)=>u.role == "project_manager")
  )



  const [formData, setFormData] = useState({
    title: "",
    description: "",
    managerId:-1,
    startDate: "",
    endDate: "",
    status: "planning",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        managerId: project.managerId,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
      });
    }
  }, [project]);

  if (!project) {
    return <p className="p-6">Project not found.</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



//
  const handleSubmit = async (e: React.FormEvent,project:Project,formData:any) => {
    e.preventDefault();
    handleEditProject(project,formData)

   
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
      <form onSubmit={(e)=>handleSubmit(e,project,formData)} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
      <label>Project Manager</label>
<select
  value={project.managerId}
  onChange={(e) =>
    setFormData({ ...formData, managerId: Number(e.target.value) })
  }
>

  {managers.map((m) => (
    <option key={m.id} value={m.id}>
      {m.username} {/* یا هر فیلدی که میخوای نمایش بدی */}
    </option>
  ))}
</select>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="planning">Planning</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-blue-500 px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;