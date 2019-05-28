
/*
	http://x-tag.github.io/v1/docs
	
	usage: 

		const ComponentBase = require('./component-base')

		xtag.register('x-foo', {
			prototype: ComponentBase.prototype,
		}

*/ 

const {
	TweenMax,
	xtag,
	Power4,
} = (<any>window)

const ComponentBase = xtag.register('component-base', {

	lifecycle: {
		created(){
			this.$el = $(this)
		},
		attributeChanged(name, prevVal, newVal){
			// console.log('attributeChanged', name, newVal, prevVal, typeof newVal)
			if(prevVal !== newVal) this.emit(name, newVal, false)
		}
	},

	methods: {
		/**
		 * Emit a DOM event that can be subscribed to via element.addEventListener
		 * @param name:string - name of event
		 * @param detail:any - payload for event.detail
		 */
		emit(name:string, detail:any, bubbles:boolean=false){
			xtag.fireEvent(this, name, {detail, bubbles})
		},
		/*
			element scoped jquery selector

			usage: 
				this.$('.thing')
		*/ 
		$(selector){ 
			return $(selector, this)
			// return this.$el.find(selector)
		}, 

		$$(selector){
			return this.querySelector(selector)
		},

		setBooleanAttribute(name, value){
			if(value){
				this.setAttribute(name, '')
			}else{
				this.removeAttribute(name, '')
			}
		},

		toggleBooleanAttribute(name){
			if(this.hasAttribute(name)){
				this.removeAttribute(name)
				return false
			}else{
				this.setAttribute(name, '')
				return true
			}
		},
		staggerText(targets, intro=true){
			if(intro){
				TweenMax.staggerFromTo(targets, 1, {opacity: 0, y: -20}, {opacity: 1, y: 0, ease: Power4.easeOut}, .1)
			}else{
				TweenMax.staggerFromTo(targets, 1, {opacity: 1, y: 0}, {opacity: 0, y: -20, ease: Power4.easeOut}, .1)
			}
		},
		/*
			accepts a hash of html events

			{
				'HTMLEventName selector': 'handlerName',
				'click .button': 'clickHandler'
			}
		*/
		delegateEvents(events){
			events = events || this.events
			Object.keys(events).forEach((key, index) => {
				const handlerName = events[key]
				const delimited = key.split(' ')
				const evt = delimited.shift()
				const selector = delimited.join(' ')
				this.$el.on(evt, selector, e => { this[handlerName](e) })
			})
		}
	}
})

export default ComponentBase

