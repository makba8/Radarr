import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media } from './media.entity';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  findAll(): Promise<Media[]> {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Media> {
    return this.mediaService.findOne(id);
  }

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.mediaService.remove(id);
  }
}
