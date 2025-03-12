'use client';

import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { ChatMessage } from '@/types/api';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          maxWidth: '80%',
        }}
      >
        <Avatar
          sx={{
            bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
            ml: message.sender === 'user' ? 1 : 0,
            mr: message.sender === 'user' ? 0 : 1,
          }}
        >
          {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
        </Avatar>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: message.sender === 'user' ? 'primary.light' : 'white',
            color: message.sender === 'user' ? 'white' : 'text.primary',
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
            {message.text}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatMessageComponent; 