import { Overlay, StyledCircularProgress } from 'components/ui/Loading/styles';

const Loading = () => {
	return (
		<Overlay>
			<StyledCircularProgress
				thickness={4}
				variant={'indeterminate'}
				size={100}
				color={'secondary'}
			/>
		</Overlay>
	);
};

export default Loading;
