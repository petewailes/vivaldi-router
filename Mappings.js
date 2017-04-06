import Router from './Router'

/* Sample MetaData Imports */
// import loginMetaData from './authentication/metaData/login.json'
// import logoutMetaData from './authentication/metaData/logout.json'
// import overviewMetaData from './dashboard/metaData/overview.json'

module.exports = class Mappings {
	constructor(req) { this.req = req }

	/*
	 * Sets up mappings and returns a matched route or a 404
	 */
	mapUrl() {
		const sysRouter = new Router(this.req);

		/* Sample Routes */
		// sysRouter.map('/login', [['authentication', 'Login']], loginMetaData)
		// sysRouter.map('/logout', [['authentication', 'Logout']], logoutMetaData)
		// sysRouter.map('/overview', [['global', 'Header'], ['dashboard', 'Overview']], overviewMetaData)

		return sysRouter.execute()
	}
}