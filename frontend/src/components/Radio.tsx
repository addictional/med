import React,{useState} from 'react';
import { Form, Input, Button,Select,Radio } from 'antd';
import MedService,{TableRowData} from '../services/med';
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



const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    width : 700,
    borderBottom: '1px solid #d9d9d9'
  };

interface Props {
    options : Array<TableRowData>;
}  

const CustomRadio : React.FC<Props> = ({options}) => {

  return (
        <Radio.Group>
                {(()=>{
                    return options.map(({isAvailable,date,rowDate},index) =>{
                        // console.log(data);
                        const color = isAvailable ? 'green' : 'red';
                        const status = isAvailable ? 'Свободно' : 'Занято';
                        return (
                            <Radio style={radioStyle} value={rowDate} disabled={!isAvailable}>
                                <span className="radio-date">{date}</span> <span className="radio-status" style={{color}}>{status}</span>
                            </Radio>
                        )
                    })
                })()}
        </Radio.Group>
  );
}

export default CustomRadio;