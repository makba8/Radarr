import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { Episode } from './episode.entity';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  findAll(): Promise<Episode[]> {
    return this.episodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Episode> {
    return this.episodeService.findOne(id);
  }

  @Post()
  create(@Body() episode: Partial<Episode>): Promise<Episode> {
    return this.episodeService.create(episode);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.episodeService.remove(id);
  }
}
