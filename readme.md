# Vivaldi Router

Vivaldi is a router designed for React projects (although it can be used with any technology), which gives more flexibility than existing solutions.

## Getting Started

Pull this repo and install. Set up mappings for routes in the Mappings file.

Mappings take the form of:

sysRouter.map(route, components, metaData)

* Route is a parametrised route to match against the URL
* Components is an array of components that the URL should render
* MetaData is data for the page more generally (title, description etc)

Thus two examples would be

`sysRouter.map('/login', [['authentication', 'Login']], loginMetaData)`

`sysRouter.map('/clients/:client', [['global', 'Header'], ['dashboard', 'Overview']], overviewMetaData)`

Any :userString parts in the route will be mapped and set as parameters in the GET request, with the key being the string provided, and the value as the actual URL value.

### Prerequisites

What things you need to install the software and how to install them

```
Node v7 onwards
```

## Authors

* **Pete Wailes** - [petewailes](https://github.com/petewailes)

If anyone else contributes, I'll add a list of them at that time.

## License

This project is licensed under the MIT License