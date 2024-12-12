import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  useDeleteTutorialByIdMutation,
  useGetAllTutorialsQuery,
} from "../../../../redux/api/tutorialApi";
import { TTutorial } from "../../../../types/tutorial.type";
import { TQueryParam, TResponse } from "../../../../types/index.type";
import TutorialModal from "../../../../components/modal/dashboard/TutorialModal";
import { TLesson } from "../../../../types/lesson.type";

const { Search } = Input;

const Tutorials = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [params] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingTutorial, setEditingTutorial] =
    useState<Partial<TTutorial> | null>(null);
  const {
    data: tutorials,
    isLoading: isLoadingTutorials,
    isFetching: isFetchingTutorials,
  } = useGetAllTutorialsQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const [deleteTutorial] = useDeleteTutorialByIdMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Tutorial Title",
      dataIndex: "title",
    },
    {
      title: "Link",
      dataIndex: "link",
    },
    {
      title: "Lesson",
      dataIndex: "lesson",
      render: (lesson: TLesson) => (
        <div>
          {lesson.name} - {lesson.number}
        </div>
      ),
    },
    {
      title: "Actions",
      render: (_: TTutorial, record: TTutorial) => {
        return (
          <div className="flex gap-2">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setModalVisible(true);
                setEditingTutorial(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the tutorial"
              description="Are you sure to delete this tutorial?"
              onConfirm={() => handleDeleteTutorial(record._id)}
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

  const handleDeleteTutorial = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteTutorial(
        id
      ).unwrap()) as TResponse<TTutorial>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete tutorial!"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Tutorials</h2>

        <Search
          placeholder="Search tutorial"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add Tutorial
        </Button>
      </div>

      {isLoadingTutorials ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : tutorials?.meta?.total === 0 ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Empty description="No tutorials found!" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={tutorials?.data}
          loading={isLoadingTutorials || isFetchingTutorials}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          pagination={{
            position: ["bottomCenter"],
            total: tutorials?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Create Tutorial modal*/}
      <TutorialModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        editingTutorial={editingTutorial}
        setEditingTutorial={setEditingTutorial}
      />
    </div>
  );
};

export default Tutorials;
