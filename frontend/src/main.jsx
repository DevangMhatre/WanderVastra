// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <PayPalScriptProvider
    options={{
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD",
      intent: "capture",
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </PayPalScriptProvider>,
  // </StrictMode>,
);
