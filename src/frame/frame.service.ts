import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { CreateFrameDto } from './dto/create-frame.dto';

@Injectable()
export class FrameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFrameDto) {
    const userId = Number(data.userId);

    const userExists = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    if (!userExists) {
      return { message: 'User does not exist' };
    }

    await this.prisma.frame.create({
      data: {
        name: data.name,
        userId: userId,
      },
    });

    return 'Frame created successfully';
  }

  async findAll() {
    return await this.prisma.frame.findMany();
  }

  async update(id: number, data: CreateFrameDto) {
    const frameId = Number(id);
    const userId = Number(data.userId);

    if (!userId || !frameId) {
      return { message: 'User or Frame does not exist' };
    }

    const userExists = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    const frameExists = await this.prisma.frame.findFirst({
      where: { id: frameId },
    });

    if (!userExists || !frameExists) {
      return { message: 'User or Frame does not exist' };
    }

    await this.prisma.frame.update({
      where: { id: frameId },
      data: {
        name: data.name,
        userId: userId,
      },
    });

    return 'Frame updated successfully';
  }

  async delete(id: number, userId: number) {
    const frameId = Number(id);
    const frameUserId = Number(userId);

    if (!frameId || !frameUserId) {
      return { message: 'User or Frame does not exist' };
    }

    const userExists = await this.prisma.user.findFirst({
      where: { id: frameUserId },
    });

    const frameExists = await this.prisma.frame.findFirst({
      where: { id: frameId },
    });

    if (!userExists || !frameExists) {
      return { message: 'User or Frame does not exist' };
    }

    await this.prisma.frame.delete({
      where: { id: frameId },
    });

    return 'Frame deleted successfully';
  }
}
