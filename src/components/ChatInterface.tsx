'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, List, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatMessage } from '@/types/api';
import ChatMessageComponent from './ChatMessage';
import { sendMessageDirect } from '@/services/api';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: `Welcome to the Technician Booking System! 

Here are some commands you can use:
- Create a booking: "John Doe, Plumber, October 20 at 3 PM"
- List bookings: "list bookings"
- View details: "show details for booking with ID [booking_id]"
- Cancel booking: "cancel booking with ID [booking_id]"

Supported technician specialties:
- Plumber
- Electrician
- Welder
- Gardener
- Carpenter

How can I help you today?`,
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageDirect(input);

      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: ChatMessage = {
        id: messages.length + 2,
        text: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'bot',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflow: 'auto',
          bgcolor: '#f5f5f5',
        }}
      >
        <List>
          {messages.map((message) => (
            <ChatMessageComponent key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your message here..."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            multiline
            maxRows={4}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ''}
            sx={{ height: '100%' }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatInterface; 