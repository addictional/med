import React from 'react';
import Records from './views/records';
import NotFound from './views/404';
import Form from './views/form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/antd.css'; 




const App : React.FC = () => {
  

  return (
    <Router>
      <Switch>
       <Route exact path="/" component={Form}/>
       <Route 
          path="/records"
          render={(props)=>{
            return <Records {...props} doctorId={1}/>
          }}
        />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;