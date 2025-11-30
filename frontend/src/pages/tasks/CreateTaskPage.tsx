import { useState } from "react";
import { useAppSelector } from "@/store/hooks";

import { useTaskActions } from "@/features/tasks/hooks/useTaskActions";



const NewTask = () => {
  const {handleCreateTask}=useTaskActions()
  const projects = useAppSelector((state) => state.projects.projects);
  const users = useAppSelector((state) => state.users.users);
  const contractors = users.filter((u) => u.role === "contractor");

  const [formData, setFormData] = useState({
    title: "",
    projectId: -1,
    contractorId:-1,
    status: "pending" as "pending" | "in progress" | "completed",
    
  });

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateTask(formData)

  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Project */}
        <div>
          <label className="block mb-1">Project</label>
          <select
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: Number(e.target.value) })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value={-1} disabled>select a Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Contractor */}
        <div>
          <label className="block mb-1">Contractor</label>
          <select
            value={formData.contractorId}
            onChange={(e) => setFormData({ ...formData, contractorId: Number(e.target.value) })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value={-1} disabled>select a contractor</option>
            {contractors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.username}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Task["status"] })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="planning">planning</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600  rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default NewTask;