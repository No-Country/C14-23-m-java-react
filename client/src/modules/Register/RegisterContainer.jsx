import { Box, Button, Container, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useForm } from "react-hook-form";

const theme = createTheme({
	palette: {
		primary: {
			main: "#00796B",
		},
	},
});

const RegisterContainer = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Typography component="h1" variant="h5">
						Registrarse
					</Typography>
				</Box>
				<Box component="form" sx={{ mt: 1 }} onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								type="text"
								id={"name"}
								label={"Nombre"}
								name={"name"}
								{...register("name", {
									required: "Name is required",
									minLength: {
										value: 3,
										message: "Name must be at least 3 characters long",
									},
									maxLength: {
										value: 20,
										message: "Name must be at most 20 characters long",
									},
								})}
								error={errors.name ? true : false}
								helperText={errors.name?.message}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								type="text"
								id={"lastName"}
								label={"Apellido"}
								name={"lastName"}
								{...register("lastName", {
									required: "Last Name is required",
									minLength: {
										value: 3,
										message: "Last Name must be at least 3 characters long",
									},
									maxLength: {
										value: 20,
										message: "Last Name must be at most 20 characters long",
									},
								})}
								error={errors.lastName ? true : false}
								helperText={errors.lastName?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								type="email"
								id={"email"}
								label={"Email"}
								name={"Email"}
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Email is not valid",
									},
								})}
								error={errors.email ? true : false}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								type="password"
								id={"password"}
								label={"Contraseña"}
								name={"password"}
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message: "Password must be at least 8 characters long",
									},
									maxLength: {
										value: 20,
										message: "Password must be at most 20 characters long",
									},
								})}
								error={errors.password ? true : false}
								helperText={errors.password?.message}
							/>
						</Grid>
						<Grid item container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type="date"
									id="date"
									label="Fecha de nacimiento"
									name="date"
									InputLabelProps={{ shrink: true }}
									{...register("date", {
										required: "Date is required",
										validate: (value) => {
											const birthDate = new Date(value);
											const currentDate = new Date();
											const age = currentDate.getFullYear() - birthDate.getFullYear();
											return age < 18 ? "You must be over 18 years old." : age > 100 ? "The date is invalid." : true;
										},
									})}
									error={errors.date ? true : false}
									helperText={errors.date?.message}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type="text"
									id={"country"}
									label={"País"}
									name={"country"}
									{...register("country", { required: "Country is required" })}
									error={errors.country ? true : false}
									helperText={errors.country?.message}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2, bgcolor: "#00796B", "&:hover": { bgcolor: "#006B5B" } }}>
								Registrarse
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default RegisterContainer;
