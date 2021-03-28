declare module 'quagga' {
	export type ScannerOptions = {
		inputStream: {
			name: string;
			type: 'LiveStream';
			target: HTMLElement;
		};
		decoder: {
			readers: ['code_128_reader'];
		};
	};

	export type Result = {
		codeResult: {
			code: string;
			startInfo: {
				error: number;
			};
		};
	};

	export function init(
		options: ScannerOptions,
		callback: (err) => void
	): void;

	export function start(): void;
	export function stop(): void;

	export function onDetected(callback: (data: Result) => void);
}
