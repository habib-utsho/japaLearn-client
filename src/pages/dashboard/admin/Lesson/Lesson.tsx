import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  useDeleteLessonByIdMutation,
  useGetAllLessonsQuery,
} from "../../../../redux/api/lessonApi";
import {  TLesson } from "../../../../types/lesson.type";
import { TQueryParam, TResponse } from "../../../../types/index.type";
import LessonModal from "../../../../components/modal/dashboard/LessonModal";

const { Search } = Input;

const Lessons = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [params] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingLesson, setEditingLesson] = useState<Partial<TLesson> | null>(
    null
  );
  const {
    data: lessons,
    isLoading: isLoadingLessons,
    isFetching: isFetchingLessons,
  } = useGetAllLessonsQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),

    ...params,
  ]);
  const [deleteLesson] = useDeleteLessonByIdMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Lesson",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Vocabulary Count",
      dataIndex: "vocabularyCount",
    },
    {
      title: "Actions",
      render: (_: TLesson, record: TLesson) => {
        return (
          <div className="flex gap-2">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setModalVisible(true);
                setEditingLesson(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the lesson"
              description="Are you sure to delete this lesson?"
              onConfirm={() => handleDeleteLesson(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                loading={isLoadingDeleteId === record._id.toString()}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteLesson = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteLesson(id).unwrap()) as TResponse<TLesson>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete lesson!"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Lessons</h2>

        <Search
          placeholder="Search lesson"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add lesson
        </Button>
      </div>

      {isLoadingLessons ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : lessons?.meta?.total === 0 ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Empty description="No lessons found!" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={lessons?.data}
          loading={isLoadingLessons || isFetchingLessons}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          pagination={{
            position: ["bottomCenter"],
            total: lessons?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Create lessons modal*/}
      <LessonModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        editingLesson={editingLesson}
        setEditingLesson={setEditingLesson}
      />
    </div>
  );
};

export default Lessons;
