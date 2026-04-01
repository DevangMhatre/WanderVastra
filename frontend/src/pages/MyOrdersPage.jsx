import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  // const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (id) => {
    navigate(`/order/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      {/* ========== MOBILE VIEW (cards) ========== */}
      <div className="space-y-4 sm:hidden">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handleRowClick(order._id)}
              className="border border-gray-200 rounded-xl p-4 shadow-xs bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold text-gray-900">#{order._id}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order.shippingAddress
                    ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                    : "N/A"}
                </p>
                <p>
                  <span className="font-medium">Items:</span>{" "}
                  {order.orderItems.length}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ₹
                  {order.totalPrice}
                </p>
              </div>

              <div className="mt-3">
                <span
                  className={`${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  } px-2 py-1 rounded-full text-xs font-medium`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You have no orders</p>
        )}
      </div>

      {/* ========== DESKTOP VIEW (table) ========== */}

      <div className="hidden sm:block relative shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="p-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="p-4">{order.orderItems.length}</td>
                  <td className="p-4">₹{order.totalPrice}</td>
                  <td className="p-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyOrdersPage;

// useEffect(() => {
//   setTimeout(() => {
//     const mockOrders = [
//       {
//         _id: "12345",
//         createdAt: new Date(),
//         shippingAddress: { city: "New York", country: "USA" },
//         orderItems: [
//           {
//             name: "Product 1",
//             image: "https://picsum.photos/500/500?random=17",
//           },
//         ],
//         totalPrice: 100,
//         isPaid: true,
//       },
//       {
//         _id: "56789",
//         createdAt: new Date(),
//         shippingAddress: { city: "New York", country: "USA" },
//         orderItems: [
//           {
//             name: "Product 2",
//             image: "https://picsum.photos/500/500?random=18",
//           },
//         ],
//         totalPrice: 100,
//         isPaid: false,
//       },
//     ];

//     setOrders(mockOrders);
//   }, 1000);
// }, []);
