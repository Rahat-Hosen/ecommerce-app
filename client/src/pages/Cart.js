import React from "react";
import Navigation from "../components/Navigations/Navigation";
import CartComponent from "../components/Cart";
import Footer from "../components/Footer";

const Cart = () => {
  return (
    <div>
      <Navigation />
      <CartComponent />
      <Footer />
    </div>
  );
};

export default Cart;