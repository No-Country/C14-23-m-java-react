import { Button } from "@mui/material";

const ButtonLogin = () => {
	return (
		<Button
			type="submit"
			fullWidth
			variant="contained"
			sx={{ mt: 3, mb: 2, bgcolor: "#00796B", "&:hover": { bgcolor: "#006B5B" } }}>
			Sign In
		</Button>
	);
};

export default ButtonLogin;
