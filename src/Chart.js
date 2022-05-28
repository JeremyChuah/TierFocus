import React from "react";
import GaugeChart from "react-gauge-chart";

const Chart = (props) => {
  const data = props.data;
  const label = data.label;
  const confidence = parseFloat(data.confidence.toFixed(2));
  console.log(label, confidence);
  return (
    <div>
      <h3>Classification Confidence: {label}</h3>  
      
    </div>
  );
};
export default Chart;