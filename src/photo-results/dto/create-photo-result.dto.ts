import { IsOptional, IsString } from 'class-validator';

export class CreatePhotoResultDto {
  @IsOptional()
  @IsString()
  sessionId?: string;
}
