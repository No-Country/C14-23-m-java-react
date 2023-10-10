import { ThemeProvider } from "@emotion/react";
import { TextField, createTheme } from "@mui/material";
import { PropTypes } from "prop-types";

const theme = createTheme({
	palette: {
		primary: {
			main: "#00796B",
		},
	},
});

const InputLogin = ({ id, label, name, autoComplete, type, autoFocus, hasError, errorMessage, setError }) => {
	InputLogin.propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		autoComplete: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		autoFocus: PropTypes.bool.isRequired,
		hasError: PropTypes.bool.isRequired,
		errorMessage: PropTypes.string,
		setError: PropTypes.func.isRequired,
	};

	const handleInputChange = () => {
		setError(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<TextField
				margin="normal"
				required
				fullWidth
				type={type}
				id={id}
				label={label}
				name={name}
				autoComplete={autoComplete}
				autoFocus={autoFocus}
				error={hasError}
				helperText={errorMessage}
				onChange={handleInputChange}
			/>
		</ThemeProvider>
	);
};

export default InputLogin;
