"use client";
import PaymentGateWay from "@/sdk/sdk";
import { PaymentIntent } from "@/sdk/types";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [, setShowModal] = useState(false);
  const [, setPaymentIntent] = useState<PaymentIntent | null>(null);

  // Use useRef to maintain a single instance of PaymentGateWay
  const paymentGateWayRef = useRef<PaymentGateWay | null>(null);

  useEffect(() => {
    // Create the PaymentGateWay instance only once
    if (!paymentGateWayRef.current) {
      paymentGateWayRef.current = new PaymentGateWay({
        apiKey: "YOUR API KEY HERE",
        setShowModal,
        setPaymentIntent: setPaymentIntent,
      });

      // Create payment intent once when component mounts
      paymentGateWayRef.current.createPaymentIntent(100).catch((err) => {
        console.error("Error creating payment intent:", err);
      });
    }
  }, []);

  // Only render if we have the gateway instance
  if (!paymentGateWayRef.current) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* {paymentGateWayRef.current.renderPaymentButton()} */}
      {paymentGateWayRef.current.renderPaymentModal()}
    </div>
  );
};

export default Home;
