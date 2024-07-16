import React, { useState, useEffect } from "react";
import "./style.css";

const Payment = () => (
   
    <div>
      <form className="w-100" action="http://localhost:3000/med/v1/payment/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
    </div>
    
);


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Pay() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <Payment />
  );
};