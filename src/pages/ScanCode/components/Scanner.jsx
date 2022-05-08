import React, {useCallback, useLayoutEffect} from 'react';
import Quagga from 'quagga';

function getMedian(arr) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
        return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
    return getMedian(errors);
}

const defaultConstraints = {
    width: 600,
    height: 600,
    aspectRatio: { min: 4 / 3, max: 16 / 9 },
    facingMode: 'environment'
};

const defaultLocatorSettings = {
    patchSize: 'large',
    halfSample: true,
};

const defaultDecoders = [ 'code_39_reader',
    'ean_reader',
    'ean_8_reader',
    'code_128_reader',
    'upc_reader'];

const Scanner = ({
    scannerType = 'LiveStream',
    onDetected,
    scannerRef,
    onScannerReady,
    cameraId,
    facingMode,
    constraints = defaultConstraints,
    locator = defaultLocatorSettings,
    numOfWorkers = navigator.hardwareConcurrency || 0,
    decoders = defaultDecoders,
    locate = true,
}) => {
    const errorCheck = useCallback((result) => {
        if (!onDetected) {
            return;
        }
        const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
        // if Quagga is at least 75% certain that it read correctly, then accept the code.
        if (err < 0.25) {
            onDetected(result.codeResult.code);
        }
    }, [onDetected]);

    const handleProcessed = (result) => {
        let drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(
                    0,
                    0,
                    parseInt(drawingCanvas.getAttribute('width'), 10),
                    parseInt(drawingCanvas.getAttribute('height'), 10)
                );
                result.boxes
                    .filter(function(box) {
                        return box !== result.box;
                    })
                    .forEach(function(box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                            color: 'green',
                            lineWidth: 2
                        });
                    });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                    color: '#00F',
                    lineWidth: 2
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(
                    result.line,
                    { x: 'x', y: 'y' },
                    drawingCtx,
                    { color: 'red', lineWidth: 3 }
                );
            }
        }
    };

    useLayoutEffect(() => {
        Quagga.init({
            inputStream: {
                type: scannerType,
                constraints: {
                    ...constraints,
                    ...(cameraId && { deviceId: cameraId }),
                    ...(!cameraId && { facingMode }),
                },
                target: scannerRef.current,
            },
            frequency: 'full',
            locator,
            numOfWorkers,
            decoder: { readers: decoders },
            locate,
        }, (err) => {
            Quagga.onProcessed(handleProcessed);

            if (err) {
                return console.log('Error starting Quagga:', err);
            }
            if (scannerRef && scannerRef.current) {
                Quagga.start();
                if (onScannerReady) {
                    onScannerReady();
                }
            }
        });
        Quagga.onDetected(errorCheck);
        return () => {
            Quagga.offDetected(errorCheck);
            Quagga.offProcessed(handleProcessed);
            Quagga.stop();
        };
    }, [cameraId, onDetected, onScannerReady, scannerRef, errorCheck, constraints, locator, decoders, locate]);
    return null;
}

export default Scanner;
