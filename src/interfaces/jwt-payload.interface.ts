import { Types } from 'mongoose';

export interface JwtPayload {
  sub: Types.ObjectId; // User ID
  iat?: number; // Issued At (optional)
  exp?: number; // Expiration Time (optional)
}
