import { Module } from '@nestjs/common';
import DoctorController from './app.controller';
import DoctorService from './app.service';

@Module({
  imports: [],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class AppModule {}
