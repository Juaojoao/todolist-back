import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { CreateActivitiesListDto } from './dto/create-activities-list.dto';
import { UpdateActivitiesListDto } from './dto/update-activities-list.dto';

@Injectable()
export class ActivitiesListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateActivitiesListDto) {
    const FrameId = Number(data.frameId);

    const FrameExists = await this.prisma.frame.findFirst({
      where: { id: FrameId },
    });

    if (!FrameExists) {
      return { message: 'Frame does exists' };
    }

    await this.prisma.activitiesList.create({
      data: {
        name: data.name,
        frameId: FrameId,
      },
    });

    return 'Activity List created Successfully';
  }

  async update(id: number, data: UpdateActivitiesListDto) {
    const activitiesId = Number(id);
    const frameId = Number(data.frameId);

    if (!frameId || !activitiesId) {
      return { message: 'Frame or tasklist does exist' };
    }

    const taskListExists = await this.prisma.activitiesList.findFirst({
      where: { id: activitiesId, frameId: frameId },
    });

    if (!taskListExists) {
      return { message: 'Frame or tasklist does exist' };
    }

    await this.prisma.activitiesList.update({
      where: { id: activitiesId },
      data: {
        name: data.name,
        frameId: frameId,
      },
    });

    return 'Activity List updated Successfully';
  }

  async getAll() {
    return await this.prisma.activitiesList.findMany();
  }

  async delete(id: number, frameId: number) {
    const taskListId = Number(id);
    const frameUid = Number(frameId);

    if (!frameUid || !taskListId) {
      return { message: 'Frame or tasklist does exist' };
    }

    const taskListExists = await this.prisma.activitiesList.findFirst({
      where: { id: taskListId, frameId: frameUid },
    });

    if (!taskListExists) {
      return { message: 'Frame or tasklist does exist' };
    }

    await this.prisma.activitiesList.delete({
      where: { id: taskListId },
    });

    return 'Activity List deleted Successfully';
  }
}
