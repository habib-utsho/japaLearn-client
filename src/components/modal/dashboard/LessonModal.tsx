import { Button, Form, message, Modal } from "antd";
import React, { useEffect } from "react";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from "../../../redux/api/lessonApi";
import { TCreateLesson, TLesson } from "../../../types/lesson.type";

type TProps = {
  open: boolean;
  editingLesson: Partial<TLesson> | null;
  setEditingLesson: React.Dispatch<
    React.SetStateAction<Partial<TLesson> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LessonModal = ({
  open,
  editingLesson,
  setEditingLesson,
  setModalVisible,
}: TProps) => {
  const [form] = Form.useForm();
  const [createLesson, { isLoading: isLoadingCreateLesson }] =
    useCreateLessonMutation();
  const [updateLesson, { isLoading: isLoadingUpdateLesson }] =
    useUpdateLessonMutation();

  useEffect(() => {
    if (editingLesson) {
      form.setFieldsValue(editingLesson);
    }
  }, [editingLesson, form]);

  const handleCreateSlot = async (values: TCreateLesson) => {
    try {
      const result = (await createLesson({
        ...values,
      }).unwrap()) as TResponse<TLesson>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingLesson(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message ||
          e?.data?.errorSources?.[0]?.message ||
          e?.message ||
          "Failed to add lesson!"
      );
    }
  };
  const handleUpdateSlot = async (values: TCreateLesson) => {
    try {
      const result = (await updateLesson({
        id: editingLesson?._id,
        body: {
          ...values,
        },
      }).unwrap()) as TResponse<TLesson>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingLesson(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to update lesson!"
      );
    }
  };

  return (
    <Modal
      title={editingLesson ? "Update Lesson" : "Create Lesson"}
      open={open || !!editingLesson}
      onCancel={() => {
        form.resetFields();
        setModalVisible(false);
        setEditingLesson(null);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={editingLesson ? handleUpdateSlot : handleCreateSlot}
      >
        {/* Name */}
        <MyInp
          name="name"
          rules={[{ required: true, message: "Name is required!" }]}
          label="Lesson Name"
          placeholder="Please input lesson name"
          type="text"
          size="large"
        />
        {/* Number */}
        <MyInp
          name="number"
          rules={[{ required: true, message: "Lesson number is required!" }]}
          label="Lesson Number"
          placeholder="Please input lesson number (1, 2, 3, ...)"
          type="number"
          size="large"
        />
        <Button
          type="primary"
          loading={isLoadingCreateLesson || isLoadingUpdateLesson}
          htmlType="submit"
          block
          size="large"
        >
          {editingLesson ? "Update Lesson" : "Create Lesson"}
        </Button>
      </Form>
    </Modal>
  );
};

export default LessonModal;
