import {
  BookOutlined,
  ReadOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../../../redux/hook";
import { Card, Skeleton, Tabs } from "antd";
import "antd/dist/reset.css"; // Import Ant Design CSS
import { useGetAdminStatsQuery } from "../../../../redux/api/statsApi";

const { TabPane } = Tabs;

const DashboardHome = () => {
  const { data: adminStats, isLoading: isLoadingStats } =
    useGetAdminStatsQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);

  const stats = [
    {
      amount: `${adminStats?.data?.totalUsers || 0}`,
      title: "Total Users",
      icon: <UserOutlined />,
      background: "#ffe2e5",
      iconBackground: "#fa5a7d",
    },
    {
      amount: `${adminStats?.data?.totalAdmins || 0}`,
      title: "Total Admins",
      icon: <UserAddOutlined />,
      background: "#fff4de",
      iconBackground: "#ff947a",
    },
    {
      amount: `${adminStats?.data?.totalLessons || 0}`,
      title: "Total Lessons",
      icon: <ReadOutlined />,
      background: "#dcfce7",
      iconBackground: "#3cd856",
    },
    {
      amount: `${adminStats?.data?.availableSlots || 0}`,
      title: "Available Slots",
      icon: <BookOutlined />,
      background: "#f3e8ff",
      iconBackground: "#bf83ff",
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <h2
        style={{ marginBottom: "24px" }}
        className="font-bold text-xl md:text-2xl"
      >
        Hi <strong className="text-primary">{user?.name}</strong>, Welcome back
        in Admin Dashboard 👋
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <Card className="mt-6">
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Overall summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4">
              {isLoadingStats
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton.Button
                      key={index}
                      className="!h-[180px] !w-full rounded-xl"
                      active
                    />
                  ))
                : stats.map((stat, index) => (
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
        </TabPane>

        <TabPane tab="Analytics" key="2" disabled></TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
