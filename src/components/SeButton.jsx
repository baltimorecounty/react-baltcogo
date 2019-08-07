import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SeButton = (props) => {
	const {
		text,
		isDisabled,
		isLoadingText = 'Loading...',
		type = 'button',
		className = '',
		isLoading,
		...rest
	} = props;
	const cssClasses = classNames('seButton', ...className.split(' '), { 'is-loading': isLoading });
	const disabledStyles = isDisabled ? { backgroundColor: '#999', border: '1px solid #666' } : {};
	/** end */
	return (
		<React.Fragment>
			<button
				className={cssClasses}
				type={type}
				style={{...disabledStyles }}
				disabled={isDisabled || isLoading}
				{...rest}
			>
				{isLoading && (
					<React.Fragment>
						<i className="fa fa-spinner fa-spin fa-fw" />
						<span className="sr-only">{isLoadingText}</span>
					</React.Fragment>
				)}
				{isLoading ? isLoadingText : text}
			</button>
		</React.Fragment>
	);
};

SeButton.propTypes = {
	text: PropTypes.string.isRequired,
	type: PropTypes.string,
	isDisabled: PropTypes.bool,
	isInline: PropTypes.bool,
	isLoading: PropTypes.bool,
	isLoadingText: PropTypes.string
};

export default SeButton;
