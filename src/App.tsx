import React, { useCallback, useEffect, useState } from 'react';
import { BarcodeScanner } from './BarcodeScanner';
import styled from '@emotion/styled';
import { HashLoader } from 'react-spinners';
import { createPortal } from 'react-dom';
import { keyframes } from '@emotion/react';

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
const SumbitButton = styled.div<{
	backgroundColor?: string;
	hoverColor?: string;
}>`
	background-color: ${props => props.backgroundColor ?? '#006400'};
	padding: 1rem;
	font-size: 1.5rem;
	font-weight: 600;
	color: #fff;
	outline: none;
	border-radius: 7px;
	margin-top: 3rem;
	cursor: pointer;
	user-select: none;
	margin: 0 2rem;
	&:hover {
		background-color: ${props => props.hoverColor ?? '#075607'};
	}
`;

const SubmitButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 0 auto;
	padding-top: 9rem;
`;

const FaultyModalWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;
const reveal = keyframes`
	from{
		transform:translateY(100%);
	}
	to{
		transform:translateY(0);
	}
`;
const ModalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 500px;
	height: 500px;
	background-color: #fff;
	color: #000;
	border-radius: 7px;
	animation: ${reveal} 0.6s ease;
	padding: 1.5rem;
	@media (max-width: 500px) {
		height: 100vh;
		justify-content: center;
	}
`;

const ConfirmButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 2rem;
`;

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal: React.FC<{ isOpen: boolean }> = ({ children, isOpen }) => {
	if (!isOpen) return null;
	return createPortal(<div>{children}</div>, modalRoot);
};

const ProductVerification: React.FC<ProductVerificationProps> = ({
	dataObject,
	handleSubmit,
}) => {
	const [items, setItems] = useState(dataObject);
	const [isOpen, setIsOpen] = useState(false);
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
	const openFaultyModal = () => {
		setIsOpen(true);
	};
	const closeFaultyModal = () => {
		setIsOpen(false);
	};
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
				<SumbitButton
					onClick={openFaultyModal}
					backgroundColor="#FF0000"
					hoverColor="#af1919"
				>
					Defecte
				</SumbitButton>
				<SumbitButton onClick={handleSubmit}>Trimite</SumbitButton>
			</SubmitButtonWrapper>
			<Modal isOpen={isOpen}>
				<FaultyModalWrapper>
					<ModalWrapper>
						{items.map(item => (
							// <h1 key={item.id}>{item.title}</h1>
							<ProductProperty
								key={item.id}
								item={item}
								handleCheck={handleCheck}
							></ProductProperty>
						))}
						<ConfirmButtonWrapper>
							<SumbitButton onClick={closeFaultyModal}>
								Confirma
							</SumbitButton>
						</ConfirmButtonWrapper>
					</ModalWrapper>
				</FaultyModalWrapper>
			</Modal>
		</ProductVerificationWrapper>
	);
};

const MaskBarcodeScanner = styled.div`
	width: 640px;
	height: 480px;
	background-color: #000;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	@media (max-width: 668px) {
		width: 600px;
		height: 480px;
	}
	@media (max-width: 641px) {
		width: 400px;
		height: 480px;
	}
	@media (max-width: 360px) {
		width: 360px;
		height: 340px;
	}
`;

function App() {
	const [barcode, setBarcode] = useState('SCANEAZA');
	const [isLoading, setIsLoading] = useState(false);
	const [serverData, setServerData] = useState<ServerDataItem[] | null>(null);
	const [show, setShow] = useState('nu merge');
	const [showVideoMask, setShowVideoMask] = useState(true);

	const handleSubmit = useCallback(() => {
		setIsLoading(true);
		setBarcode('SCANEAZA');
		setTimeout(() => {
			setIsLoading(false);
			setServerData(null);
		}, 2000);
	}, []);

	useEffect(() => {
		navigator.getUserMedia(
			// constraints
			{
				video: true,
			},
			// successCallback
			function () {
				setShowVideoMask(false);
				setShow('merge');
			},
			// errorCallback
			function (err) {
				if (err) {
					console.log(err);
				}
			}
		);
	}, []);
	const checkProduct = useCallback(async () => {
		if (barcode !== 'SCANEAZA') {
			//  !==
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
		} else {
			alert('Scaneaza un cod inainte de a verifica');
		}
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
	) : showVideoMask ? (
		<ScanCodeWrapper>
			<BarCode>{barcode}</BarCode>
			<MaskBarcodeScanner>Conecteaza o camera</MaskBarcodeScanner>
			<div>{show}</div>
			<Submit onClick={checkProduct}>Verifica Produsul</Submit>
		</ScanCodeWrapper>
	) : (
		<ScanCodeWrapper>
			<BarCode>{barcode}</BarCode>
			<BarcodeScannerWrapper>
				<BarcodeScanner onCodeDetected={setBarcode} />
			</BarcodeScannerWrapper>
			<div>{show}</div>
			<Submit onClick={checkProduct}>Verifica Produsul</Submit>
		</ScanCodeWrapper>
	);
}

export default App;
