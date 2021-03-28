import React from 'react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import Webcam from 'react-webcam';

const BarcodeScanner = ({
	width,
	height,
	onUpdate,
}: {
	width: number;
	height: number;
	onUpdate: (arg0: unknown, arg1?: Result) => void;
}): React.ReactElement => {
	const webcamRef = React.useRef<Webcam>(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef?.current?.getScreenshot();
		if (imageSrc) {
			const codeReader = new BrowserMultiFormatReader();
			codeReader
				.decodeFromImage(undefined, imageSrc)
				.then(result => {
					onUpdate(null, result);
				})
				.catch(err => {
					onUpdate(err);
				});
		}
	}, [onUpdate]);

	React.useEffect(() => {
		setInterval(capture, 100);
	}, [capture]);

	return <Webcam width={width} height={height} ref={webcamRef} screenshotFormat="image/png" />;
};

export default BarcodeScanner;
