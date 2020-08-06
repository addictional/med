import CustomDate from '../utilities/CustomDate'; 
export interface TableRowData { 
    date : string;
    name : string;
    isAvailable : boolean;
    action: string,
    doctorId : number;
    complaint : string;
    id: number;
    rowDate : Date;
 }

export interface DoctorRow {
    fio : string;
    id : number;
}

export default class MedService {
    public static async getRecordsByDoctorIdAndDate(id : number , date = new Date()) : Promise<{doctor : any,records : Array<TableRowData>} >{
        try{
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          const queryParams = `?date=${date.toLocaleDateString()}`;  
          const response = await fetch(`/doctors/${id}/${queryParams}`);
          const data = await response.json();
          return {...data,records : data.records.map((record : any,key : number) => { 
            let date = new Date(record.date);
            /** reset timezone */
            date = new Date(date.getTime() - Math.abs(date.getTimezoneOffset()*60000));

            /**create custom date */
            const customDate =  new CustomDate(date);
            const formattedDateString = 
                `${customDate.getDateFormatedString()}.${customDate.getMonthFormatedString()}.${date.getFullYear()} ${customDate.getHours()}:${customDate.getMinutesFormatedString()}`;

            /** formating name */
            const name = record.fio === '' ? 'Пусто' : record.fio;


            return {
                key,
                name,date : formattedDateString,
                rowDate : date,
                id: record.id,
                doctorId : data.doctor.id,
                isAvailable : record.isAvailable,
                status : record.isAvailable ? 'Записать' : 'Oтменить',
                complaint : record.complaint
            };
          })};
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public static async deleteRecord(id : number){
        return await fetch('/doctors/record',{
            method: 'DELETE',
            body : JSON.stringify({id}),
            headers : [['Content-type','application/json']]
        });
    }

    public static async addRecord(fio: string,date : CustomDate,doctorId : number,complaint : string){
        const time = date.toTimeString().substring(0,8);
        const parsedDate = `${date.getFullYear()}-${date.getMonthFormatedString()}-${date.getDateFormatedString()}T${time}.000Z`;
        return await fetch('/doctors/record',{
            method : 'POST',
            body : JSON.stringify({complaint,doctorId, date: parsedDate,fio}),
            headers : [['Content-type','application/json']]
        });
    }


    public static async getAllDoctors() : Promise<Array<DoctorRow>> {
        try {
            const response = await fetch('/doctors/');
            const data = await response.json();
            return data.map(({surname,name,secondName,id} : any)=>{
                return {fio : `${surname} ${name} ${secondName}`,id}
            })
        } catch(e) {
            throw new Error(e.message);
        }
    }
}