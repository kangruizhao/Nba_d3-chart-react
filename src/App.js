import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './component/chart_container';
import Header from './component/header';
import DataForm from './component/text_form';

import { connect} from 'react-redux';
class App extends Component {

  render() {
   if(this.props.total===null)return (<div>loading..</div>);
   //console.log(this.props.total);
    return (
      <div>
       <Header/>
       <Chart/>
       <DataForm/>
       </div>
    );
  }
}

export default App;
