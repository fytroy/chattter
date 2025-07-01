import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Sidebar from '../components/Sidebar/Sidebar';
import Channel from '../components/Channel/Channel';

export default function Home() {
    return (
        <Container maxWidth="xl" disableGutters>
            <Grid container>
                <Grid item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9}>
                    <Channel />
                </Grid>
            </Grid>
        </Container>
    );
}