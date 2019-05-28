// http://x-tag.github.io/v1/docs

const componentName = 'section-art'
import ComponentBase from '../component-base'
const prototype = ComponentBase.prototype
const html = require('../../views/art.pug')

const {
	TweenMax,
	xtag,
	$,
	Power3,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({
			'click .arrow ' : 'onClickArrow'
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
		this.carouselWrapper = this.$('.carouselContainer .wrapper')
		this.items = this.$('.carousel .item')
		this.itemTitles = this.$('.carouselContainer .titles h2')
		this.arrows = this.$('.carouselContainer .carouseControl .arrow')
		this.lines = this.$('.carouselContainer .carouseControl .line')
		this.activeIndex = 0
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
	carouselScroll(){
		let position = $(this.items[this.activeIndex]).position().left
		this.carouselWrapper.css('transform','translateX('+position*(-1)+'px )')
		this.itemTitles.removeClass('show')
		this.$(this.itemTitles[this.activeIndex]).addClass('show')
		this.lines.removeClass('active')
		this.$(this.lines[this.activeIndex]).addClass('active')
		
		//console.log(this.items[this.activeIndex], )
	},
	onClickArrow(e){
		if($(e.currentTarget).hasClass('next')){
			this.activeIndex++
			if(this.activeIndex>= this.items.length)
				this.activeIndex = 0
		}else{
			this.activeIndex--
			if(this.activeIndex<0)
				this.activeIndex = this.items.length-1
		}
		console.log(this.activeIndex)
		this.carouselScroll();
	}
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
