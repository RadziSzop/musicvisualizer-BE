import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { MergeService } from './merge.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, sotrageDir } from 'src/utils/storage';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import { Response } from 'express';
import * as path from 'path';
@Controller('merge')
export class MergeController {
  constructor(private readonly mergeService: MergeService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
      ],
      {
        storage: multerStorage(path.join(sotrageDir(), 'temp')),
      },
    ),
  )
  create(
    @UploadedFiles() files: MulterDiskUploadedFiles,
    @Res() res: Response,
  ) {
    return this.mergeService.merge(files, res);
  }

  @Get()
  findAll() {
    return 'a';
  }
}
