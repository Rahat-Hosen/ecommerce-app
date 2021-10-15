import React from "react";
import Navigation from "../components/navigations/Navigation";
import RegisterComponent from "../components/authentication/Register";
import Footer from "../components/Footer";

const Register = () => {
  return (
    <div>
      <Navigation />
      <RegisterComponent />
      <Footer />
    </div>
  );
};

export default Register;
