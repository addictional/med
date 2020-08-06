import { 
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Delete
} from '@nestjs/common';
import Service  from './app.service';
import {Request} from 'express';

@Controller('doctors')
export default class DoctorController {
  constructor(private readonly Service: Service) {}


  @Get()
  async getAll(){
    return await this.Service.getAll();
  }
  
  @Post('record')
  async setRecord(@Req() req : Request,@Body() body) {
      const userId = await this.Service.getUserId(req.sessionID,req.session);
      return this.Service.createRecord(userId,body.doctorId,body.complaint,new Date(body.date),body.fio);
  }

  @Delete('record')
  async deleteRecord(@Req() req : Request,@Body() {id}) {
      this.Service.deleteRecord(id);
      return true;
  }

  @Get(':id')
  async getById(@Param() {id},@Req() req : Request  ){
    const userId = req.session.userId;
    if(req.query.date) {
        return await this.Service.getByIdAndDateWithRecords(id,new Date(req.query.date as string),);
    }
    return await this.Service.getByIdAndDateWithRecords(id);
  }
}
