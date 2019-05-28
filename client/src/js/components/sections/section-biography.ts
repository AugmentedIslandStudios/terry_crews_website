// http://x-tag.github.io/v1/docs

const componentName = 'section-biography'
import ComponentBase from '../component-base'
const prototype = ComponentBase.prototype
const html = require('../../views/biography.pug')

const {
	TweenMax,
	xtag,
	$,
	Power3,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({
			'.content-wrapper scroll': 'getScrollPorcentage',
		})
		this.render()
		this.addEventListener('active', this.onActive.bind(this))
		this.lastScrollLeft = 0;
		$('.content-wrapper').scroll(()=>{
			this.getScrollPorcentage();
			// let documentScrollLeft = $('.content-wrapper').scrollLeft();
			// console.log(documentScrollLeft)

		});
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
	getScrollPorcentage(){
		
		let winScroll = this.$('.content-wrapper')[0].scrollLeft //document.body.scrollTop || document.documentElement.scrollTop;
		let width = this.$('.content-wrapper')[0].scrollWidth - this.$('.content-wrapper')[0].clientWidth;
		let scrolled = (winScroll / width) * 100;
		console.log('hii',scrolled);
		this.$('.sliderKnot').css('left',scrolled + "%");

		if(scrolled<=20){
			$('.yearScroll').html("1964")
			console.log(1)
		}
		if(scrolled>20){
			$('.yearScroll').html("1984")
			console.log(2)
		}
		if(scrolled>40){
			$('.yearScroll').html("1994")
			console.log(3)
		}
		if(scrolled>60){
			$('.yearScroll').html("2010")
		}
		if(scrolled>80){
			$('.yearScroll').html("2016")
		}
	}
	  
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
