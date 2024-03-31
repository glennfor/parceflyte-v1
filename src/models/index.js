import { model } from 'mongodb';
import { flightSchema } from './schemas/flight';

export const Flight = model('Flight', flightSchema);
