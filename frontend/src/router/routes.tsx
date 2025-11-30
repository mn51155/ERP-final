import type { RouteObject } from 'react-router-dom';
import MainLayout from '../layoutes/MainLayout';
import MainDashboardPage from '../pages/dashboard/MainDashboardPage';
import ProjectsListPage from '../pages/projects/ProjectsListPage';
import ProjectEditPage from '../pages/projects/ProjectEditPage';
import CreateProjectPage from '../pages/projects/CreateProjectPage';
import TasksListPage from '../pages/tasks/TasksListPage';
import CreateTaskPage from '../pages/tasks/CreateTaskPage';
import TaskEditPage from '../pages/tasks/TaskEditPage';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Unauthorized from '../pages/Unauthorized';
import UsersListPage from '../pages/users/UsersListPage';
import UserEditPage from '../pages/users/UserEditPage';




const routes: RouteObject[] = [
  
     {
  path: '/',
  element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
  children: [
    { index:true, element: <MainDashboardPage /> },

  //admin
    {
      element: <ProtectedRoute allowedRoles={['admin']} />,
      children: [
        { path: 'users', element: <UsersListPage /> },
        { path: 'users/:id/edit', element: <UserEditPage /> },

        { path: 'projects', element: <ProjectsListPage /> },
        { path: 'projects/new', element: <CreateProjectPage /> },
        { path: 'projects/:id/edit', element: <ProjectEditPage /> },

        { path: 'tasks/new', element: <CreateTaskPage /> },
        { path: 'tasks', element: <TasksListPage /> },
        { path: 'tasks/:id/edit', element: <TaskEditPage /> },

        
      

        
      ]
    },

  
  ]
},
    




  



  // مسیر جدا برای لاگین بدون layout
  {
    path: '/login',
    element: <LoginPage />,
  },
  // مسیر جدا برای رجیستر بدون layout
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
];

export default routes;