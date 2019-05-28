// http://x-tag.github.io/v1/docs

const componentName = 'x-boilerplate'
import ComponentBase from './component-base'
const prototype = ComponentBase.prototype

const {
	xtag,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({})
        this.render()
	},
	inserted(){/**/},
	removed(){/**/},
	attributeChanged(name, prevVal, val){/**/}
}

const accessors = {
	label: {
		attribute: {}
	}
}

const methods = {
	render (){
		xtag.innerHTML(this, `
			<h1>${componentName}</h1>
		`)
	}
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
