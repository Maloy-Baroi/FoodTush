import './App.css';
import Home from './components/pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Location from './components/pages/SetLocation/Location';
import SignupPage from './components/pages/Log/Signup/SignupPage';
import VerifySignup from './components/pages/Log/Signup/VerifySignup';
import LoginPage from './components/pages/Log/Login/LoginPage';
import SearchRestaurant from './components/pages/Home/Modal/SearchRestaurant';
import RestaurantDetailsPage from './components/pages/RestaurantDetails/RestaurantDetailsPage';
import CartView from './components/pages/Cart/CartView';
import Checkout from './components/pages/Checkout/Checkout';
import ProfilePage from './components/pages/Profile/ProfilePage'
import SignupForRestaurantStepOne from './components/pages/RestaurantBase/SignupForRestaurantStepOne'
import SignupForRestaurantStepTwo from './components/pages/RestaurantBase/SignupForRestaurantStepTwo'
import VerifySignupForRestaurants from './components/pages/RestaurantBase/VerifySignupForRestaurants';
import RestaurantLogin from './components/pages/RestaurantBase/RestaurantLogin';
import Dashboard from './components/pages/RestaurantBase/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/set-location' element={<Location />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/auth/verify/:token' element={<VerifySignup />} />
        <Route path='/search-restaurant' element={<SearchRestaurant />} />
        <Route path={'/restaurant-details/:id/'} element={<RestaurantDetailsPage />} />
        <Route path={'/cart-view/'} element={<CartView />} />
        <Route path={'/checkout/:subTotal/'} element={<Checkout />} />
        <Route path={'/profile-view/'} element={<ProfilePage /> } />
        <Route path={'/signup-for-restaurant-step-one/'} element={<SignupForRestaurantStepOne /> } />
        <Route path={'/signup-for-restaurant-step-two/'} element={<SignupForRestaurantStepTwo /> } />
        <Route path={'/auth/verify/:token/restaurant/'} element={<VerifySignupForRestaurants />} />
        <Route path={'/restaurant/login/'} element={<RestaurantLogin />} />
        <Route path={'/restaurant/dashboard/'} element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
