import { IsString } from 'class-validator';

export class MergeDto {
  @IsString()
  name: string;

  file: any;
}
