import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './media.entity';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  findAll(): Promise<Media[]> {
    return this.mediaRepository.find();
  }

  findOne(id: number): Promise<Media> {
    return this.mediaRepository.findOne({ where: { id } });
  }

  create(createMediaDto: CreateMediaDto) {
    const newMedia = { id: Date.now(), ...createMediaDto };
    this.mediaRepository.save(newMedia);
    return newMedia;
  }

  async remove(id: number): Promise<void> {
    await this.mediaRepository.delete(id);
  }
}
