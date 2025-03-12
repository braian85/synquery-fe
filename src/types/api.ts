export interface Booking {
  id: string;
  technician_name: string;
  specialty: string;
  booking_time: string;
}

export interface BookingCreate {
  technician_name: string;
  specialty: string;
  booking_time: string;
}

export interface MessageRequest {
  message: string;
}

export interface MessageResponse {
  response: string;
}

export interface CalendarEvent {
  summary: string;
  description: string;
  start_time: string;
  end_time: string;
  attendees?: string[];
}

export interface CalendarEventResponse {
  event_id: string;
  html_link: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
} 