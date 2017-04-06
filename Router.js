import url from 'url'
import Route from './Route'

module.exports = class Router {
	constructor(req) {
		var requestUri = url.parse(req.originalUrl).pathname

		this.req = req;
		this.matchedRoute = false
		this.requestUri = requestUri
		this.method = req.method
		this.routes = []
		this.metaData = {}
		this.params = [] // complete parameters for the matched route
		this._404 = {
				components: [{ area: '_404', component: 'index', props: {} }],
				regex: null,
				requestUri: requestUri,
				metaData: {},
				params: {}
			}
	}

	/**
	 * Looks over all the mapped routes and returns either a matched route or the default 404
	 */
	execute() {
		// search and store match to current request URI
		for (var route in this.routes) {
			this.routes[route].match()
			if (this.routes[route].isMatched){
				this.matchedRoute = this.routes[route].returnRoute()

				// add in to the params anything from the actual get request of the URL
				this.matchedRoute.params = Object.assign(this.req.query, this.matchedRoute.params)
			}
			else
				delete this.routes[route]
		}

		return (this.matchedRoute) ? this.matchedRoute : this._404
	}

	/**
	 * Sets a route to match based on the URL
	 * Also takes components to render, metaData, and any params you wish to pass as if in the GET request
	 */
	map = (rule, components, metaData, params) => {
		if (typeof metaData === 'undefined')
			var metaData = {}

		if (typeof params === 'undefined')
			var params = {}

		const newRoute = new Route(rule, components, metaData, params, this.requestUri);

		// Make sure that the new route does not match any of the current matching rules.
		for (var route in this.routes) {
			if (this.routes[route].regex === newRoute.regex) {
				console.log(
					"Tried to overwrite an existing URL mapping rule:",
					this.routes[route].regex,
					newRoute.regex
				)
			}
		}

		this.routes[rule] = newRoute;
	}
}