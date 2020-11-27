import React,{useEffect,useState} from "react";
import ReactApexChart from "react-apexcharts"; 
const DetailGraph = (props) => {
    const {measure} = props;
    const [yData_Measure,setYm] = useState([]);
    const [yData_Predict,setYp] = useState([]);
    const config ={
        series: [{
            name: 'Measure Power',
            type: 'column',
            data: yData_Measure
          },{
              name: "Predict Power",
              type: "line",
              data: yData_Predict
          }],
        options: {
            plotOptions:{
                bar:{
                    columnWidth:"45%"
                }
            },
            stroke: {
                width: [0, 4]
            },
            title: {
                text: '전력수요 그래프'
            },
            dataLabels: {
                enabled: false,
                enabledOnSeries: [1]
            },
            markers :{
                size:5
            },
            labels: ['1','2','3','4','5','6','7','8','9',
            '10','11','12','13','14','15','16','17','18',
            '19','20','21','22','23','24'],
            xaxis: {
                title : {
                    text: "Hour"
                }
            },
            yaxis: [{
                title: {
                text: 'Measure',
                },
            
            }, {
                opposite: true,
                title: {
                text: 'Predict'
                }
            }]
        }
    }
    useEffect(()=>{
        if (measure.length != 0){
            const ylist_m = [];
            const ylist_p = [] 
            measure.map((data)=>{
                ylist_m.push(data.measure)
                ylist_p.push(data.predict)
            })
            setYm(ylist_m);
            setYp(ylist_p);
        }
    },[measure])
    useEffect(()=>{
        if (yData_Measure.length != 0){
            console.log(yData_Measure)
            console.log(yData_Predict)
        }
        
    },[yData_Measure,yData_Predict])
    return (
        <div>
            <h3>Graph</h3>
            <ReactApexChart options={config.options} series={config.series} type="line" height={350}/>
        </div>
    )
}
export default DetailGraph;