import { useCallback, useState } from 'react';
import { BarcodeScanner } from './BarcodeScanner';
import styled from '@emotion/styled';
import { HashLoader } from 'react-spinners';

const BarcodeScannerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ScanCodeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const BarCode = styled.h1`
	letter-spacing: 5px;
	margin: 6rem 0;
	font-size: 3rem;
	@media (max-width: 500px) {
		margin: 2rem 0;
	}
`;

const Submit = styled.button`
	padding: 1rem;
	font-size: 1.5rem;
	font-weight: 600;
	color: #fff;
	background-color: #662d91;
	outline: none;
	border: 1px solid #662d91;
	border-radius: 7px;
	margin-top: 5rem;
	cursor: pointer;
`;

(window.fetch as any) = (url: string) =>
	new Promise((resolve, reject) => {
		setTimeout(
			() =>
				resolve({
					json: () =>
						new Promise((resolve, reject) =>
							resolve([
								{
									id: 1,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
								{
									id: 2,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
								{
									id: 3,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
								{
									id: 4,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
								{
									id: 5,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
								{
									id: 6,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
								{
									id: 7,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
								{
									id: 8,
									title: 'Un fel de placeholder mai lung',
									checked: true,
								},
							])
						),
				}),
			1500
		);
	});

type ServerDataItem = {
	id: number;
	title: string;
	checked: boolean;
};
type ProductVerificationProps = {
	dataObject: ServerDataItem[];
	handleSubmit: () => void;
};
const Loader = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ProductVerificationWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 1rem;
`;

type ProductPropertyProps = {
	item: ServerDataItem;
	handleCheck: (id: number) => void;
};

const ProductPropertyWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1rem;
	position: relative;
`;

const ProductPropertyName = styled.h1`
	margin: 0;
	font-size: 1.3rem;
`;
const CheckBoxWrapper = styled.label``;
const CheckBox = styled.input``;
const CheckMark = styled.span``;
const ProductProperty: React.FC<ProductPropertyProps> = ({
	item,
	handleCheck,
}) => {
	const [checked, setChecked] = useState(item.checked);

	return (
		<ProductPropertyWrapper>
			<ProductPropertyName>{item.title}</ProductPropertyName>
			<CheckBoxWrapper className="container">
				<CheckBox
					type="checkbox"
					checked={checked}
					className="checkbox"
					onChange={() => {
						handleCheck(item.id);
						setChecked(prev => !prev);
					}}
				></CheckBox>
				<CheckMark className="checkmark"></CheckMark>
			</CheckBoxWrapper>
		</ProductPropertyWrapper>
	);
};
const SumbitButton = styled.div`
	background-color: #006400;
	padding: 1rem;
	font-size: 1.5rem;
	font-weight: 600;
	color: #fff;
	outline: none;
	border-radius: 7px;
	margin-top: 5rem;
	cursor: pointer;
	user-select: none;
	&:hover {
		background-color: #075607;
	}
`;

const SubmitButtonWrapper = styled.div`
	width: fit-content;
	margin: 0 auto;
	padding-top: 9rem;
`;

const ProductVerification: React.FC<ProductVerificationProps> = ({
	dataObject,
	handleSubmit,
}) => {
	const [items, setItems] = useState(dataObject);
	console.log(items);
	const handleCheck = useCallback(
		id => {
			setItems(
				items.map(item =>
					item.id === id
						? { ...item, checked: !item.checked }
						: { ...item }
				)
			);
		},
		[items]
	);
	return (
		<ProductVerificationWrapper>
			{items.map(item => (
				// <h1 key={item.id}>{item.title}</h1>
				<ProductProperty
					key={item.id}
					item={item}
					handleCheck={handleCheck}
				></ProductProperty>
			))}
			<SubmitButtonWrapper>
				<SumbitButton onClick={handleSubmit}>Trimite</SumbitButton>
			</SubmitButtonWrapper>
		</ProductVerificationWrapper>
	);
};

function App() {
	const [barcode, setBarcode] = useState('SCANEAZA');
	const [isLoading, setIsLoading] = useState(false);
	const [serverData, setServerData] = useState<ServerDataItem[] | null>(null);
	const handleSubmit = useCallback(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setServerData(null);
			setBarcode('SCANEAZA ALT PRODUS');
		}, 2000);
	}, []);
	const checkProduct = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3000/product?code=${barcode}`
			);
			const data = await response.json();
			setServerData(data);
		} catch {
			console.log('failed');
		}
		setIsLoading(false);
	}, [barcode]);

	return isLoading ? (
		<Loader>
			<HashLoader color="#662d91" size="200px" />
		</Loader>
	) : serverData ? (
		<ProductVerification
			dataObject={serverData}
			handleSubmit={handleSubmit}
		></ProductVerification>
	) : (
		<ScanCodeWrapper>
			<BarCode>{barcode}</BarCode>
			<BarcodeScannerWrapper>
				<BarcodeScanner onCodeDetected={setBarcode} />
			</BarcodeScannerWrapper>
			<Submit onClick={checkProduct}>Verifica Produsul</Submit>
		</ScanCodeWrapper>
	);
}

export default App;
