import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart }) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if (newQuantity <= 0) {
      dispatch(removeFromCart({ productId, size, color }));
      return;
    }

    dispatch(
      updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        size,
        color,
      }),
    );
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color }));
  };

  return (
    <div>
      {cart.products.map((product) => (
        <div
          key={`${product.productId}-${product.size}-${product.color}`}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product?.name}</h3>
              <p className="text-xs md:text-sm text-gray-500">
                Size: {product?.size} | Color: {product?.color}
              </p>
              <div className="border rounded flex items-center mt-2 w-fit">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="rounded px-2 py-1 text-xl font-medium cursor-pointer hover:bg-gray-200"
                >
                  -
                </button>
                <span className="mx-4">{product?.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="rounded px-2 py-1 text-xl font-medium cursor-pointer hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>₹{product?.price?.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
              className="cursor-pointer"
            >
              <RiDeleteBin3Line className="h-6 w-6 ml-1 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartContent;
