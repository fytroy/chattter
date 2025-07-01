import React, { useRef, useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@material-ui/core';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to log in');
        }

        setLoading(false);
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Log In
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    inputRef={emailRef}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    inputRef={passwordRef}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Log In
                </Button>
            </form>
        </Container>
    );
}