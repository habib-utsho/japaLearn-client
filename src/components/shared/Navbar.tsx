import { Menu, Dropdown, Skeleton, Button } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ReadOutlined,
  BookOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { signOut } from "../../redux/features/authSlice";
import Container from "../ui/Container";

const Navbar = () => {
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const authenticatedRoutes = [
    {
      key: "1",
      label: <Link to={`/${user?.role}/dashboard`}>Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    // {
    //   key: "2",
    //   label: <Link to={`/${user?.role}/dashboard/profile`}>My profile</Link>,
    //   icon: <UserOutlined />,
    // },
    {
      key: "4",
      label: "Sign Out",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(signOut()),
    },
  ];

  const rightMenu = (
    <Menu
      mode="horizontal"
      // style={{
      //   backgroundColor: "#FEFEFF",
      //   borderRadius: "6px",
      //   border: "0",
      // }}
      className="py-1 rounded-md justify-end px-2 bg-slate-900 text-white items-center h-full"
    >
      {isAuthLoading ? (
        <div className="flex items-center justify-center w-[70px] pr-[25px]">
          <Skeleton.Button active className="!h-6 !w-10" />
        </div>
      ) : user && user.role === "admin" ? (
        <Dropdown
          menu={{ items: authenticatedRoutes }}
          placement="bottom"
          overlayStyle={{ zIndex: 5000001, paddingTop: "22px" }}
          //  overlayClassName="custom-dropdown"
        >
          <Menu.Item
            key="account"
            icon={<UserOutlined className="!text-white" />}
          >
            <span className="!text-white">Account</span>
          </Menu.Item>
        </Dropdown>
      ) : user && user.role === "user" ? (
        <Button
          icon={<LogoutOutlined className="!text-white" />}
          type="text"
          onClick={() => dispatch(signOut())}
          className="!text-white"
        >
          Sign Out
        </Button>
      ) : (
        <Button
          href="/signin"
          icon={<LoginOutlined className="!text-white" />}
          type="text"
          onClick={() => dispatch(signOut())}
          className="!text-white"
        >
          Sign In
        </Button>
      )}
    </Menu>
  );

  const menu = [
    {
      key: "/lessons",
      label: (
        <Link to={`/lessons`} className="!text-white">
          Lessons
        </Link>
      ),
      icon: <ReadOutlined className="!text-white" />,
    },
    {
      key: "/tutorials",
      label: (
        <Link to={`/tutorials`} className="!text-white">
          Tutorials
        </Link>
      ),
      icon: <BookOutlined className="!text-white" />,
    },
  ];

  return (
    <>
      <section className="shadow-sm  py-1 sticky top-0 !z-[5000000] bg-slate-900 bg-opacity-90 border-b border-slate-700">
        <Container>
          <div className="flex justify-between flex-wrap">
            <Link to="/" className="navbar-left">
              <img src={logo} alt="Logo" style={{ height: "50px" }} />
            </Link>
            <div>
              <Menu
                items={menu}
                mode="horizontal"
                className="py-1 rounded-md justify-end px-2 bg-slate-800 !text-white"
                selectedKeys={[pathname]}
              />
            </div>
            <div className="mx-auto sm:mx-0 ">{rightMenu}</div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Navbar;
