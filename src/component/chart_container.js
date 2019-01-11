import React, { Component } from 'react';
import {fetch_points} from '../actions';
import CusSVG from "./chart_component";
import "./component.css";
import * as d3 from "d3";
import { connect} from 'react-redux';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from 'recharts';
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state =
    {teams: ["Golden State Warriors"],
     filter:"Both"
     };
 this.node = React.createRef();
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
      this.getRandomColor = this.getRandomColor.bind(this);
      this.handleChangeFilter = this.handleChangeFilter.bind(this);
      

  }
  componentDidMount(){

     this.props.fetch_points();


  }


  handleChangeTeam(e) {
    var options = e.target.options;

    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({teams:value});

 }
 handleChangeFilter(e){
   console.log(e.target.value);
    this.setState({filter:e.target.value});
 }
 getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++) {
  color += letters[Math.floor(Math.random() * 16)];
}
return color;
}


  render() {

   if(this.props.total===null)return (<div>loading..</div>);
   var display=[];
  var start=this.props.total.list[0];
  var end=this.props.total.list[this.props.total.list.length-1];

   for(var i=0;i<this.state.teams.length;i++){
      var cur=this.state.teams[i];
      var arr=this.props.total.res.filter(i=>(i["Team"]===cur));
      var color=this.getRandomColor();
      if(this.state.filter!=="Both"){
        arr=arr.filter(i=>(i["Home/Away"]===this.state.filter));
      }
      display.push({name:cur,data:arr,color:color});
   }
    //if(this.node.current!==null)this.draw(display,start,end);
    return (
      <div className="container-fluid chart-container">

      <form >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputTeam">Team</label>
            <select id="inputTeam" multiple class="form-control" onChange={this.handleChangeTeam}>
           <option value="Atlanta Hawks">  Atlanta Hawks</option>
 <option value="Boston Celtics">Boston Celtics </option>
 <option value="Brooklyn Nets">Brooklyn Nets</option>
 <option value="Charlotte Hornets">Charlotte Hornets </option>
 <option value="Chicago Bulls">Chicago Bulls </option>
 <option value="Cleveland Cavaliers">Cleveland Cavaliers </option>
 <option value="Dallas Mavericks">Dallas Mavericks </option>
 <option value="Denver Nuggets">Denver Nuggets </option>
 <option value="Detroit Pistons">Detroit Pistons </option>
 <option selected value="Golden State Warriors">Golden State Warriors </option>
 <option value="Houston Rockets">Houston Rockets </option>
 <option value="Indiana Pacers">Indiana Pacers </option>
 <option value="Los Angeles Clippers">Los Angeles Clippers </option>
 <option value="Los Angeles Lakers">Los Angeles Lakers </option>
 <option value="Memphis Grizzlies">Memphis Grizzlies </option>
 <option value="Miami Heat">Miami Heat </option>
 <option value="Milwaukee Bucks">Milwaukee Bucks </option>
 <option value="Minnesota Timberwolves">Minnesota Timberwolves </option>
 <option value="New Orleans Pelicans">New Orleans Pelicans</option>
 <option value="New York Knicks">New York Knicks </option>
 <option value="Oklahoma City Thunder">Oklahoma City Thunder </option>
 <option value="Orlando Magic">Orlando Magic </option>
 <option value="Philadelphia Sixers">Philadelphia Sixers </option>
 <option value="Phoenix Suns">Phoenix Suns </option>
 <option value="Portland Trail Blazers">Portland Trail Blazers </option>
 <option value="Sacramento Kings">Sacramento Kings </option>
 <option value="San Antonio Spurs">San Antonio Spurs </option>
 <option value="Toronto Raptors">Toronto Raptors </option>
 <option value="Utah Jazz">Utah Jazz </option>
 <option value="Washington Wizards">Washington Wizards</option>

             </select>
             </div>
              <div className="form-group col-md-6">
              <label for="HomeOrAway">show only points scored as visitor, home or both </label>
              <select id="inputHomeOrAway" className="form-control" onChange={this.handleChangeFilter}>
                 <option value="Both" selected >Both</option>
                  <option value="H">Home</option>
                   <option value="A">Visitor</option>
               </select>
             </div>
           </div>
      </form>

      <div className="row">
      <div className="col-md-10 offset-md-1" >

        <CusSVG start={start} end={end} display={display}/>

      </div>
      </div>

      </div>
    );

  }
}

function mapStateToProps({ total }) {
  return { total };
}

export default connect(mapStateToProps, { fetch_points})(Chart);
