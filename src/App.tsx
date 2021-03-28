import { useEffect, useState } from 'react';
import BarcodeScanner from './BarcodeScanner';

function App() {
	const [data, setData] = useState('');
	const [scannerSize, setScannerSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const onResize = () => {
			setScannerSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return (
		<div style={{ height: '100%', overflow: 'hidden', position: 'absolute' }}>
			{!data && (
				<BarcodeScanner
					width={scannerSize.width}
					height={scannerSize.height}
					onUpdate={(err, result) => {
						if (result) setData(result.getText());
					}}
				/>
			)}
			{/* <p>{data || 'Not found'}</p> */}
		</div>
	);
}

export default App;
