import React, { useEffect } from 'react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import Webcam from 'react-webcam';

const codeReader = new BrowserMultiFormatReader();

export const BarcodeScanner = ({
	width,
	height,
	onUpdate,
}: {
	width: number | string;
	height: number | string;
	onUpdate: (result: Result | null, error?: unknown) => void;
}): React.ReactElement => {
	const webcamRef = React.useRef<Webcam>(null);
	const savedCallback = React.useRef(onUpdate);

	useEffect(() => {
		savedCallback.current = onUpdate;
	}, [onUpdate]);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef?.current?.getScreenshot();
		if (imageSrc) {
			codeReader
				.decodeFromImage(undefined, imageSrc)
				.then(result => {
					savedCallback.current(result);
				})
				.catch(err => {
					savedCallback.current(null, err);
				});
		}
	}, []);

	React.useEffect(() => {
		const id = setInterval(capture, 100);
		return () => clearInterval(id);
	}, [capture]);

	return (
		<Webcam
			width={width}
			height={height}
			ref={webcamRef}
			screenshotFormat="image/jpeg"
			audio={false}
			videoConstraints={{
				facingMode: { ideal: 'environment' },
			}}
		/>
	);
};

export type ScanResult = Result | null;
