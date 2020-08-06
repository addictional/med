import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { Select  } from 'antd';
import MedService from '../services/med';

const { Option } = Select;

export interface FilterState {
    date : Date,
    option : number;
}

interface Props {
    options : Array<{
        fio: string;
        id : number;
    }>
    onChange?( value : FilterState) : void;
}



const Filter: React.FC<Props> = ({options,onChange}) => {
    const [state , setState]  = useState({date : new Date(),option : 1} as FilterState);
    

    const handleDateChange = (date : Date) =>  {
        setState({...state,date});
        if(typeof onChange == 'function') {
            onChange({option: state.option,date});
        }
    }   
    

    const handleSelect = (option : any) =>  {
        setState({...state,option});
        if(typeof onChange == 'function') {
            onChange({date: state.date,option});
        }
    }   

    return (
        <div style={{display: 'flex',width : '700px',margin : '20px auto'}}>
          <span style={{marginRight: '10px'}}>Фильтр: </span>
          <DatePicker className='date-picker' selected={state.date} onChange={handleDateChange}/>
          <Select onSelect={handleSelect}   defaultValue={state.option} loading={options.length == 0} size="small"  style={{ width: 250 }}>
              {(()=>{
                return options.map(({id,fio}) => {
                  return <Option  key={id} value={id}>{fio}</Option>
                })
              })()}
          </Select>
        </div>
    )
}


export default Filter;