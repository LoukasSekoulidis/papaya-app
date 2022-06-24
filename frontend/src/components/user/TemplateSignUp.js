// React Functions
import React from 'react'
import { Typography, TextField, Box, CssBaseline, Container, Button } from '@mui/material';

export default function TemplateSignUp({handleSubmit, error}) {

return (
    <React.Fragment>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              style ={{width: '100%'}}
              margin="normal"
              required
              id="username"
              label="Username"
              name="username"
            />
            <TextField
              style ={{width: '100%'}}
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              style ={{width: '100%'}}
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              style ={{width: '100%'}}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <div style={{color: "red"}}>
              {error}
            </div>
          </Box>
        </Box>
      </Container>
      </React.Fragment>
)
        }