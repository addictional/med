import React,{useState, useEffect} from 'react';
import { Form, Input, Button,Select,Radio,message,Divider } from 'antd';
import MedService,{TableRowData,DoctorRow} from '../services/med';
import CustomDate from '../utilities/CustomDate';

const {Option} = Select;




const columns = [
  {
    title: 'Дата',
    dataIndex: 'date',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
  },
//   {
//     title: 'Действие',
//     key: 'action',
//     render: ({status,rowDate,doctorId,id} : any) => {
//       return (
//         <a></a>
//       );
//     },
//   },
];



interface Props {
  doctorId: number
}
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    width : 700,
    border: '1px solid #d9d9d9',
    borderTop: 'none'
  };

const FormView : React.FC = () => {
  const current = new Date();
  current.setDate(current.getDate() + 1);
  const [date,setDate] = useState(current);
  const [intervals,setItntervals] = useState([] as Array<TableRowData> );
  const [doctors,setDoctors] = useState([] as Array<DoctorRow>);
  
  const update = async (doctor: number,date : CustomDate) => {
        const data = await MedService.getRecordsByDoctorIdAndDate(doctor,date);
        setItntervals(data.records);
  }

  useEffect(()=>{
      if(doctors.length == 0) {
        MedService
            .getAllDoctors()
            .then((doctors)=>{
                setDoctors(doctors);
            });
      }
  })

  const handleSubmit  = async ({fio,doctor,complaint,date} : any) => {
      try {
        complaint = complaint || '';
        date = new CustomDate(date);
        setDate(date);
        await MedService.addRecord(fio,date,doctor,complaint);
        message.success('Добавлено');
      } catch {
          message.error('Ошибка');
      }
      update(doctor,date);
  }

  const getRadioStyle = (index : number) =>{
    const radioStyle : React.CSSProperties = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        width : 700,
        border: '1px solid #d9d9d9',
        borderTop: 'none',
        paddingLeft: 7
    };
    if(index == 0) {
        radioStyle.borderTop = '1px solid #d9d9d9';
    }
    return radioStyle;
  }

  return (
    <React.Fragment>
      <Divider/>
      <div className="main-form"> 
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item 
                  label="Врач"
                  name="doctor"
                  rules={[{ required: true, message: 'Пожалуйста, выберите врача' }]}
                >
                    <Select onSelect={async (value)=>{
                        const data = await MedService.getRecordsByDoctorIdAndDate(value as number,date);
                        setItntervals(data.records)
                    }} >
                        {(()=>{
                            return doctors.map(({id,fio}) => {
                                return <Option value={id}>{fio}</Option>
                            })
                        })()}
                    </Select>
                </Form.Item>    
                <Form.Item 
                  label="ФИО"
                  name="fio"
                  rules={[{ required: true, message: 'Пожалуйста, введите ваше фио' }]}
                >
                  <Input/>
                </Form.Item>
                <Form.Item label="Жалобы" name="complaint">
                  <Input.TextArea rows={10}/>
                </Form.Item>
                <Form.Item 
                    label="Дата"
                    name="date" 
                    rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
                >
                    <Radio.Group>
                            {(()=>{
                                return intervals.map(({isAvailable,date,rowDate},index) =>{
                                    // console.log(data);
                                    const color = isAvailable ? 'green' : 'red';
                                    const status = isAvailable ? 'Свободно' : 'Занято';
                                    return (
                                        <Radio style={getRadioStyle(index)} value={rowDate} disabled={!isAvailable}>
                                            <span className="radio-date">{date}</span> <span className="radio-status" style={{color}}>{status}</span>
                                        </Radio>
                                    )
                                })
                            })()}
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button  type="primary" htmlType="submit">
                    Записаться
                  </Button>
                </Form.Item>
              </Form>
        </div>
    </React.Fragment>
  );
}

export default FormView;