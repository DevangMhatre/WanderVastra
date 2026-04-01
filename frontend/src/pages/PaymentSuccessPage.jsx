import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);

  // Latest order
  const latestOrder = orders?.[0];

  useEffect(() => {
    // Fetch orders when page loads
    dispatch(fetchUserOrders());

    // Clear cart after payment success
    dispatch(clearCart());

    // Retry fetch once in case webhook hasn't finished
    const retry = setTimeout(() => {
      dispatch(fetchUserOrders());
    }, 3000);

    return () => clearTimeout(retry);
  }, [dispatch]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="text-center p-10">
        <p className="text-lg font-medium">Fetching your order...</p>
      </div>
    );
  }

  if (!latestOrder) {
    return (
      <div className="text-center p-10">
        <p className="text-lg font-medium">No order found.</p>
        <button
          onClick={() => navigate("/my-orders")}
          className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Your Order!
      </h1>

      <div className="p-6 rounded-lg border border-gray-300">
        <div className="flex justify-between mb-20">
          {/* Order Id and Date */}
          <div>
            <h2 className="text-xl font-semibold">
              Order ID: {latestOrder._id}
            </h2>
            <p className="text-gray-500">
              Order Date: {new Date(latestOrder.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Estimated Delivery */}
          <div>
            <p className="text-emerald-700 text-sm">
              Estimated Delivery:{" "}
              {calculateEstimatedDelivery(latestOrder.createdAt)}
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mb-20">
          {latestOrder.orderItems.map((item) => (
            <div key={item.productId} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />

              <div>
                <h4 className="text-md font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.color} | {item.size}
                </p>
              </div>

              <div className="ml-auto text-right">
                <p className="text-md">${item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment and Delivery Info */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-600">Paid via Lemon Squeezy</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-600">
              {latestOrder.shippingAddress.address}
            </p>
            <p className="text-gray-600">
              {latestOrder.shippingAddress.city},{" "}
              {latestOrder.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
