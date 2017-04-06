# Vivaldi Router

Vivaldi is a router designed for React projects (although it can be used with any technology), which gives more flexibility than existing solutions.

## Getting Started

Pull this repo and install. Set up mappings for routes in the Mappings file.

### Mappings

Mappings take the form of:

sysRouter.map(route, components, metaData)

* Route is a parametrised route to match against the URL
* Components is an array of components that the URL should render
* MetaData is data for the page more generally (title, description etc)

Thus two examples would be

`sysRouter.map('/login', [['authentication', 'Login']], loginMetaData)`

`sysRouter.map('/clients/:client', [['global', 'Header'], ['dashboard', 'Overview']], overviewMetaData)`

Any :userString parts in the route will be mapped and set as parameters in the GET request, with the key being the string provided, and the value as the actual URL value.

### Links

The Link component is a React component which takes in a browser history object (passed in as a prop), and then acts to manipulate it based on what else is provided.

An example would be something like the following:

`<Link push={{ pathname: '/client/' + client.key }} history={this.props.history}>{client.name}</Link>`

...or a slightly more complex example...

`<Link replace={{ pathname: '/client/' + client.key }} history={this.props.history} title='Link to client area'>{client.name}</Link>`

Any props passed in will get passed to the link created.

## Prerequisites

What things you need to install the software and how to install them

```
Node v7 onwards
createHistory from history/createBrowserHistory for the Link component
```

## Authors

* **Pete Wailes** - [petewailes](https://github.com/petewailes)

If anyone else contributes, I'll add a list of them at that time.

## License

This project is licensed under the MIT License