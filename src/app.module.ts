import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MergeModule } from './merge/merge.module';

@Module({
  imports: [MergeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
