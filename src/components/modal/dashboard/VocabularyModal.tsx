import { Button, Form, message, Modal } from "antd";
import React, { useEffect } from "react";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";
import { useGetAllLessonsQuery } from "../../../redux/api/lessonApi";
import { TVocabulary } from "../../../types/vocabulary.type";
import {
  useCreateVocabularyMutation,
  useUpdateVocabularyMutation,
} from "../../../redux/api/vocabularyApi";
import { TLesson } from "../../../types/lesson.type";
import { useAppSelector } from "../../../redux/hook";

type TProps = {
  open: boolean;
  editingVocabulary: Partial<TVocabulary> | null;
  setEditingVocabulary: React.Dispatch<
    React.SetStateAction<Partial<TVocabulary> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const VocabularyModal = ({
  open,
  editingVocabulary,
  setEditingVocabulary,
  setModalVisible,
}: TProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [createVocabulary, { isLoading: isLoadingCreateVocabulary }] =
    useCreateVocabularyMutation();
  const [updateVocabulary, { isLoading: isLoadingUpdateVocabulary }] =
    useUpdateVocabularyMutation();
  const { data: lessons, isLoading: isLoadingLessons } = useGetAllLessonsQuery([
    { name: "limit", value: 1500 },
  ]);

  useEffect(() => {
    if (editingVocabulary) {
      form.setFieldsValue(editingVocabulary);
    }
  }, [editingVocabulary, form]);

  const handleCreateVocabulary = async (values: TVocabulary) => {
    try {
      const result = (await createVocabulary({
        ...values,
        adminEmail: user?.email,
      }).unwrap()) as TResponse<TVocabulary>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingVocabulary(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message ||
          e?.data?.errorSources?.[0]?.message ||
          e?.message ||
          "Failed to add vocabulary!"
      );
    }
  };

  const handleUpdateVocabulary = async (values: TVocabulary) => {
    try {
      const result = (await updateVocabulary({
        id: editingVocabulary?._id,
        body: {
          ...values,
        },
      }).unwrap()) as TResponse<TVocabulary>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingVocabulary(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to update vocabulary!"
      );
    }
  };

  return (
    <Modal
      title={editingVocabulary ? "Update Vocabulary" : "Create Vocabulary"}
      open={open || !!editingVocabulary}
      onCancel={() => {
        form.resetFields();
        setModalVisible(false);
        setEditingVocabulary(null);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={
          editingVocabulary ? handleUpdateVocabulary : handleCreateVocabulary
        }
      >
        {/* Word */}
        <MyInp
          name="word"
          rules={[{ required: true, message: "Word is required!" }]}
          label="Word"
          placeholder="Please input the word"
          type="text"
          size="large"
        />
        {/* Meaning */}
        <MyInp
          name="meaning"
          rules={[{ required: true, message: "Meaning is required!" }]}
          label="Meaning"
          placeholder="Please input the meaning"
          type="text"
          size="large"
        />
        {/* Pronunciation */}
        <MyInp
          name="pronunciation"
          rules={[{ required: true, message: "Pronunciation is required!" }]}
          label="Pronunciation"
          placeholder="Please input the pronunciation"
          type="text"
          size="large"
        />
        {/* When To Say */}
        <MyInp
          name="whenToSay"
          rules={[{ required: true, message: "When to say is required!" }]}
          label="When To Say"
          placeholder="Please input when to say this word"
          type="text"
          size="large"
        />
        {/* Lesson Number */}
        <MyInp
          name="lessonNumber"
          rules={[{ required: true, message: "Lesson is required!" }]}
          label="Lesson"
          placeholder="Please select a lesson"
          type="select"
          size="large"
          disabled={isLoadingLessons}
          options={lessons?.data?.map((lesson: TLesson) => ({
            label: lesson.name,
            value: lesson.number,
          }))}
        />
        <Button
          type="primary"
          loading={
            isLoadingCreateVocabulary ||
            isLoadingUpdateVocabulary ||
            isLoadingLessons
          }
          disabled={lessons?.meta?.total === 0}
          htmlType="submit"
          block
          size="large"
        >
          {editingVocabulary ? "Update Vocabulary" : "Create Vocabulary"}
        </Button>

        {lessons?.meta?.total === 0 && (
          <p className="text-red-500 text-center mt-2">
            *You need to create a lesson first!
          </p>
        )}
      </Form>
    </Modal>
  );
};

export default VocabularyModal;
