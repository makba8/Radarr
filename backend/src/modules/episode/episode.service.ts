import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './episode.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
  ) {}

  findAll(): Promise<Episode[]> {
    return this.episodeRepository.find();
  }

  findOne(id: number): Promise<Episode> {
    return this.episodeRepository.findOne({ where: { id } });
  }

  create(episode: Partial<Episode>): Promise<Episode> {
    return this.episodeRepository.save(episode);
  }

  async remove(id: number): Promise<void> {
    await this.episodeRepository.delete(id);
  }
}
