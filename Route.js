module.exports = class Route {
	constructor(rule, components, metaData, params, requestUri) {
		this.isMatched = false
		this.params = {}

		this.rule = rule
		this.components = components
		this.additionalParams = params
		this.metaData = metaData

		this.requestUri = requestUri

		// create one regex for this URL rule
		var paramRegex = rule.replace(new RegExp(/:[\w]+/i,"g"), '([\\w\\+\\\\\\-\\(\\)\\.\\%]+)')
		var urlRegex = paramRegex.replace('/', '\\/')

		// Store the regex used to match this pattern
		this.regex = '^' + urlRegex + '\\/?$'
	}

	/*
	 * Checks if the route matches the URL given
	 */
	match() {
		this.isMatched = false
		this.params = {}

		var regexTest = new RegExp(this.regex, 'g')

		// match all of the variables (e.g. :id) in the URL.
		const pvalues = regexTest.exec(this.requestUri)

		// add the matched :variable in the URL to the params array of this object
		if (pvalues !== null) {
			const pnames = this.rule.match(/:([\w]+)/ig)

			if (pnames !== null) {
				for (var i = 0; i < pnames.length; i++) {
					var key = pnames[i].substring(1)
					this.params[key] = decodeURIComponent(pvalues[i + 1]);
				}
			}

			// add the additionally specified params to the params array
			if (Object.keys(this.additionalParams).length > 0) {
				for (var param in Object.keys(this.additionalParams))
					this.params[param] = this.additionalParams[param]
			}

			this.isMatched = true;
		}

		return this.isMatched;
	}

	/*
	 * Does a complete search and replace on a given url pattern
	 * Searches for :userString and replaces with provided regex
	 */
	replaceAll = (a,b) => { return a.replace(new RegExp(/:[\w]+/i,"g"),b) }

	/*
	 * Returns information about a route
	 */
	returnRoute() {
		var routeComponents = []

		for (var i = this.components.length - 1; i >= 0; i--) {
			routeComponents.push({
				area: this.components[i][0],
				component: this.components[i][1],
				props: (typeof this.components[i][2] !== 'undefined') ? this.components[i][2] : {}
			})
		}

		return {
			isMatched: this.isMatched,
	  	metaData: this.metaData,
	  	params: this.params,
	  	additionalParams: this.additionalParams,
	  	components: routeComponents,
	  	regex: this.regex,
	  	requestUri: this.requestUri
		}
	}
}