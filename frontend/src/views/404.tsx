import React from 'react';
import { Result, Button } from 'antd';

const NotFound : React.FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, данной страницы не существует"
            extra={<Button type="primary">На главную</Button>}
        />
    )
}

export default NotFound;