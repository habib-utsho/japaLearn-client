import { Empty, Input, Skeleton, Table } from "antd";
import { useState } from "react";
import { TQueryParam, TUser } from "../../../types/index.type";
import { useGetMyBookingQuery } from "../../../redux/features/bookingApi";
import moment from "moment";
import { TSlot } from "../../../types/slot.type";
import { TBooking } from "../../../types/booking.type";
import { ColumnsType } from "antd/es/table";
import { MailOutlined, PhoneOutlined, TrophyOutlined } from "@ant-design/icons";
import { TService } from "../../../types/service.type";

const { Search } = Input;

const Booking = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  // @ts-ignore
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: bookings,
    isLoading: isLoadingBooking,
    isFetching: isFetchingBooking,
  } = useGetMyBookingQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);

  const columns: ColumnsType<TBooking> = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_: TUser, record: TBooking) =>
        record.customer ? (
          <div className="flex items-center gap-[6px]">
            <img
              src={record.customer?.img}
              alt={record.customer?.name}
              className="h-[60px] w-[60px] object-cover rounded-full border-2 border-primary"
            />
            <div>
              <h2 className="mb-0 font-semibold">{record.customer?.name}</h2>
              <h2 className="mb-0 text-slate-700 text-[12px]">
                <PhoneOutlined className="mr-[2px]" /> {record.customer?.phone}
              </h2>
              <h2 className="mb-0 text-slate-700 text-[12px]">
                <MailOutlined className="mr-[2px]" /> {record.customer?.email}
              </h2>
            </div>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (_: TService, record: TBooking) =>
        record.service ? (
          <div className="flex items-center gap-[6px]">
            <img
              src={record.service?.img}
              alt={record.service?.name}
              className="h-[60px] w-[60px] object-cover rounded-full border-2 border-primary"
            />
            <div>
              <h2 className="mb-0 font-semibold">{record.service?.name}</h2>
              {record.service?.isFeatured ? (
                <div className="text-primary-500">
                  <TrophyOutlined className="mr-[2px]" /> Featured service
                </div>
              ) : (
                "Normal service"
              )}
            </div>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (slot: TSlot) => {
        const formatTime = (time: string) =>
          moment(time, "HH:mm").format("h:mm A");

        return (
          <div>
            <div className="text-sm font-semibold text-gray-700">
              {`${formatTime(slot?.startTime)} - ${formatTime(slot?.endTime)}`}
            </div>
            <div className="flex items-center">
              {moment(slot?.date).format("Do MMM, YYYY")}
            </div>
          </div>
        );
      },
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "service",
      render: (service) => (
        <div className="flex items-center">{service.price}</div>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "service",
      render: (service) => (
        <div className="flex items-center">{service.duration}</div>
      ),
    },

    {
      title: "Vehicle Type",
      key: "vehicleType",
      dataIndex: "vehicleType",
    },
    {
      title: "Vehicle Brand",
      key: "vehicleBrand",
      dataIndex: "vehicleBrand",
    },
    {
      title: "Vehicle Model",
      key: "vehicleModel",
      dataIndex: "vehicleModel",
    },
    {
      title: "Manufacturing Year",
      key: "manufacturingYear",
      dataIndex: "manufacturingYear",
    },
    {
      title: "Registration Plate",
      key: "registrationPlate",
      dataIndex: "registrationPlate",
    },
  ];

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Bookings</h2>

        <Search
          placeholder="Search by vehicle model, brand and type"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
      </div>

      {isLoadingBooking ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : bookings?.meta?.total === 0 ? (
        <Empty description="No bookings found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={bookings?.data}
          loading={isLoadingBooking || isFetchingBooking}
          rowKey={(record) => record._id}
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: bookings?.meta?.total,
            onChange: (page, pageSize) =>
              setPagination({ limit: pageSize, page }),
          }}
          scroll={{ x: 1000 }}
        />
      )}
    </div>
  );
};

export default Booking;
