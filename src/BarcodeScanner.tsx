import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

export type BarcodeScannerProps = {
	onCodeDetected: (result: string) => void;
	className?: string;
};

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
	onCodeDetected,
	className,
}) => {
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
						constraints: {
							facingMode: 'environment',
						},
					},
					decoder: {
						readers: ['code_128_reader'],
					},
					locate: true,
					halfSample: true,
					patchSize: 'large', // x-small, small, medium, large, x-large
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
				if (data.codeResult.startInfo.error <= 0.2) {
					savedCallback.current(data.codeResult.code);
				}
			});

			return () => Quagga.stop();
		}
	}, []);

	return <div className={className} ref={videoRef}></div>;
};
