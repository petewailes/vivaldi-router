import React from 'react'

export default class Link extends React.Component {
	handleClick = e => {
		const { push, replace, title, target, history, onClick } = this.props

		if (onClick)
			onClick(e)

		// if is a modified click, a non-left click, there's a target element or default action prevented,
		// let the browser do its thing on its own
		if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || !e.button === 0 || target || e.defaultPrevented)
			return

		if (!history)
			throw new Error('<Link> requires the History obj to be passed as a prop')

		e.preventDefault()

		if (title)
			document.title = title

		if (push)
			history.push(push)
		else if (replace)
			history.replace(replace)
	}

	render() {
		const { push, replace } = this.props

		if (push)
			var linkHref = push.pathname + (push.search || '')
		else if (replace)
			var linkHref = replace.pathname + (replace.search || '')

		var props = {
			href: linkHref,
			onClick: this.handleClick
		}

		var keys = Object.keys(this.props)
		for (var key in keys) {
			var propKey = keys[key]

			if (propKey !== 'history' && propKey !== 'push' && propKey !== 'replace')
				props[propKey] = this.props[propKey]
		}

		return <a {...props} />
	}
}