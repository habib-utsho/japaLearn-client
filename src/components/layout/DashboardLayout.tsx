import React from "react";
import { Button, Layout, Menu, Skeleton } from "antd";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import logo from "../../assets/img/logo.png";
import FromTop from "../helpingCompo/FromTop";
import { signOut } from "../../redux/features/authSlice";
const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);

  return (
    <>
      <Header className="h-auto px-0">
        <Menu
          mode="horizontal"
          theme="light"
          className="px-6 bg-primary text-white"
        >
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-2">
              <Link
                to={"/lessons"}
                className="text-black font-semibold flex items-center gap-1 pr-2"
              >
                <img src={logo} alt="Japalearn" className="w-[50px] h-auto" />
              </Link>
            </div>

            {isAuthLoading ? (
              <Skeleton.Button
                active
                className="!h-8 !w-[150px] bg-primary-2 rounded"
              />
            ) : (
              user && (
                <Button onClick={() => dispatch(signOut())} type="default">
                  Sign out
                </Button>
              )
            )}
          </div>
        </Menu>
      </Header>

      <Layout className="min-h-screen">
        <Sidebar />

        <Layout
          // style={{
          //   marginLeft: 200,
          // }}
          className="min-h-screen"
        >
          <FromTop>
            <Content
              style={{ margin: "24px 16px 0" }}
              className="bg-white rounded-lg shadow p-5"
            >
              <Outlet />
            </Content>
          </FromTop>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
