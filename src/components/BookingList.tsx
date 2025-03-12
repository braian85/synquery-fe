'use client';

import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { getBookings, deleteBooking } from '@/services/api';
import { Booking } from '@/types/api';

interface BookingListProps {
  refreshTrigger: number;
}

const BookingList: React.FC<BookingListProps> = ({ refreshTrigger }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await getBookings();
        setBookings(data);
        setError('');
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Failed to delete booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Current Bookings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {bookings.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No bookings found.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Technician</TableCell>
                <TableCell>Specialty</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.technician_name}</TableCell>
                  <TableCell>{booking.specialty}</TableCell>
                  <TableCell>
                    {dayjs(booking.booking_time).format('MMM D, YYYY h:mm A')}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Cancel Booking">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(booking.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default BookingList; 