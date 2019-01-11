import $ from 'jquery';
import { csv } from 'd3-request';
import url from '../nba.csv';
export function Hello(){
  var data="hello";
  return { type: "FETCH_POINTS", payload:data };

}
/*export function fetch_points(){
  return dispatch=>{
  csv(url, function(err, data) {

   dispatch({ type: "FETCH_POINTS", payload: data });
 });
}
}*/
export function fetch_points(){
  return dispatch=>{
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'text',
        success: function(data) {
            //console.log();
             var total=data.split("\n");
             var header=total[0].split(",");
             var res=[];
             var hashlist=[];
             for(var i=1;i<total.length;i++){
               var tmp=total[i].split(",");
               var homeName=tmp[4];
               var awayName=tmp[2];
               //var parse=tmp[0].split("/");
               var date=new Date(tmp[0])

               var home={
                 "Date":tmp[0],
                 "Team":tmp[4],
                 "PTS":tmp[5],
                 "Home/Away":"H",
                 "hash":date
               }
               var away={
                 "Date":tmp[0],
                 "Team":tmp[2],
                 "PTS":tmp[3],
                 "Home/Away":"A",
                 "hash":date
               }
               res.push(home);
               res.push(away);
               if(!hashlist.includes(date)&&!isNaN(date))hashlist.push(date);
             }
             data={"res":res,"list":hashlist}
            dispatch({ type: "FETCH_POINTS", payload: data });
        }
    })}
}
export function Post(input){
  return dispatch=>{


            //console.log();
             var total=input.split("\n");
             var header=total[0].split(",");
             var res=[];
             var hashlist=[];
             for(var i=0;i<total.length;i++){
               var tmp=total[i].split(",");
               var homeName=tmp[4];
               var awayName=tmp[2];
               //var parse=tmp[0].split("/");
               var date=new Date(tmp[0]).getTime();

               var home={
                 "Date":tmp[0],
                 "Team":tmp[4],
                 "PTS":tmp[5],
                 "Home/Away":"H",
                 "hash":date
               }
               var away={
                 "Date":tmp[0],
                 "Team":tmp[2],
                 "PTS":tmp[3],
                 "Home/Away":"A",
                 "hash":date
               }
               res.push(home);
               res.push(away);

               if(!hashlist.includes(date)&&!isNaN(date))hashlist.push(date);
             }

             var data={"res":res,"list":hashlist}
            dispatch({ type: "FETCH_POINTS", payload: data });

    }
  }
