// http://x-tag.github.io/v1/docs

const componentName = 'section-landing'
import ComponentBase from '../component-base'
const html = require('../../views/landing.pug')

const prototype = ComponentBase.prototype

const {
	TweenMax,
	xtag,
	$,
	Power3,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({})
		this.render()
		this.addEventListener('active', this.onActive.bind(this))
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
			${html}
		`)
	},
	onActive(){
		if(this.active !== null){
			//this.svg.classList.add('show')
			this.staggerText(this.staggerTargets, true)
		}else{
			//this.svg.classList.remove('show')
			this.staggerText(this.staggerTargets, false)
		}
	}
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
