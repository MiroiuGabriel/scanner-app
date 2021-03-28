import { useCallback, useEffect, useState } from 'react';
import { BarcodeScanner, ScanResult } from './BarcodeScanner';

function App() {
	const [data, setData] = useState('');
	const [scannerSize, setScannerSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const onResize = () => {
			setScannerSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	const updateData = useCallback((result: ScanResult) => {
		if (result) {
			setData(result.getText());
		}
	}, []);

	return (
		<div
			style={{ height: '100%', overflow: 'hidden', position: 'absolute' }}
		>
			{!data && (
				<BarcodeScanner
					width={scannerSize.width}
					height={scannerSize.height}
					onUpdate={updateData}
				/>
			)}
			<p>{data || 'Not found'}</p>
		</div>
	);
}

export default App;
