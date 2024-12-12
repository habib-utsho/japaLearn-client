import {
  Button,
  Divider,
  Form,
  FormProps,
  message,
  Table,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import verifyJwtToken from "../utils/verifyJwtToken";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { TDecodedUser } from "../types/index.type";
import MyInp from "../components/ui/Form/MyInp";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSigninMutation } from "../redux/api/authApi";
import { setUser } from "../redux/features/authSlice";

type TSigninFieldType = {
  email?: string;
  password?: string;
};

const columns = [
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "password",
    title: "Password",
    dataIndex: "password",
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
  },
];

const signinData = [
  {
    email: "nolan@gmail.com",
    password: "1234@@aA",
    role: "admin",
  },
  {
    email: "utsho926@gmail.com",
    password: "1234@@aA",
    role: "user",
  },
];

const Signin = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { token, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { role } = (user as TDecodedUser) || {};

  if (token) {
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "user") return <Navigate to="/lessons" replace />;
  }

  const handleSignin: FormProps<TSigninFieldType>["onFinish"] = async (
    data
  ) => {
    try {
      const result = await signin(data).unwrap();
      if (result.success) {
        const user = verifyJwtToken(result?.data?.accessToken) as TDecodedUser;
        dispatch(setUser({ token: result.data?.accessToken, user: user }));
        message.success(result?.message);
        if (user.role === "admin") navigate("/admin/dashboard");
        if (user.role === "user") navigate("/lessons");
      }
    } catch (e: any) {
      message.error(e?.message || e?.data?.message);
    }
  };

  // Row click handler to populate the form
  const onRowClick = (record: TSigninFieldType) => {
    form.setFieldsValue({
      email: record.email,
      password: record.password,
    });
  };

  return (
    <section className="min-h-screen py-4 flex mx-auto justify-center items-center">
      <div className="p-8 md:p-10 shadow shadow-primary/30 bg-slate-800  rounded-md w-5/6 sm:w-4/6 md:3/6 lg:w-2/6">
        <Typography.Title level={3} className="!mb-0 !text-white">
          Japalearn
        </Typography.Title>
        <Typography.Text type="secondary" className="!text-slate-200">
          To learn japanese vocabulary
        </Typography.Text>
        <Form
          onFinish={handleSignin}
          // initialValues={{ remember: true }}
          // autoComplete="off"
          form={form}
          layout="vertical"
          className="mt-2 myDarkForm"
        >
          <MyInp
            type="text"
            name="email"
            label={<span className="text-white">Email</span>}
            size="large"
            prefix={<UserOutlined />}
            inpClassName="!border-none !bg-slate-900 placeholder:!text-slate-300 !text-white"
            placeholder="Input your email"
            rules={[
              {
                required: true,

                message: "email is required!",
              },
            ]}
          />
          <MyInp
            type="password"
            name="password"
            label={<span className="text-white">Password</span>}
            size="large"
            inpClassName="!border-none !bg-slate-900 placeholder:!text-slate-300 !text-white"
            prefix={<LockOutlined />}
            placeholder="Input your password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full !mt-8"
            loading={isLoading}
          >
            Sign in
          </Button>
        </Form>

        {/* Forgot pass and signup */}
        <div className="flex flex-wrap justify-between gap-2 mt-2">
          <p className="mt-2 flex gap-1 items-center">
            New here?{" "}
            <Link to={"/signup"}>
              <Button type="default" className="!bg-transparent !text-primary">
                Signup
              </Button>
            </Link>{" "}
          </p>

          <p className="mt-2 flex gap-1 items-center">
            <Link
              to={"/signin?forgot-password=true"}
              className="hover:text-primary-2"
            >
              Forgot password?
            </Link>{" "}
          </p>

          <Divider />
          <div className="w-full shadow bg-slate-800 rounded ">
            <Table
              columns={columns}
              dataSource={signinData}
              pagination={false}
              size="large"
              onRow={(record) => ({
                onClick: () => onRowClick(record),
                className: "cursor-pointer ",
              })}
              scroll={{ x: 240 }}
              className="dark-table"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
