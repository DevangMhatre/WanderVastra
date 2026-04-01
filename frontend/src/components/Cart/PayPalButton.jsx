import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) =>
        actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: Number(amount).toFixed(2),
              },
            },
          ],
        })
      }
      onApprove={(data, actions) => actions.order.capture().then(onSuccess)}
      onError={(err) => {
        console.error("PayPal Error:", err);
        if (onError) onError(err);
      }}
    />
  );
};

export default PayPalButton;
