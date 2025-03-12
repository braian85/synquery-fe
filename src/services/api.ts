import axios from 'axios';
import { Booking, BookingCreate, MessageRequest, MessageResponse, CalendarEvent, CalendarEventResponse } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>('/bookings');
  return response.data;
};

export const getBooking = async (id: string): Promise<Booking> => {
  const response = await api.get<Booking>(`/bookings/${id}`);
  return response.data;
};

export const createBooking = async (booking: BookingCreate): Promise<Booking> => {
  const response = await api.post<Booking>('/bookings', booking);
  return response.data;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await api.delete(`/bookings/${id}`);
};

export const sendMessage = async (message: string): Promise<string> => {
  const response = await api.post<MessageResponse>('/chat', { message } as MessageRequest);
  return response.data.response;
};

export const sendMessageDirect = async (message: string): Promise<string> => {
  const response = await api.post<MessageResponse>('/api/messages/direct', { message } as MessageRequest);
  return response.data.response;
};

export const createCalendarEvent = async (event: CalendarEvent): Promise<CalendarEventResponse> => {
  const response = await api.post<CalendarEventResponse>('/calendar/events', event);
  return response.data;
}; 