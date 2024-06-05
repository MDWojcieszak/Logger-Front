import { z } from 'zod';
import { api } from '~/adapters/api';
import { ApiTag } from '~/api/types';
import { PaginationDto } from '~/api/types';

const StreamDto = z.object({
  name: z.string(),
});

export type StreamDto = z.infer<typeof StreamDto>;

const CreateStreamResponse = z.object({
  id: z.string(),
  name: z.string(),
  token: z.string(),
});

export type CreateStreamResponse = z.infer<typeof CreateStreamResponse>;

const UserData = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const StreamType = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  createdBy: UserData,
  name: z.string(),
});

export type StreamType = z.infer<typeof StreamType>;

const StreamDataResponse = z.object({
  total: z.number(),
  streams: z.array(StreamType),
  params: PaginationDto,
});

export type StreamDataResponse = z.infer<typeof StreamDataResponse>;

const StreamId = z.object({
  id: z.string(),
});

export type StreamId = z.infer<typeof StreamId>;

export const StreamService = {
  tag: ApiTag.STREAM,

  async create(userData: StreamDto) {
    try {
      const response = await api(StreamService.tag).post('create', {
        body: userData,
      });
      return CreateStreamResponse.parse(response);
    } catch (error) {
      console.error('Error creating stream:', error);
      throw error;
    }
  },

  async get(data: StreamId): Promise<StreamType> {
    try {
      const response = await api<StreamId>(StreamService.tag).get('', {
        body: data,
      });
      return StreamType.parse(response);
    } catch (error) {
      console.error('Error getting stream:', error);
      throw error;
    }
  },

  async getList(data: PaginationDto): Promise<StreamDataResponse> {
    try {
      const response = await api<PaginationDto>(StreamService.tag).get('list', {
        body: data,
      });
      return StreamDataResponse.parse(response);
    } catch (error) {
      console.error('Error getting streams list:', error);
      throw error;
    }
  },

  async delete(data: StreamId) {
    try {
      const response = await api<StreamId>(StreamService.tag).delete('', {
        body: data,
      });
      return response;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },
};
