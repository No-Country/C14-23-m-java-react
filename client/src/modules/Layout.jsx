import NavBar from "./navbar/NavBar";
import { PropTypes } from "prop-types";

function Layout({ children }) {
	Layout.propTypes = {
		children: PropTypes.node.isRequired,
	};

	return (
		<>
			<NavBar />
			{children}
		</>
	);
}

export default Layout;
