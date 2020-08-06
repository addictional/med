import { Injectable } from '@nestjs/common';
import Models from './models';
import {Op} from 'sequelize';
import RecordModel from 'src/models/records';
const {User,Record} = Models;
@Injectable()
export default class Service {
    private defaultIntervals: Array<{date : number,isAvailable : boolean}> = [];
    private currentDate =  new Date().setHours(0, 0, 0, 0); 
  
  
    /** legacy */
    private getDefaultIntervals(date : number) {  
      let defaultDate = new Date(date);
      defaultDate.setHours(9);
      this.defaultIntervals = Array.from(Array(19).keys()).map(()=>{
          let result =  {date : defaultDate.getTime(),fio : '',isAvailable : true};
          defaultDate = new Date(defaultDate.getTime() + 30*60000);
          return result;
      });

      return this.defaultIntervals;
    }
  
    /** legacy */
    private async getRecordsByDoctorId(id : number,date : Date) {
      const TODAY_START = date.setHours(0, 0, 0, 0);
      const NEXT_DAY = new Date(date).setHours(23, 59, 59, 59);
      const data = Array.from(await Record.findAll({
          where : {
              doctor_id:id,
              date : {
                  [Op.between] : [
                      TODAY_START,
                      NEXT_DAY
                  ]
              },
          },
          include : RecordModel.associations.patient,
          order : [['date','ASC']]
      }));
      return this.getDefaultIntervals(TODAY_START).map(interval => {
          const index = data.findIndex((el=>{
              return el.date.getTime() === interval.date;
          }))
          if(index != -1) {
              const { complaint,fio,id} = data[index];
              return {...interval,fio,complaint,id,isAvailable : false};
          }
          return interval;
      });
  
    }

    private async getDoctorInfoById(id : number) {
        const {name,surname,second_name} = await User.findByPk(id);
        return {name ,surname, secondName : second_name,id}

    }


    public async getAll() {
        const data = await User.findAll({
            where:{
                group_id : 2
            },
        });
        return Array.from(data).map(user => {
            return {name : user.name,surname: user.surname,secondName : user.second_name,id : user.id};
        })
    }
    /** Была  проблема с типизацией когда пытался заджоинить модель, мало времени было разбираться */
    public async getByIdAndDateWithRecords(id : number,date? : Date) {
        date = date || new Date();
        return {
            doctor : await this.getDoctorInfoById(id),
            records : await this.getRecordsByDoctorId(id,date)
        };
    }

    public async getUserId(session_id : string,session ) : Promise<number> {
        if(session.userId) {
            return session.userId;
        }
        let user = await User.findOne(
            {
                where: {
                    session_id
                },
            }
        );
        if(!user) {
            user = await User.create({
                name : 'аноним',
                surname : 'аноним',
                second_name : 'аноним',
                group_id : 1,
                session_id
            })
        }
        session.userId = user.id;
        return user.id;
    }

    public async createRecord(user_id : number,doctor_id : number,complaint : string,date : Date,fio : string) {
        complaint = complaint || '';
        await Record.create({
            user_id,
            doctor_id,
            date,
            complaint,
            fio 
        })
        return true;
    }

    public async deleteRecord(id : number) {
        await Record.destroy({
            where: {
                id
            }
        })
        return true;
    }
}