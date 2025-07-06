// components/StripeCheckoutButton.jsx
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
// o pon tu pk_test_xxx directamente mientras pruebas

const StripeCheckoutButton = ({
  amount = 2000,
  description = "T-shirt",
  ...rest
}) => {
  const handleCheckout = async () => {
    try {
      const res = await fetch(
        "http://localhost:7777/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, description }),
        }
      );

      const data = await res.json();
      const stripe = await stripePromise;

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al iniciar el pago");
    }
  };

  return (
    <button onClick={handleCheckout} {...rest}>
      Pagar {amount / 100} USD
    </button>
  );
};

export default StripeCheckoutButton;
