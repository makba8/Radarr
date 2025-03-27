import { IsNotEmpty, IsString, IsIn, IsInt } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty()
  tmdb_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsIn(['Série', 'Animé', 'Film'])
  type: string;

  @IsString()
  @IsIn(['onProgress', 'completed'])
  status: string;
}
