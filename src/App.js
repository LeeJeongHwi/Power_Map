/*global kakao*/
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Map_Data from "./Component/Map_Data";
// import SideDock from "./Component/Side_Dock";
export default function App() {
  const [visible, setVisible] = useState(true);
  
  return (
    <div id="wrap">
      {visible && (
        <>
          <h2>Kakao Map</h2>
          <Map_Data/>
        </>
      )}
    </div>
  );
}
