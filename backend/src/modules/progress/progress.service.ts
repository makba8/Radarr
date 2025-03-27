import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from './progress.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  findAll(): Promise<Progress[]> {
    return this.progressRepository.find();
  }

  findOne(id: number): Promise<Progress> {
    return this.progressRepository.findOne({ where: { id } });
  }

  create(progress: Partial<Progress>): Promise<Progress> {
    return this.progressRepository.save(progress);
  }

  async remove(id: number): Promise<void> {
    await this.progressRepository.delete(id);
  }
}
