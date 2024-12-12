import { Button, Form, message, Upload, UploadFile } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import MyInp from "../components/ui/Form/MyInp";
import { useSignupMutation } from "../redux/api/authApi";

const Signup = () => {
  const navigate = useNavigate();
  const [signupForm] = Form.useForm();
  const [createUser, { isLoading: isSignupLoading }] = useSignupMutation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSignup = async (data: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Append image file if present
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    try {
      const result = await createUser(formData).unwrap();
      if (result?.success) {
        message.success({
          content: result?.message || "Signup successful",
        });
        navigate("/signin");
      } else {
        message.error({
          content: result?.message || "Signup failed",
        });
      }
    } catch (error: any) {
      message.error({
        content: error?.message || error?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <>
      <section className="min-h-screen py-4 flex mx-auto justify-center items-center">
        <div className="p-8 md:p-10 shadow shadow-primary/30 bg-slate-800  rounded-md w-5/6 sm:w-4/6 md:3/6 lg:w-2/6">
          <p className="text-gray-00 text-xl text-center my-4">
            Signup to <strong className="my-text-gradient-1">Japalearn</strong>
          </p>
          <Form
            form={signupForm}
            name="signup"
            onFinish={handleSignup}
            layout="vertical"
            className="mt-2 text-white myDarkForm"
          >
            {/* Profile Image Upload */}
            <Form.Item
              label={<span className="text-white">Profile Image</span>}
              valuePropName="fileList"
              className="mb-6"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                className="!text-slate-300"
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
                // @ts-ignore
                customRequest={({ file, onSuccess, onError }) => {
                  setTimeout(() => {
                    // @ts-ignore
                    onSuccess({ url: URL.createObjectURL(file) }, file);
                  }, 1000);
                }}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                }}
                accept="image/*"
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <UploadOutlined />
                    <div>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            {/* Name */}
            <MyInp
              type="text"
              label={<span className="text-white">Name</span>}
              name="name"
              inpClassName="!border-none !bg-slate-900 placeholder:!text-slate-300 !text-white"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
              placeholder="Enter name here"
            />

            {/* Email */}
            <MyInp
              type="email"
              label={<span className="text-white">Email</span>}
              name="email"
              inpClassName="!border-none !bg-slate-900 placeholder:!text-slate-300 !text-white"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
              placeholder="Enter email here"
            />

            {/* Password */}
            <MyInp
              type="password"
              label={<span className="text-white">Password</span>}
              name="password"
              inpClassName="!border-none !bg-slate-900 placeholder:!text-slate-300 !text-white"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
              placeholder="Enter password here"
            />

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={isSignupLoading}
              >
                Signup
              </Button>
            </Form.Item>

            <p className="mt-2 flex gap-1 items-center text-slate-300">
              Already have an account?{" "}
              <Link to={"/signin"}>
                <Button
                  type="default"
                  className="!bg-transparent !text-primary"
                >
                  Signin
                </Button>
              </Link>
            </p>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Signup;
