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
  useDeleteVocabularyByIdMutation,
  useGetAllVocabulariesQuery,
} from "../../../../redux/api/vocabularyApi";
import { TVocabulary } from "../../../../types/vocabulary.type";
import { TQueryParam, TResponse } from "../../../../types/index.type";
import VocabularyModal from "../../../../components/modal/dashboard/VocabularyModal";
import MyInp from "../../../../components/ui/Form/MyInp";
import { useGetAllLessonsQuery } from "../../../../redux/api/lessonApi";
import { TLesson } from "../../../../types/lesson.type";

const { Search } = Input;

const Vocabulary = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [activeFilterLesson, setActiveFilterLesson] = useState<string | null>(
    null
  );

  const [params] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingVocabulary, setEditingVocabulary] =
    useState<Partial<TVocabulary> | null>(null);
  const {
    data: vocabularies,
    isLoading: isLoadingVocabularies,
    isFetching: isFetchingVocabularies,
  } = useGetAllVocabulariesQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(activeFilterLesson
      ? [{ name: "lessonNumber", value: activeFilterLesson }]
      : []),
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const { data: lessons, isLoading: isLoadingLessons } = useGetAllLessonsQuery([
    { name: "limit", value: 1500 },
  ]);
  const [deleteVocabulary] = useDeleteVocabularyByIdMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Word",
      dataIndex: "word",
    },
    {
      title: "Meaning",
      dataIndex: "meaning",
    },
    {
      title: "When to Say",
      dataIndex: "whenToSay",
    },
    {
      title: "Pronunciation",
      dataIndex: "pronunciation",
    },
    {
      title: "Lesson No.",
      dataIndex: "lessonNumber",
    },
    {
      title: "Actions",
      render: (_: TVocabulary, record: TVocabulary) => {
        return (
          <div className="flex gap-2">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setModalVisible(true);
                setEditingVocabulary(record);
              }}
            />
            <Popconfirm
              title="Delete the vocabulary"
              description="Are you sure to delete this vocabulary?"
              onConfirm={() => handleDeleteVocabulary(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                loading={isLoadingDeleteId === record._id.toString()}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteVocabulary = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteVocabulary(
        id
      ).unwrap()) as TResponse<TVocabulary>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete vocabulary!"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Vocabularies</h2>

        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add Vocabulary
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <Search
          placeholder="Search by word, pronunciation and meaning"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
        <div className="!w-[230px]">
          <MyInp
            type="select"
            label=""
            placeholder="Filter by lesson"
            name={""}
            size="large"
            className="!mb-0 w-full"
            inpClassName="w-full"
            onChange={(value) => {
              setActiveFilterLesson(value);
              setPagination({ page: 1, limit: 10 });
            }}
            disabled={isLoadingLessons}
            options={lessons?.data?.map((lesson: TLesson) => ({
              label: `${lesson.name} - ${lesson.number}`,
              value: lesson.number,
            }))}
          />
        </div>
        <span
          className="text-red-500 cursor-pointer text-lg"
          onClick={() => {
            setActiveFilterLesson(null);
            setSearchTerm(null);
          }}
        >
          X
        </span>
      </div>

      {isLoadingVocabularies ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : vocabularies?.meta?.total === 0 ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Empty description="No vocabularies found!" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={vocabularies?.data}
          loading={isLoadingVocabularies || isFetchingVocabularies}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          pagination={{
            position: ["bottomCenter"],
            total: vocabularies?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Vocabulary Modal */}
      <VocabularyModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        editingVocabulary={editingVocabulary}
        setEditingVocabulary={setEditingVocabulary}
      />
    </div>
  );
};

export default Vocabulary;
