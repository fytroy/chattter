import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';
import { useAuth } from '../Auth/AuthContext';
import { Button, TextField, List, ListItem, Typography } from '@material-ui/core';

export default function Channel() {
    const { channelId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        if (channelId) {
            const unsubscribe = firestore
                .collection('channels')
                .doc(channelId)
                .collection('messages')
                .orderBy('createdAt')
                .onSnapshot(snapshot => {
                    const messagesData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setMessages(messagesData);
                });

            return () => unsubscribe();
        }
    }, [channelId]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (newMessage.trim() === '') return;

        await firestore
            .collection('channels')
            .doc(channelId)
            .collection('messages')
            .add({
                text: newMessage,
                createdAt: new Date(),
                user: currentUser.uid,
                userEmail: currentUser.email
            });

        setNewMessage('');
    };

    return (
        <div>
            <Typography variant="h5">Channel: {channelId}</Typography>
            <List>
                {messages.map(message => (
                    <ListItem key={message.id}>
                        <Typography>
                            <strong>{message.userEmail}:</strong> {message.text}
                        </Typography>
                    </ListItem>
                ))}
            </List>
            <form onSubmit={handleSubmit}>
                <TextField
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Send
                </Button>
            </form>
        </div>
    );
}