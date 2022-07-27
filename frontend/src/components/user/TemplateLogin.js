// React Functions
import React from 'react'
import { Typography, TextField, Box, CssBaseline, Grid, Container, Button } from '@mui/material';

// CSS
import { Link } from "react-router-dom"

export default function TemplateLogin({ handleSubmit, error }) {

    return (
        <Container component="main" maxwidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
          </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        style={{ width: '100%' }}
                        margin="normal"
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        style={{ width: '100%' }}
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Link to={'/resetPassword'}>Reset Password</Link>
                    <Button
                        style={{ width: '100%' }}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <div style={{ color: "red" }}>
                        {error}
                    </div>
                    <Grid container>
                        <Grid item>
                            <Link to={'/signup'}>Sign Up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}