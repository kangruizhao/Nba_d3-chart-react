import React, { Component } from 'react';
import {fetch_points} from '../actions';
import "./component.css";
import * as d3 from "d3";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from 'recharts';
class CusSVG extends Component {
  constructor(props) {
    super(props);


      this.draw = this.draw.bind(this);

  }
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.display !== prevProps.display) {
    this.draw(this.props.display,this.props.start,this.props.end);
  }
}
  draw(display,start,end){
    var margin = {top: 20, right: 20, bottom: 30, left: 30};

    //if(main===undefined) return;
    var main=d3.select("svg");
    if(main===undefined) return;
    main.selectAll("*").remove();
     main.append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    main=main.select("g");
    var xScale  = d3.scaleTime()
     .domain([start, end])
     .range([0, 1300])


     var data=display[0].data;

     // var ymax=d3.max(data,function(d) {
     //     return parseInt(d["PTS"]);
     // })
     var ymaxarray=display.map(team=>d3.max(team.data,function(d) {
         return parseInt(d["PTS"]);
     }));

     var ymax=d3.max(ymaxarray);
     var yScale = d3.scaleLinear()
         .domain([0,ymax])
         .range([400, 0])

         ;
         var xAxis = d3.axisBottom(xScale)
         .ticks(d3.timeDay.every(4))
         .tickFormat(d3.timeFormat("%m / %d / %y"));

           var yAxis = d3.axisLeft(yScale)
          //var main= select(node);
          //console.log(main);
         var formatTime = d3.timeFormat("%m / %d / %y");
          main.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + (400 - 0 - 0) + ')')
          .call(xAxis);

  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  main.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0)')
          .call(yAxis);
        display.map(team=>{
          var haha=main.append('g')
                  .attr('class', 'axis')
                  .attr('transform', 'translate(0)')
            console.log(team);
              var data=team.data;
              var line = d3.line()
              .curve(d3.curveLinear)
              .x(function(d) {
                  return xScale(d["hash"])
              })
              .y(function(d) {
                  return yScale(parseInt(d["PTS"]));
              });

              haha.append('path')
              .attr('class', 'line')
              .attr('d', line(data))
              .style('stroke',team.color);
       haha.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
            return xScale(d["hash"]);
        })
        .attr('cy', function(d) {
            return yScale(parseInt(d["PTS"]));
        })
        .attr('r', 5)
        .attr('fill',team.color )
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(team.name+" "+d["PTS"]+" "+formatTime(d["hash"]))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });



         });

  }
  render(){
    if (this.props.display===null)return (<div>loading..</div>);
    return (<svg width="1350" height="450"></svg>)
  }
}
export default CusSVG;
