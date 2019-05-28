// http://x-tag.github.io/v1/docs

const componentName = 'nav-mobile'
import ComponentBase from './component-base'
const prototype = ComponentBase.prototype
import model from '../model'
const logo = require('../../../public/assets/images/tc-logo.svg')
//import {wait} from '../utils/utils'

const {
    TweenMax,
    xtag,
    Power4,
} = (<any>window)


const lifecycle = {
	created(){
		this.delegateEvents({
            'click .section-anchor': 'onClickItem',
            'click chiclet-btn': 'onClickContact',
        })
        this.render()

        this.addEventListener('open', this.onOpen.bind(this))

        this.addEventListener('active-section', (e) => {
            this.setActiveSection(this.activeSection)
        })
        this.addEventListener('active-section-progress', (e) => {
            this.setSectionPosition(this.activeSectionProgress)
        })
	},
}

const accessors = {
    activeSection: { attribute: {} },
    open: { attribute: {} }
}

const methods = {
	render (){
		xtag.innerHTML(this, `
            <nav>
                ${Object.keys(model.sections).map((key, i) => {
                    return `<div section='${key}' class='section-anchor'>
                        <div class='tick'></div>
                        <div class='nav-label'>${model.sections[key].split('-').join(' ')}</div>
                        <div class='indicator'>
                            <span class="section-number">0${i+1}</span>
                            <svg version="1.1" viewBox="0 0 54 54">
                                <circle class="nav-stroke" cx="27" cy="27" r="25"/>
                            </svg>
                        </div>
                    </div>`
                }).join('')}
            </nav>
		`)
    },

    setActiveSection(section){
        this.$('.active').removeClass('active')
        this.$(`[section=${section}]`).addClass('active')
    },
    
    onClickItem(e){
        this.setBooleanAttribute('open', false)
        this.emit('close', '', true)
        this.emit('active-section-changed', e.currentTarget.getAttribute('section'))
    },

    onClickClose(){
        this.toggleVisibility()
    },
    onClickContact(){
        this.emit('click-contact', null, true)
        this.setBooleanAttribute('open', false)
    },

    toggleVisibility(){
        return this.toggleBooleanAttribute('open')
    },

    async onOpen(){
        // console.log('onOpen', this.open !== null, this.open)
        if(this.open !== null){
            TweenMax.to(this, .5, {opacity: 1, display: 'block'})
            TweenMax.staggerFromTo(this.$('.section-anchor'), 1, {x: -20, opacity: 0}, {x: 0, opacity: 1, ease: Power4.easeOut}, .1)
            // await wait(30)
            this.scrollTo(0, 0)
        }else{
            TweenMax.to(this, .3, {opacity: 0, display: 'none'})
        }
    },
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
