import { useState } from 'react';
import { BarcodeScanner } from './BarcodeScanner';
import styled from '@emotion/styled';

const BarcodeScannerWrapper = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

function App() {
	const [data, setData] = useState('');
	return (
		<BarcodeScannerWrapper>
			{!data && <BarcodeScanner onCodeDetected={setData} />}
		</BarcodeScannerWrapper>
	);
}

export default App;
