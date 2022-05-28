import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import useInterval from '@use-it/interval';

import Chart from './Chart';

import "./App.css";


let classifier;

function App() {


  const videoRef = useRef();
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./model/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setLoaded(true);
        });
    });
  }, []);

  useInterval(() => {
    if (classifier && start) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        setResult(results);
        // console.log(results)
      });
    }
  }, 500);

  const toggle = () => {
    setStart(!start);
    setResult([]);
  }

  return (

    <div className="container">
      <div className="upper">
        <div className="capture">
          <video
            ref={videoRef}
            style={{ transform: "scale(-1, 1)" }}
            width="800"
            height="350"
          />
          {loaded && (
            <button onClick={() => toggle()}>
              {start ? "Stop" : "Start"}
            </button>
          )}
        </div>
        {result.length > 0 && (
          <div>
            <Chart data={result[0]} />
          </div>
        )}
      </div>
    </div>
   
  );
}

export default App;