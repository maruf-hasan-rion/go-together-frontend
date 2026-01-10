/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserInfo } from "./user.interface";

// export type Role = "USER" | "HOST" | "ADMIN";
export type EventStatus =
  | "OPEN"
  | "FULL"
  | "CANCELLED"
  | "COMPLETED"
  | "PENDING"
  | "REJECTED";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

// export interface User {
//   id: string;
//   email: string;
//   fullName: string;
//   role: Role;
//   profileImage?: string;
//   bio?: string;
//   location?: string;
//   interests: string[];
//   isActive: boolean;
//   createdAt: string;
//   updatedAt?: string;
//   averageRating?: string;
//   _count?: {
//     hostedEvents: number;
//     bookings: number;
//     receivedReviews: number;
//   };
//   hostedEvents?: Event[];
//   bookings?: Booking[];
//   receivedReviews?: Review[];
// }

export interface Event {
  id: string;
  title: string;
  type: string[];
  description: string;
  eventDate: string;
  location: string;
  minParticipants: number;
  maxParticipants: number;
  joiningFee: number;
  image?: string;
  status: EventStatus;
  hostId: string;
  host: {
    id: string;
    fullName: string;
    profilePhoto?: string;
    averageRating?: string;
    receivedReviews?: { rating: number }[];
  };
  _count?: {
    bookings: number;
  };
  bookings?: Booking[];
  reviews?: Review[];
  createdAt: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  status: BookingStatus;
  amount: number;
  user?: UserInfo;
  event?: Event;
  payment?: Payment;
  createdAt: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  booking?: Booking;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  hostId: string;
  eventId: string;
  user: {
    fullName: string;
    profileImage?: string;
  };
  event?: {
    name: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: UserInfo;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminStats {
  stats: {
    totalUsers: number;
    totalHosts: number;
    totalEvents: number;
    totalBookings: number;
    totalRevenue: number;
  };
  recentBookings: Booking[];
  recentEvents: Event[];
}

export interface EventFilters {
  search?: string;
  type?: string;
  location?: string;
  status?: EventStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateEventData {
  name: string;
  type: string;
  description: string;
  date: string;
  location: string;
  minParticipants?: number;
  maxParticipants: number;
  joiningFee: number;
  image?: File;
}

export interface UpdateProfileData {
  fullName?: string;
  bio?: string;
  location?: string;
  interests?: string[];
  profileImage?: File;
}

export interface CreateReviewData {
  eventId: string;
  rating: number;
  comment?: string;
}
export interface IBookedEvent {
  id: string;
  transactionId: string;
  eventId: string;
  clientId: string;
  createdAt: string;
  participantStatus: string;
  event: Event;
  client: UserInfo;
  hasReviewed?: boolean;
}
