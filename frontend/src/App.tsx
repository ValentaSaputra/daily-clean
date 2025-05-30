import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MyCartPage from "./pages/MyCartPage"
import DetailsPage from "./pages/DetailsPage"
import BookingPage from "./pages/BookingPage"
import PaymentPage from "./pages/PaymentPage"
import SuccessBookingPage from "./pages/SuccessBookingPage"
import MyBookingPage from "./pages/MyBookingPage"
import CategoryPage from "./pages/CategoryPage"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/cart" element={<MyCartPage/>} />
      <Route path="/booking" element={<BookingPage/>} />
      <Route path="/payment" element={<PaymentPage/>} />
      <Route path="/success-booking" element={<SuccessBookingPage/>} />
      <Route path="/my-booking" element={<MyBookingPage/>} />
      
      <Route path="/service/:slug" element={<DetailsPage/>} />
      <Route path="/category/:slug" element={<CategoryPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
