export const AlertAtPage = (pageIn, props) => {
	const alertPage = props.values.AlertAtPage;
	return !(alertPage === '' || (alertPage !== pageIn));
};
