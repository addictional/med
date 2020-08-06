import React, { useState} from 'react';
import Popup from 'reactjs-popup';
import CustomDate from '../utilities/CustomDate';
import { Result} from 'antd';
import MedService from '../services/med';
import QuickForm,{SubmitData} from './QuickForm'



interface Props {
    date : Date;
    doctorId: number;
    onClose?() : void;
}

type STATUS = 'success' | 'error' | '';


const RecordAction : React.FC<Props> = ({date,doctorId,onClose}) =>{

    const [status,setStatus] = useState('' as STATUS);
    const customDate = new CustomDate(date);
    const time = date.toTimeString().substring(0,8);


    const handleSubmit = async ({complaint,fio} : SubmitData) => {
        const parsedDate = `${customDate.getFullYear()}-${customDate.getMonthFormatedString()}-${customDate.getDateFormatedString()}T${time}.000Z`;
        try {
            const data = await MedService.addRecord(fio,customDate,doctorId,complaint);
            setStatus('success');
        }catch (e) {
            setStatus('error');
        }
    }

    const html =  status === '' ? <QuickForm onSubmit={handleSubmit}/> : <Result
        status={status}
        title={status === 'success' ? "Вы успешно записаны на прием ко врачу" : 'Ошибка'}
        subTitle={
            status === 'success' ? 
                `Дата приёма: ${customDate.getDateFormatedString()} ${customDate.getMonthName().plural}  ${time}` :
                'Запись недоступна'
        } 
    />;   

    return (
        <Popup
            onClose={()=>{
                if(typeof onClose === 'function'){
                    onClose();
                }
            }}
            trigger={() => (
            <a className='action available-record'>Записать</a>
            )}
            position="center center"
            closeOnDocumentClick
            modal
          >
            <div className="quick-form"> 
              {html}
            </div>
        </Popup>
    )
}

export default RecordAction;