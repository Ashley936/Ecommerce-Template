import React, { useEffect } from 'react';
import { ChakraProvider, Heading, theme } from '@chakra-ui/react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import ProductDetails from './Screens/ProductDetails';
import Cart from './Screens/Cart';
import { Signup } from './Screens/SignUp';
import { Login } from './Screens/LogIn';
import UserProfile from './Screens/UserProfile';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, logout } from './Actions/userAction';
import { Shipping } from './Screens/Shipping';
import { Payment } from './Screens/Payment';
import { PlaceOrder } from './Screens/PlaceOrder';
function App() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { user, error } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && (!user || !user.name) && !error) {
      try {
        dispatch(getUserDetails('profile'));
      } catch (err) {
        console.log(err);
      }
    } else if (error === 'Token expired') {
      dispatch(logout());
    }
  }, [dispatch, user, userInfo, error]);
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="*" element={<Heading>Page Not found</Heading>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
