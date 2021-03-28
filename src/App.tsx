import { useState } from 'react';
import { BarcodeScanner } from './BarcodeScanner';

function App() {
	const [data, setData] = useState('');
	return (
		<div
			style={{ height: '100%', overflow: 'hidden', position: 'absolute' }}
		>
			{!data && <BarcodeScanner onCodeDetected={setData} />}
			<p>{data || 'Not found'}</p>
		</div>
	);
}

export default App;
