import React from 'react';
import { Form, Input, Button } from 'antd';


interface Props {
    onSubmit?(data : SubmitData) : void,
}

export interface SubmitData {
    complaint: string;
    fio: string;
}


const QuickForm : React.FC<Props> = ({onSubmit})=>{
    const handleSubmit = (data : any) => {
        if(typeof onSubmit === "function") {
            onSubmit(data);
        }
    }
    return (
        <div className="quick-form"> 
              <Form onFinish={handleSubmit} layout="vertical">
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
                <Form.Item>
                  <Button  type="primary" htmlType="submit">
                    Записаться
                  </Button>
                </Form.Item>
              </Form>
        </div>
    );
}


export default QuickForm;