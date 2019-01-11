<LineChart width={1500} height={600}   margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

<XAxis dataKey="hash" type="number"
 domain={[start, end]}
tickFormatter={(tick) => {
var time=new Date(tick);
return (time.getMonth()+1)+"/"+time.getDate()+"/"+time.getFullYear();
}}
ticks={this.props.total.list}
/>
<YAxis dataKey="PTS"/>
<Tooltip />
<Legend />
{display.map(s => (
    <Line dataKey="PTS" data={s.data} name={s.name} key={s.name} stroke={s.color} />
  ))}


</LineChart>
