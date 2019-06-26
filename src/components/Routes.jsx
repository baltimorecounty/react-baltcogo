import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import ServiceRequest from '../components/ServiceRequest'
import ProdiverDetail from '../components/ProdiverDetail'
import AdditionalInformation from '../components/AdditionalInformation'


render(
	<Router history={browserHistory}>
		<Route path='/' component={ServiceRequest}>
			<IndexRoute component={ProdiverDetail} />
			<Route path='about' component={AdditionalInformation} />
		</Route>
	</Router>,
	document.getElementById('app')
)




