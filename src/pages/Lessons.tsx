import { useState } from "react";
import Container from "../components/ui/Container";
import { useGetAllLessonsQuery } from "../redux/api/lessonApi";
import { TLesson } from "../types/lesson.type";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Empty, Pagination, Skeleton } from "antd";
import { Link } from "react-router-dom";
import MyMotion from "../components/helpingCompo/MyMotion";

const Lessons = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const { data: lessons, isLoading: isLoadingLessons } = useGetAllLessonsQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
  ]);
  return (
    <div className="py-4">
      <Container className="">
        <h2 className="font-semibold text-2xl md:text-4xl text-center">
          Lessons
        </h2>

        <div className="my-4">
          {isLoadingLessons ? (
            <div className="flex flex-col gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton.Button
                  key={i}
                  active
                  className="!w-full !h-[78px] bg-gray-800 !rounded-lg"
                />
              ))}
            </div>
          ) : lessons.meta.total === 0 ? (
            <Empty description="No lessons found" />
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                {lessons?.data.map((lesson: TLesson, ind: number) => (
                  <MyMotion x={ind % 2 === 0 ? 50 : -50}>
                    <Link
                      to={`/lessons/${lesson.number}`}
                      key={lesson._id}
                      className="group transition-all duration-500 flex justify-between items-center p-4 shadow shadow-slate-600 hover:shadow-slate-800 rounded-lg cursor-pointer"
                    >
                      <div className="space-y-1">
                        {lesson.name}
                        <span className="text-gray-500 text-sm">
                          {" "}
                          - Lesson {lesson.number}
                        </span>
                        <p className="text-gray-500 text-sm mb-0">
                          {" "}
                          - {lesson.vocabularyCount} Vocabulary
                        </p>
                      </div>
                      <span className="h-10 w-10 bg-primary transition-all duration-500 rounded-full flex items-center justify-center group-hover:translate-x-1">
                        <ArrowRightOutlined />
                      </span>
                    </Link>
                  </MyMotion>
                ))}
              </div>

              {lessons?.meta?.total >= 10 && (
                <div className="text-center">
                  <Pagination
                    total={lessons?.meta?.total}
                    current={pagination.page}
                    pageSize={pagination.limit}
                    onChange={(page, pageSize) => {
                      setPagination({ page, limit: pageSize });
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Lessons;
