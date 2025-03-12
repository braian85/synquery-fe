'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import ChatInterface from '@/components/ChatInterface';
import BookingList from '@/components/BookingList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {value === index && <Box sx={{ height: '100%', pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [refreshTrigger] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Technician Booking System
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="booking system tabs"
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="Chat" />
        <Tab label="My Bookings" />
      </Tabs>

      <Box sx={{ height: 'calc(100vh - 200px)' }}>
        <TabPanel value={tabValue} index={0}>
          <ChatInterface />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <BookingList refreshTrigger={refreshTrigger} />
        </TabPanel>
      </Box>
    </Container>
  );
}
