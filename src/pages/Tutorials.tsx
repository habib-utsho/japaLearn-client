import { useState } from "react";
import Container from "../components/ui/Container";
import { useGetAllTutorialsQuery } from "../redux/api/tutorialApi";
import { Card, Empty, Skeleton, Pagination } from "antd";
import ReactPlayer from "react-player";
import { TTutorial } from "../types/tutorial.type";
import MyMotion from "../components/helpingCompo/MyMotion";

const Tutorials = () => {
  const [pagination, setPagination] = useState({ limit: 12, page: 1 });

  const {
    data: tutorials,
    isLoading: isLoadingTutorials,
    isFetching: isFetchingTutorials,
  } = useGetAllTutorialsQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
  ]);

  return (
    <div className="py-6 pb-8">
      <Container>
        <h2 className="font-semibold text-2xl md:text-4xl text-center">
          Tutorials
        </h2>

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoadingTutorials || isFetchingTutorials ? (
            [...Array(12)].map((_, i) => (
              <Skeleton.Button
                key={i}
                active
                className="!w-full !h-[373px] bg-gray-800 !rounded-lg"
              />
            ))
          ) : tutorials?.meta?.total === 0 ? (
            <Empty description="No tutorials found" />
          ) : (
            <>
              {tutorials?.data.map((tutorial: TTutorial, ind: number) => (
                <MyMotion x={ind % 2 === 0 ? 50 : -50}>
                  <Card
                    key={tutorial._id}
                    className="transition-all duration-500  border-slate-700 bg-transparent text-white p-0 h-full"
                    cover={
                      <ReactPlayer
                        url={tutorial.link}
                        width="100%"
                        height="250px"
                        light={true}
                        controls
                      />
                    }
                  >
                    <h2 className="text-xl font-semibold line-clamp-2">
                      {tutorial.title}
                    </h2>
                  </Card>
                </MyMotion>
              ))}
            </>
          )}
        </div>
        {tutorials?.meta?.total >= 10 && (
          <div className="mt-4">
            <Pagination
              className="justify-center"
              total={tutorials?.meta?.total}
              current={pagination.page}
              pageSize={pagination.limit}
              onChange={(page, pageSize) => {
                setPagination({ page, limit: pageSize });
              }}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Tutorials;
