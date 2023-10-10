import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import StatisticsPage from "../pages/StatisticsPage";
import UserPage from "../pages/UserPage";
import HistoryPage from "../pages/HistoryPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../modules/Layout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route exact path="/login" element={<LoginPage />} />
				<Route exact path="/register" element={<RegisterPage />} />
				<Route
					exact
					path="/home"
					element={
						<Layout>
							<HomePage />
						</Layout>
					}
				/>
				<Route
					exact
					path="/statistics"
					element={
						<Layout>
							<StatisticsPage />
						</Layout>
					}
				/>
				<Route
					exact
					path="/user"
					element={
						<Layout>
							<UserPage />
						</Layout>
					}
				/>
				<Route
					exact
					path="/financialHistory"
					element={
						<Layout>
							<HistoryPage />
						</Layout>
					}
				/>
				{/* <Route exact path='/logOut' element = {<LogoutPage/>} /> */}

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
