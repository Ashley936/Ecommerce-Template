import React from 'react';
import { ChakraProvider, Heading, theme } from '@chakra-ui/react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import ProductDetails from './Screens/ProductDetails';
import Cart from './Screens/Cart';
import { Signup } from './Screens/SignUp';
import { Login } from './Screens/LogIn';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="*" element={<Heading>Page Not found</Heading>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
