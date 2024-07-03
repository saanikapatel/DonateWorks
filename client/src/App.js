import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import DonorForm from "./components/DonorForm";
import Choose from "./components/Choose";
import UserSignup from "./components/Signup/UserSignup";
import UserLogin from "./components/Login/UserLogin";
import NgoLogin from "./components/Login/NgoLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/donate" element={<DonorForm />}></Route>
          <Route path="/choose" element={<Choose />}></Route>
          <Route path="/userSignup" element={<UserSignup />}></Route>
          <Route path="/userLogin" element={<UserLogin />}></Route>
          <Route path="/ngoLogin" element={<NgoLogin />}></Route>
          {/* <Route path="/admin" element={< />}></Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
