// http://x-tag.github.io/v1/docs

const componentName = 'tc-nav'
import ComponentBase from './component-base'
const prototype = ComponentBase.prototype
import model from '../model'
const html = require('../views/nav.pug')

const {
	TweenMax,
    xtag,
    Power4,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({
            'click .section-anchor': 'onClickItem',
            'click .link': 'oncloseMenu',
            'click .mobile-open-menu': 'onClickMobileMenu'
        })
        this.render()

        this.addEventListener('active-section', (e) => {
            this.setActiveSection(this.activeSection)
        })
        this.addEventListener('active-section-progress', (e) => {
            this.setSectionPosition(this.activeSectionProgress)
        })

        TweenMax.staggerFromTo(this.$('.section-anchor'), 1, {opacity: 0, x: 20}, {opacity: 1, x: 0, ease: Power4.easeOut, delay: 1}, .1)
	},
}

const accessors = {
    activeSection: { attribute: {} },
    activeSectionProgress: { attribute: {} },
    open: {
        attribute: {
            boolean: true,
        }
    }
}

const methods = {
	render (){
        const numSections = Object.keys(model.sections).length
		xtag.innerHTML(this, `
           ${html}
		`)
    },

    setActiveSection(section){
        this.$('.active').removeClass('active')
        this.$(`[section=${section}]`).addClass('active')
    },
    
    setSectionPosition(percentage:number){
        TweenMax.to(this.$(`.section-anchor[section=${this.activeSection}] svg .nav-stroke`), .6, {strokeDashoffset: 158 + percentage * 158, ease: Power4.easeOut})
    },

    onClickItem(e){
        this.emit('active-section-changed', e.currentTarget.getAttribute('section'))
    },

    onClickClose(){
        this.toggleVisibility()
    },
    oncloseMenu(){
        this.open = false
        this.controlHamNav()
    },
    onClickMobileMenu(){
        this.toggleVisibility()
        this.controlHamNav()
    },
    controlHamNav(){
        if(this.open){
            //
            this.$('.mobile-nav').removeClass('closed')
            setTimeout(()=>{
                this.$('.mobile-nav').addClass('open')
            },10)
        }else{
            this.$('.mobile-nav').removeClass('open')
            setTimeout(()=>{
                this.$('.mobile-nav').addClass('closed')
            },300)
        }
    },
    toggleVisibility(){
        this.open = !this.open
    },
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
