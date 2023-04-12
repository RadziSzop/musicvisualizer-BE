import { Injectable } from '@nestjs/common';
import { MergeDto } from './dto/merge.dto';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import * as fs from 'fs/promises';
import * as ffmpeg from 'fluent-ffmpeg';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { sotrageDir } from 'src/utils/storage';
import * as path from 'path';
@Injectable()
export class MergeService {
  async merge(
    createMergeDto: MergeDto,
    files: MulterDiskUploadedFiles,
    res: Response,
  ) {
    const video = files?.video[0] ?? null;
    // const audio = files?.audio[0] ?? null;
    const relativeVideoPath = './storage/temp/' + video.filename;
    // const relativeAudioPath = './storage/temp/' + audio.filename;
    // console.log({ video, audio });
    const args = ['-c:v', 'copy', '-af', 'apad', '-shortest'];
    const outputFilename = uuid();
    const command = ffmpeg()
      .input(relativeVideoPath)
      .input('audio.mp3')
      // .input(relativeAudioPath)
      .outputOptions(args)
      .output(`./storage/output/${outputFilename}.mp4`);
    await new Promise((resolve, reject) => {
      command.on('end', () => {
        console.log('Finished processing video');
        resolve(null);
      });
      command.on('error', (error) => {
        reject(error);
      });
      command.run();
    });
    fs.unlink(video.path);
    // fs.unlink(audio.path);
    res.sendFile(`${outputFilename}.mp4`, {
      root: path.join(sotrageDir(), 'output'),
    });
  }
}
