import React, { Component } from 'react';
import {Post,fetch_points} from '../actions';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./component.css";
import { connect} from 'react-redux';

class DataForm extends Component {
  constructor(props) {
 super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    //console.log(this.state.value);
    this.props.Post(this.state.value);

    //event.preventDefault();
  }
  
  render() {
    return(

      <form>
      <div class="form-group">
    <label for="exampleFormControlTextarea1">Paste your data to dram a chart</label>
    <textarea class="form-control" rows="5" name="inputfordata"
    onChange={this.handleChange}
    placeholder="Please make sure your input fill this format:'Date,Start (ET),Visitor/Neutral,PTS,Home/Neutral,PTS,,,Attend.,Notes' "></textarea>
  </div>
  <div class="form-group">
<button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
</div>
</form>

)
}
}




export default connect(null,{Post,fetch_points})(DataForm);
