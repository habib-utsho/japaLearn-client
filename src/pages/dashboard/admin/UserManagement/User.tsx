import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";

import { DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import {
  TQueryParam,
  TResponse,
  TRole,
  TUser,
} from "../../../../types/index.type";

import { useAppSelector } from "../../../../redux/hook";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useToggleUserRoleMutation,
} from "../../../../redux/api/authApi";
import firstLetterToCapital from "../../../../utils/firstLetterToCapital";

const { Search } = Input;
const User = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params] = useState<TQueryParam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const {
    data: users,
    isLoading: isLoadingUser,
    isFetching,
  } = useGetAllUserQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const [deleteUser] = useDeleteUserMutation();
  const [toggleUserRole] = useToggleUserRoleMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );
  const [isLoadingToggleRoleId, setIsLoadingToggleRoleId] = useState<
    string | null
  >(null);
  const { user } = useAppSelector((state) => state.auth);

  const columns = [
    {
      title: "User",
      render: (user: TUser) => {
        return (
          <div className="flex items-center gap-2">
            {user?.profileImg && (
              <img
                src={user?.profileImg}
                alt={user?.name}
                className="h-10 w-10"
              />
            )}
            <h2>{user?.name}</h2>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: TRole) => (
        <div
          className={`font-semibold ${
            role === "admin" ? "text-primary" : "text-slate-700"
          }`}
        >
          {firstLetterToCapital(role)}
        </div>
      ),
    },
    {
      title: "Actions",
      render: (_: TUser, record: TUser) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              // icon={<Ed />}
              loading={isLoadingToggleRoleId === record._id}
              onClick={() => handleToggleUserRole(record?._id)}
              disabled={record.email === user?.email}
            >
              Make {record.role === "admin" ? "user" : "admin"}
            </Button>
            <Popconfirm
              title={`Delete the ${record.role === "admin" ? "admin" : "user"}`}
              description={`Are you sure to delete this ${
                record.role === "admin" ? "admin" : "user"
              }?`}
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Yes"
              cancelText="No"
              disabled={record.email === user?.email}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                loading={isLoadingDeleteId === record._id}
                disabled={record.email === user?.email}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteUser = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteUser(id).unwrap()) as TResponse<TUser>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to delete user");
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  const handleToggleUserRole = async (id: string) => {
    setIsLoadingToggleRoleId(id);

    try {
      const result = (await toggleUserRole(id).unwrap()) as TResponse<TUser>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to toggle role!");
    } finally {
      setIsLoadingToggleRoleId(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">User</h2>
        <Search
          placeholder="Search user"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
      </div>

      {isLoadingUser ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : users?.meta?.total === 0 ? (
        <Empty description="No user found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={users?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          loading={isLoadingUser || isFetching}
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: users?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}
    </div>
  );
};

export default User;
