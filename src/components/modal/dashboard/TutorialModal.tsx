import { Button, Form, message, Modal } from "antd";
import React, { useEffect } from "react";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";
import {
  useCreateTutorialMutation,
  useUpdateTutorialMutation,
} from "../../../redux/api/tutorialApi";
import { TTutorial } from "../../../types/tutorial.type";
import { useGetAllLessonsQuery } from "../../../redux/api/lessonApi";
import { TLesson } from "../../../types/lesson.type";

type TProps = {
  open: boolean;
  editingTutorial: Partial<TTutorial> | null;
  setEditingTutorial: React.Dispatch<
    React.SetStateAction<Partial<TTutorial> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TutorialModal = ({
  open,
  editingTutorial,
  setEditingTutorial,
  setModalVisible,
}: TProps) => {
  const [form] = Form.useForm();
  const [createTutorial, { isLoading: isLoadingCreateTutorial }] =
    useCreateTutorialMutation();
  const [updateTutorial, { isLoading: isLoadingUpdateTutorial }] =
    useUpdateTutorialMutation();
  const { data: lessons, isLoading: isLoadingLessons } = useGetAllLessonsQuery([
    { name: "limit", value: 1500 },
  ]);

  useEffect(() => {
    if (editingTutorial) {
      form.setFieldsValue({
        ...editingTutorial,
        lesson: editingTutorial?.lesson?._id,
      });
    }
  }, [editingTutorial, form]);

  console.log(editingTutorial, "editingTutorial");

  const handleCreateTutorial = async (values: TTutorial) => {
    try {
      const result = (await createTutorial({
        ...values,
      }).unwrap()) as TResponse<TTutorial>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingTutorial(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message ||
          e?.data?.errorSources?.[0]?.message ||
          e?.message ||
          "Failed to add tutorial!"
      );
    }
  };

  const handleUpdateTutorial = async (values: TTutorial) => {
    try {
      const result = (await updateTutorial({
        id: editingTutorial?._id,
        body: {
          ...values,
        },
      }).unwrap()) as TResponse<TTutorial>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingTutorial(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to update tutorial!"
      );
    }
  };

  return (
    <Modal
      title={editingTutorial ? "Update Tutorial" : "Create Tutorial"}
      open={open || !!editingTutorial}
      onCancel={() => {
        form.resetFields();
        setModalVisible(false);
        setEditingTutorial(null);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={editingTutorial ? handleUpdateTutorial : handleCreateTutorial}
      >
        {/* Title */}
        <MyInp
          name="title"
          rules={[{ required: true, message: "Title is required!" }]}
          label="Tutorial Title"
          placeholder="Please input tutorial title"
          type="text"
          size="large"
        />
        {/* Link */}
        <MyInp
          name="link"
          rules={[{ required: true, message: "Link is required!" }]}
          label="Tutorial Link"
          placeholder="Please input tutorial link"
          type="text"
          size="large"
        />
        {/* Lesson */}
        <MyInp
          name="lesson"
          rules={[{ required: true, message: "Lesson is required!" }]}
          label="Lesson"
          placeholder="Please select a lesson"
          type="select"
          size="large"
          options={lessons?.data?.map((lesson: TLesson) => ({
            label: lesson.name,
            value: lesson._id,
          }))}
          disabled={isLoadingLessons}
        />

        {/* Description */}
        <MyInp
          name="description"
          label="Description (optional)"
          placeholder="Please input tutorial description"
          type="textarea"
          size="large"
        />
        <Button
          type="primary"
          loading={isLoadingCreateTutorial || isLoadingUpdateTutorial}
          htmlType="submit"
          block
          size="large"
        >
          {editingTutorial ? "Update Tutorial" : "Create Tutorial"}
        </Button>
      </Form>
    </Modal>
  );
};

export default TutorialModal;
