  import { useAppSelector } from '../../store/hooks';
  import { StatusPieChart } from '../../components/charts/StatusPieChart';
  
  const statusLabels = {
  completed: 'completed',
  'in progress': 'in progress',
  planning: 'planning',
  pending:'pending',
};




export default function DashboardChart() {



  const { projects } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);



   const getStatusCounts = (items: { status: string }[]) => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      counts[item.status] = (counts[item.status] || 0) + 1;
    }
    return Object.entries(counts).map(([status, count]) => ({
      name: statusLabels[status as keyof typeof statusLabels] || status,
      value: count,
    }));
  };
  
   const projectChartData = getStatusCounts(projects);
  const taskChartData = getStatusCounts(tasks);




  return (
<>

  <StatusPieChart title="Project Status" data={projectChartData} />
      <StatusPieChart title="Task Status" data={taskChartData} />

</>
  )
}

  
