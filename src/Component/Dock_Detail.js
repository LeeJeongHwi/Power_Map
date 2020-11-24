import React,{useState,useEffect} from "react";
import axios from "axios";
import BuildingName from "./BuildingName";

const DockDetail = (props) => {
    const {marker_id,visible} = props;
    const [measure_data,setMeasure] = useState([]);
    useEffect(()=>{
        const fetchall = async() => {
            const measure_data = await axios.get("http://localhost:8080/load_measure",{
                params:{
                    id:marker_id
                }
            })
            setMeasure(measure_data);
        }
        fetchall();
        // console.log(measure_data);
    },[marker_id])

    return (
        <div id="detail_Box">
            <div id="buildingName">
                <h1>Marker Id : {marker_id}</h1>
                <BuildingName datas={measure_data}/>
            </div>   
        </div>
    )
}
export default DockDetail;