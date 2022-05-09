import React, { useState, useRef } from 'react';
import Scanner from './Scanner';
import Result from './Result';

const QuaggaScanner = () => {
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);
    const scannerRef = useRef(null);
    console.log(results)

    return (
        <div>
            <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
            <ul className="results">
                {results.map(result => (<li>{result}</li>) )}
                {results.map((result) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}
            </ul>
            <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
                {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    border: '3px solid green',
                }} width="90vw" height="90vh" />
                {scanning ? <Scanner scannerRef={scannerRef}
                                     numOfWorkers={8} facingMode={'environment'}
                                     onDetected={(result) => {
                                         if(result.length > 11)
                                         {
                                             setResults([...results, result])
                                             setScanning(false)
                                         }
                                     }} /> :  <Scanner scannerType="ImageStream" scannerRef={scannerRef}
                                                       numOfWorkers={8} facingMode={'environment'}
                                                       onDetected={(result) => {
                                                           if(result.length > 11)
                                                           {
                                                               setResults([...results, result])
                                                               setScanning(false)
                                                           }
                                                       }} />}
            </div>

        </div>
    );
};

export default QuaggaScanner;
