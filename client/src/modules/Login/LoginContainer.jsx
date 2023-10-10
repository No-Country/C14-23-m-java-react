import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLogin from "./components/InputLogin";
import ButtonLogin from "./components/ButtonLogin";
import LinkLogin from "./components/LinkLogin";
import { useState } from "react";

const LoginContainer = () => {
	const [empty, setEmpty] = useState({
		error: "",
		message: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		try {
			if (!data.get("email").trim()) {
				throw { message: "Email is required", name: "email" };
			}

			if (!data.get("password").trim()) {
				throw { message: "Password is required", name: "password" };
			}

			console.log({
				email: data.get("email"),
				password: data.get("password"),
			});
		} catch (error) {
			setEmpty({ error: error.name, message: error.message });
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<InputLogin
						id={"email"}
						label={"Email Address"}
						type={"email"}
						name={"email"}
						autoComplete={"email"}
						autoFocus={true}
						hasError={empty.error === "email"}
						errorMessage={empty.error === "email" ? empty.message : ""}
						setError={(value) => {
							if (value === false) {
								setEmpty({ error: "", message: "" });
							}
						}}
					/>
					<InputLogin
						id={"password"}
						label={"Password"}
						type={"password"}
						name={"password"}
						autoComplete={"current-password"}
						autoFocus={false}
						hasError={empty.error === "password"}
						errorMessage={empty.error === "password" ? empty.message : ""}
						setError={(value) => {
							if (value === false) {
								setEmpty({ error: "", message: "" });
							}
						}}
					/>

					<ButtonLogin />
					<Grid container>
						<Grid item xs>
							<LinkLogin link={"#"} text={"Forgot password?"} />
						</Grid>
						<Grid item>
							<LinkLogin link={"#"} text={"Don't have an account? Sign Up"} />
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginContainer;
