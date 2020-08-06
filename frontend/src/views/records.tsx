import React, { useState, useEffect } from 'react';
import { Table,Divider } from 'antd';
import 'antd/dist/antd.css'; 
import MedService,{TableRowData} from '../services/med';
import "react-datepicker/dist/react-datepicker.css";

import RecordAction from '../components/RecordAction';

import Filter,{FilterState} from '../components/Filter';





interface Props {
  doctorId: number
}

const Records : React.FC<Props> = ({doctorId}) => {
    const columns = [
        {
          title: 'ФИО пациента',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Дата приёма',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Жалобы',
          dataIndex: 'complaint',
          key: 'complaint',
        },
        {
          title: 'Действие',
          key: 'action',
          render: ({status,rowDate,doctorId,id} : any) => {
              switch(status) {
                  case 'Oтменить':
                      return (
                      <span>
                          <a onClick={async ()=>{
                              await MedService.deleteRecord(id);
                              update();
                          }} className='action not-available'>Oтменить</a>
                      </span>
                      )
                  case 'Записать':
                      return(
                      <RecordAction onClose={()=>{
                          update();
                      }} doctorId={doctorId} date={rowDate}/>
                      );  
                  default:
                      return(
                          <div/>
                      );  
              }
          },
        },
    ];


    const [data,setData] = useState([] as Array<TableRowData>);
    const [isLoading,setLoading] = useState(false);
    const [select,setSelectData] = useState([] as Array<{id : number;fio : string}>);
    const [filterState,setState] = useState({date : new Date(),option : 1} as FilterState)

    useEffect(()=>{
        if(data.length == 0) {
            MedService.getRecordsByDoctorIdAndDate(doctorId).then((d)=>{
            setData(d.records);
            setLoading(false);
            })
        };
    })

    useEffect(()=>{
        if(select.length == 0 ){
            MedService.getAllDoctors()
            .then(data=>{
                setSelectData(data);
            })
    }
    })
    const handleFilterChange = ({option,date} : FilterState) => {
        setLoading(true);
        setState({option,date});
        MedService.getRecordsByDoctorIdAndDate(option,date).then((d)=>{
            setData(d.records);
            setLoading(false);
        })
    }

    const update = ()=>{
        setLoading(true);
        MedService.getRecordsByDoctorIdAndDate(filterState.option,filterState.date).then((d)=>{
            setData(d.records);
            setLoading(false);
            })
    }

    return (
        <React.Fragment>
            <Divider/>
            <Filter options={select} onChange={handleFilterChange}/>
            <div style={{width : '700px',margin : '0 auto'}}>
            <Table
                columns={columns}
                loading={isLoading}
                pagination={false}
                dataSource={data}
                bordered
            />
            </div>
        </React.Fragment>
    );
}

export default Records;