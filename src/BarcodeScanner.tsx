import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

export const BarcodeScanner = ({
	onCodeDetected,
}: {
	onCodeDetected: (result: string) => void;
}): React.ReactElement => {
	const savedCallback = useRef(onCodeDetected);
	const videoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		savedCallback.current = onCodeDetected;
	}, [onCodeDetected]);

	useEffect(() => {
		if (videoRef.current) {
			Quagga.init(
				{
					inputStream: {
						name: 'Live',
						type: 'LiveStream',
						target: videoRef.current,
					},
					decoder: {
						readers: ['code_128_reader'],
					},
				} as any,
				err => {
					if (err) {
						console.log(err);
						return;
					}
					console.log('Initialization finished. Ready to start');
					Quagga.start();
				}
			);

			Quagga.onDetected(data => {
				if (data.codeResult.startInfo.error <= 0.04) {
					savedCallback.current(data.codeResult.code);
				}
			});

			return () => Quagga.stop();
		}
	}, []);

	return <div ref={videoRef}></div>;
};
