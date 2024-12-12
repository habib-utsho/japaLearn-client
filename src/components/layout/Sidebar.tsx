import { Layout, Menu } from "antd";
import React, { ReactNode, useState } from "react";
import { adminPaths } from "../../routes/paths/adminPaths";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { useAppSelector } from "../../redux/hook";
import { role } from "../../constant/index.constant";
import { userPaths } from "../../routes/paths/userPaths";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

const { Sider } = Layout;

type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

const Sidebar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { name, profileImg, email } = user || {};
  const [collapsed, setCollapsed] = useState(false);

  let sidebarItems: TSidebarItems[] = [];
  if (user?.role === role.ADMIN) {
    sidebarItems = sidebarItemsGenerator(adminPaths, user?.role);
  }
  if (user?.role === role.USER) {
    sidebarItems = sidebarItemsGenerator(userPaths, user?.role);
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      // collapsedWidth="0"
      // width={250}
      className="!h-screen !sticky !top-0"
      theme="dark"
    >
      <div className="demo-logo-vertical" />
      <div className="mb-6 space-y-2 mt-4 mx-3">
        <img
          src={profileImg}
          alt={name}
          className="w-full rounded-md h-[150px]"
        />
        {!collapsed && (
          <h2 className="text-slate-200 hidden lg:block">
            <MailOutlined /> {email}
          </h2>
        )}
        {!collapsed && (
          <p className="text-slate-200 hidden lg:block">
            <UserOutlined /> {name}
          </p>
        )}
      </div>

      <Menu
        // onClick={({ key }) => {
        //   key ? navigate(key) : navigate("/dashboard");
        // }}
        theme="dark"
        // defaultSelectedKeys={["Dashboard"]}
        mode="inline"
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
