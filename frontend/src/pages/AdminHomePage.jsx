import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProduct);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {productsLoading || ordersLoading ? (
        <p>Loading...</p>
      ) : productsError ? (
        <p className="text-red-500">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching orders: {ordersError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl">₹{totalSales}</p>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl">{totalOrders}</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-2xl">{products.length}</p>
            <Link
              to="/admin/products"
              className="text-blue-500 hover:underline"
            >
              Manage Products
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        {/* MOBILE VIEW */}
        <div className="space-y-4 sm:hidden">
          {orders.length > 0 ? (
            orders.map((order) => {
              const statusStyles = {
                dispatchelivered: "bg-green-100 text-green-700",
                pending: "bg-yellow-100 text-yellow-700",
                cancelled: "bg-red-100 text-red-700",
                processing: "bg-blue-100 text-blue-700",
              };

              return (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-xl p-4 shadow-xs bg-white"
                >
                  {/* Header */}
                  <div className="mb-3">
                    <p className="font-semibold text-gray-900">#{order._id}</p>
                    <p className="text-xs text-gray-500">{order.user?.name}</p>
                  </div>

                  {/* Details */}
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">Total Price:</span> ₹
                      {order.totalPrice}
                    </p>

                    <p>
                      <span className="font-medium">Status:</span>
                    </p>
                  </div>

                  {/* Status badge */}
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        statusStyles[order.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No recent orders found.</p>
          )}
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="min-w-full text-left">
            {/* HEADER */}
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600 border-b border-gray-400">
              <tr>
                <th className="py-4 px-6 font-semibold">Order</th>
                <th className="py-4 px-6 font-semibold">Customer</th>
                <th className="py-4 px-6 font-semibold">Amount</th>
                <th className="py-4 px-6 font-semibold">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-sm text-gray-700 divide-y">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const statusStyles = {
                    delivered: "bg-green-100 text-green-700",
                    pending: "bg-yellow-100 text-yellow-700",
                    cancelled: "bg-red-100 text-red-700",
                    processing: "bg-blue-100 text-blue-700",
                  };

                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition cursor-pointer border-b border-gray-300"
                    >
                      {/* ORDER ID */}
                      <td className="py-4 px-6 font-medium text-gray-900">
                        #{order._id}
                      </td>

                      {/* USER */}
                      <td className="py-4 px-6">
                        <p className="font-medium">
                          {order.user?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>

                      {/* PRICE */}
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        ₹{order.totalPrice.toLocaleString()}
                      </td>

                      {/* STATUS BADGE */}
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            statusStyles[order.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;

// const orders = [
//   {
//     _id: 123123,
//     createdAt: new Date(),
//     user: {
//       name: "John Doe",
//     },
//     totalPrice: 110,
//     status: "Processing",
//   },
//   {
//     _id: 321123,
//     createdAt: new Date(),
//     user: {
//       name: "John Cena",
//     },
//     totalPrice: 210,
//     status: "Pending",
//   },
//   {
//     _id: 456789,
//     createdAt: new Date(),
//     user: {
//       name: "Undertaker",
//     },
//     totalPrice: 260,
//     status: "Delivered",
//   },
//   {
//     _id: 900000,
//     createdAt: new Date(),
//     user: {
//       name: "Cristiano Ronaldo",
//     },
//     totalPrice: 500,
//     status: "Cancelled",
//   },
// ];
