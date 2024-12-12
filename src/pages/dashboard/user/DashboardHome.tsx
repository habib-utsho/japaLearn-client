import {
  AppstoreOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useGetUserStatsQuery } from "../../../redux/features/statsApi";
import { useAppSelector } from "../../../redux/hook";
import { Card, Skeleton, Tabs } from "antd";
import { useGetMyBookingQuery } from "../../../redux/features/bookingApi";
import moment from "moment";
import Table, { ColumnsType } from "antd/es/table";
import { TBooking } from "../../../types/booking.type";
import { TService } from "../../../types/service.type";
import { TUser } from "../../../types/index.type";
import { TSlot } from "../../../types/slot.type";
const { TabPane } = Tabs;

//TODO: Showing admin stats now, replace it to for user stats
const DashboardHome = () => {
  const { data: userStats, isLoading: isLoadingStats } =
    useGetUserStatsQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);

  const { data: upcomingBookings, isLoading: isLoadingUpcomingBooking } =
    useGetMyBookingQuery([{ name: "upcoming", value: true }]);

  const stats = [
    {
      amount: `${userStats?.data?.totalServices || 0}`,
      title: "Total services",
      icon: <AppstoreOutlined />,
      background: "#ffe2e5",
      iconBackground: "#fa5a7d",
    },
    {
      amount: `${userStats?.data?.totalBookings || 0}`,
      title: "Total Bookings",
      icon: <BookOutlined />,
      background: "#dcfce7",
      iconBackground: "#3cd856",
    },
    {
      amount: `${userStats?.data?.upcomingBookings || 0}`,
      title: "Upcoming Bookings",
      icon: <CalendarOutlined />,
      background: "#dcfce7",
      iconBackground: "#3cd856",
    },
    {
      amount: `${userStats?.data?.availableSlots || 0}`,
      title: "Available Slots",
      icon: <CheckCircleOutlined />,
      background: "#f3e8ff",
      iconBackground: "#bf83ff",
    },
    {
      amount: `${userStats?.data?.upcomingSlots || 0}`,
      title: "Upcoming Slots",
      icon: <CalendarOutlined />,
      background: "#f0f8ff",
      iconBackground: "#008080",
    },
    // {
    //   amount: `${adminStats?.data?.totalBookings || 0}`,
    //   title: "Total Bookings",
    //   icon: <BookOutlined />,
    //   background: "#e7edff",
    //   iconBackground: "#396aff",
    // },
  ];

  // Latest booking columns
  const upcomingBookingsColumn: ColumnsType<TBooking> = [
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
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <h2
        style={{ marginBottom: "24px" }}
        className="font-bold text-xl md:text-2xl"
      >
        Hi <strong className="text-primary">{user?.name}</strong>, welcome back
        in your dashboard 👋
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <Card className="mt-6">
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Overall summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {isLoadingStats
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton.Button
                      key={index}
                      className="!h-[180px] !w-full rounded-xl"
                      active
                    />
                  ))
                : // @ts-ignore
                  stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl flex justify-between shadow-sm"
                      style={{ backgroundColor: stat.background }}
                    >
                      <div className="space-y-2">
                        <div
                          className="rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl"
                          style={{ backgroundColor: stat.iconBackground }}
                        >
                          {stat.icon}
                        </div>
                        <div className="text-xl font-semibold">
                          {stat.amount}
                        </div>
                        <h3 className="text-md font-semibold">{stat.title}</h3>
                      </div>
                    </div>
                  ))}
            </div>
          </Card>

          {/* Upcoming bookings */}
          <div className="bg-white rounded-md p-4 shadow my-[50px] md:my-[60px]">
            <h2 className="font-semibold text-xl">Upcoming Bookings</h2>
            <Table
              loading={isLoadingUpcomingBooking}
              dataSource={upcomingBookings?.data?.slice(0, 10)}
              columns={upcomingBookingsColumn}
              pagination={false}
              style={{ maxWidth: "full", overflow: "auto" }}
              // className="!w-[800px] md:max-w-full"
            />
          </div>
        </TabPane>
        <TabPane tab="Analytics" key="2" disabled>
          {/* Future Analytics Content */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
