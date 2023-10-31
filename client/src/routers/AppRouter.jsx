import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import StatisticsPage from '../pages/StatisticsPage';
import HistoryPage from '../pages/HistoryPage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../modules/Layout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import SavingsPage from '../pages/SavingsPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/statistics' element={<StatisticsPage />} />
          <Route path='/savings' element={<SavingsPage />} />
          <Route path='/financialHistory' element={<HistoryPage />} />
          <Route path='/account' element={<AccountPage />} />
          {/* <Route  path='/logOut' element = {<LogoutPage/>} /> */}

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter;
