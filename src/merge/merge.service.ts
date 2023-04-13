import { Injectable } from '@nestjs/common';
import { MulterDiskUploadedFiles } from 'src/interfaces/files';
import * as fs from 'fs/promises';
import * as ffmpeg from 'fluent-ffmpeg';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { sotrageDir } from 'src/utils/storage';
import * as path from 'path';
@Injectable()
export class MergeService {
  async merge(files: MulterDiskUploadedFiles, res: Response) {
    const video = files?.video?.[0] ?? null;
    const audio = files?.audio?.[0] ?? null;
    if (video === null || audio === null) {
      res.statusCode = 400;
      res.json({ error: 'Audio and video files are required' });
    } else {
      const outputFilename = uuid();
      try {
        const relativeVideoPath = './storage/temp/' + video.filename;
        const relativeAudioPath = './storage/temp/' + audio.filename;
        const args = ['-c:v', 'copy', '-af', 'apad', '-shortest'];
        const command = ffmpeg()
          .input(relativeVideoPath)
          .input(relativeAudioPath)
          .outputOptions(args)
          .output(`./storage/output/${outputFilename}.mp4`);
        await new Promise((resolve) => {
          command.on('end', () => {
            resolve('Success');
          });
          command.on('error', () => {
            throw new Error();
          });
          command.run();
        });
        res.sendFile(`${outputFilename}.mp4`, {
          root: path.join(sotrageDir(), 'output'),
        });
        await fs.unlink(video.path);
        await fs.unlink(audio.path);
        await fs.unlink(`./storage/output/${outputFilename}.mp4`);
      } catch (error) {
        res.statusCode = 503;
        res.json({ error: 'Server error, try again later' });
        fs.unlink(video.path).catch();
        fs.unlink(audio.path).catch();
        fs.unlink(`./storage/output/${outputFilename}.mp4`).catch();
      }
    }
  }
}
