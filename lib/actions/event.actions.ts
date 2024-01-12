"use server";

import { connectToDatabase } from '@/lib/database';
import Event from '@/lib/database/models/event.model';
import { handleError } from '@/lib/utils';
import { CreateEventParams } from '@/types';
import { revalidatePath } from 'next/cache';
import User from '../database/models/user.model';

export const createEvent = async ({ userId, event, path }: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) throw new Error('Organazer not found.');

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}