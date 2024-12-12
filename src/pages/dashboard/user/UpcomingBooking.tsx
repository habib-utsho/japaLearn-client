import { Empty, Pagination, Skeleton } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/index.type";
import { useGetMyBookingQuery } from "../../../redux/features/bookingApi";
import { TBooking } from "../../../types/booking.type";
import UpcomingBookingCard from "../../../components/booking/UpcomingBookingCard";

const UpcomingBooking = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  // @ts-ignore
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: bookings,
    isLoading: isLoadingBooking,
    isFetching: isFetchingBooking,
  } = useGetMyBookingQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    { name: "upcoming", value: true },
    ...params,
  ]);

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Upcoming Bookings</h2>
      </div>

      {isLoadingBooking || isFetchingBooking ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton.Button active className="!h-[250px] !w-full" />
          <Skeleton.Button active className="!h-[250px] !w-full" />
          <Skeleton.Button active className="!h-[250px] !w-full" />
        </div>
      ) : bookings?.meta?.total === 0 ? (
        <div className="h-[75vh] flex items-center justify-center">
          <Empty description={"No upcoming booking!"} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings?.data?.map((booking: TBooking) => (
              <UpcomingBookingCard booking={booking} />
            ))}
          </div>

          <div className="rounded-md p-4 bg-primary bg-opacity-5 my-10 flex justify-center">
            <Pagination
              current={pagination.page}
              pageSize={pagination.limit}
              total={bookings?.meta?.total}
              onChange={(page, pageSize) =>
                setPagination({ page, limit: pageSize })
              }
              className=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingBooking;
