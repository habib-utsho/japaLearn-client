import {
  BookOutlined,
  DashboardOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import User from "../../pages/dashboard/admin/UserManagement/User";
import DashboardHome from "../../pages/dashboard/admin/DashboardHome/DashboardHome";
import Lessons from "../../pages/dashboard/admin/Lesson/Lesson";
import Vocabulary from "../../pages/dashboard/admin/Vocabulary/Vocabulary";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <DashboardHome />,
    icon: <DashboardOutlined />,
  },
  {
    name: "Users",
    icon: <UserOutlined />,
    children: [
      {
        name: "Users",
        path: "users",
        element: <User />,
        icon: <UserOutlined />,
      },
    ],
  },
  {
    name: "Lessons",
    icon: <ReadOutlined />,
    children: [
      {
        name: "Lessons",
        path: "lessons",
        element: <Lessons />,
        icon: <ReadOutlined />,
      },
    ],
  },
  {
    name: "Vocabulary",
    icon: <BookOutlined />,
    children: [
      {
        name: "Vocabulary",
        path: "vocabulary",
        element: <Vocabulary />,
        icon: <BookOutlined />,
      },
    ],
  },
];
