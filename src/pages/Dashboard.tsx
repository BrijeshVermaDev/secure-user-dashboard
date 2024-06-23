import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyFetchUsersQuery } from "../redux/api/authApi";
import { logout } from "../redux/slice/authSlice";
import Button from "../components/UI/Button";
import Pagination from "../components/Common/Pagination";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchuserData] = useLazyFetchUsersQuery();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  function fetchData(page: number) {
    setIsLoading(true);
    fetchuserData(page)
      .then((res: any) => {
        if (res?.data) {
          if (res?.data?.total_pages) {
            setTotalPages(res?.data?.total_pages);
          }
          if (res?.data?.data) {
            setUsers(res?.data?.data);
          }
        }
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLogout = () => {
    dispatch(logout());
    naviagte("/signin");
  };

  const renderUsers = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;
    if (!users || users?.length === 0) return <p>No users found.</p>;
    return (
      <ul className="divide-y divide-gray-200">
        {users.map((user: any) => (
          <li key={user.id} className="py-4 flex">
            <img
              className="h-10 w-10 rounded-full"
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            User Management Dashboard
          </h2>
        </div>
        <div className="flex justify-end">
          <Button type={"button"} onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className="mt-8">{renderUsers()}</div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
