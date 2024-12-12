import { Layout, Menu } from "antd";
import React, { ReactNode } from "react";
import { adminPaths } from "../../routes/paths/adminPaths";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { useAppSelector } from "../../redux/hook";
import { role } from "../../constant/index.constant";
import { userPaths } from "../../routes/paths/userPaths";
import { MailFilled, UserOutlined } from "@ant-design/icons";
import { useGetMeQuery } from "../../redux/api/authApi";

const { Sider } = Layout;

type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

const Sidebar: React.FC = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const { name, profileImg, email } = user || {};

  const { data: meData } = useGetMeQuery(token as string);

  console.log(meData, "meData");

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
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="!h-screen !sticky !top-0"
    >
      <div className="demo-logo-vertical" />
      <div className="mb-6 space-y-2 mt-4 mx-3">
        <img
          src={profileImg}
          alt={name}
          className="w-full rounded-md h-[150px]"
        />
        <h2 className="text-slate-200">
          <MailFilled /> {email}
        </h2>
        <p className="text-slate-200">
          <UserOutlined /> {name}
        </p>
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
