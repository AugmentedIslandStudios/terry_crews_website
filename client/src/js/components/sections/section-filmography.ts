// http://x-tag.github.io/v1/docs

const componentName = 'section-filmography'
import ComponentBase from '../component-base'
const prototype = ComponentBase.prototype
const html = require('../../views/filmography.pug')

const {
	TweenMax,
	xtag,
	$,
	Power3,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({
			'click .movie'  :  'clickMovie'
		})
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
	},
	clickMovie(e){
		//console.log(this.$(e.currentTarget).attr('title'))
		this.emit('movieClicked', {
            movie: this.$(e.currentTarget).attr('title'),
        }, true)
	}
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
