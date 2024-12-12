import { useState, useEffect } from "react";
import { Button, Form, message, Upload, UploadFile } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEditProfileMutation } from "../../redux/features/auth/authApi";
import Container from "../../components/ui/Container";
import MyInp from "../../components/ui/Form/MyInp";
import { UploadOutlined } from "@ant-design/icons";
import { TUser } from "../../types/index.type";
import { setUser } from "../../redux/features/auth/authSlice";

const EditProfile = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateProfileForm] = Form.useForm();
  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useEditProfileMutation();
  const dispatch = useAppDispatch();

  const { _id, name, phone, email, address, img } = user || {};
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    updateProfileForm.setFieldsValue({
      name,
      email,
      phone,
      address,
      img,
    });

    if (img) {
      setFileList([
        {
          uid: "-1",
          name: "profile_image",
          status: "done",
          url: img,
        },
      ]);
    }
  }, [name, phone, address, updateProfileForm, name, email]);

  const handleUpdateProfile = async (values: TUser) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    try {
      const result = await updateProfile({
        id: _id as string,
        payload: formData,
      }).unwrap();
      dispatch(setUser({ token: token, user: result?.data }));
      message.success(result?.message);
      setIsEditMode(false);
    } catch (e: any) {
      message.error(e?.message || e?.data?.message);
    }
  };

  return (
    <div>
      <Container className="py-8">
        {!isEditMode ? (
          <div className="profile-view bg-white my-shadow-1 p-4 rounded-md max-w-md md:max-w-xl mx-auto">
            <h2 className="text-gray-900 font-semibold text-lg md:text-xl text-center my-4">
              Profile
            </h2>
            <div className="text-center mb-4">
              <img
                src={img || "/default-profile.png"}
                alt="Profile"
                className="rounded-full w-32 h-32 mx-auto"
              />
            </div>
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone:</strong> {phone}
              </p>
              <p>
                <strong>Address:</strong> {address}
              </p>
            </div>
            <Button
              type="primary"
              block
              onClick={() => setIsEditMode(true)}
              className="mt-4"
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <Form
            form={updateProfileForm}
            name="update-profile"
            onFinish={handleUpdateProfile}
            layout="vertical"
            className="bg-white my-shadow-1 p-4 rounded-md max-w-md md:max-w-xl mx-auto"
          >
            <h2 className="text-gray-900 font-semibold text-xl text-center my-4">
              Update Profile
            </h2>
            <Form.Item
              label="Profile Image"
              valuePropName="fileList"
              className="mb-6"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
                customRequest={({ file, onSuccess }) =>
                  setTimeout(
                    // @ts-ignore
                    () => onSuccess?.({ url: URL.createObjectURL(file) }, file),
                    1000
                  )
                }
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
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
            <MyInp
              type="text"
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
              placeholder="Enter name here"
            />
            <MyInp type="email" label="Email" name="email" disabled />
            <MyInp
              type="text"
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
              placeholder="Enter phone number here"
            />
            <MyInp
              type="text"
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
              placeholder="Enter address here"
            />
            <Form.Item>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
                loading={isLoadingUpdateProfile}
              >
                Update profile
              </Button>
            </Form.Item>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default EditProfile;
