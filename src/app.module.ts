import { Module } from '@nestjs/common';
import { MergeModule } from './merge/merge.module';

@Module({
  imports: [MergeModule],
})
export class AppModule {}
