import { Link } from "@mui/material";
import { PropTypes } from "prop-types";

const LinkLogin = ({ link, text }) => {
	LinkLogin.propTypes = {
		link: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	};

	return (
		<Link href={link} variant="body2">
			{text}
		</Link>
	);
};

export default LinkLogin;
