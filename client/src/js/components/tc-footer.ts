// http://x-tag.github.io/v1/docs

const componentName = 'tc-footer'
import ComponentBase from './component-base'
const prototype = ComponentBase.prototype
import model from '../model'
const html = require('../views/footer.pug')

const {
	TweenMax,
    xtag,
    Power4,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({
            'click .next': 'onClickNext',
        })
        this.render()
        this.$title = this.$('.title')
        this.$indexLabel = this.$('.index')
        this.index = 0;
        // this.addEventListener('active-section', (e) => {
        //     this.setActiveSection(this.activeSection)
        // })
        // this.addEventListener('active-section-progress', (e) => {
        //     this.setSectionPosition(this.activeSectionProgress)
        // })

        // TweenMax.staggerFromTo(this.$('.section-anchor'), 1, {opacity: 0, x: 20}, {opacity: 1, x: 0, ease: Power4.easeOut, delay: 1}, .1)
	},
}

const accessors = {
    activeSection: { attribute: {} },
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
        this.updateLabels();
    },
    
    setSectionPosition(percentage:number){
        TweenMax.to(this.$(`.section-anchor[section=${this.activeSection}] svg .nav-stroke`), .6, {strokeDashoffset: 158 + percentage * 158, ease: Power4.easeOut})
    },

    onClickNext(){
        //this.setActiveSection();
        // this.emit('goNextSection', {
        //     currentIndex: 3
        // }, true)
    },

    onClickClose(){
        this.toggleVisibility()
    },

    toggleVisibility(){
        this.open = !this.open
    },

    updateLabels(){
        console.log('updateing')
        let tt = 'The Artist'
        let href = ''
        switch (model.currentSection) {
            case 'landing':
                this.index = 0
                href = 'biography'
                break;
            
            case 'biography':
                this.index = 1
                tt= 'The Human'
                href = 'art'
                break;
            
            case 'art':
                this.index = 2
                tt= 'The Artist'
                href = 'filmography'
                break;

            case 'filmography':
                this.index = 3
                tt= 'The Actor'
                href = 'activism'
                break;

            case 'activism':
                this.index = 4
                tt= 'The Human'
                href = 'landing'
                break;
        }
        this.$title.text(tt)
        this.$indexLabel.text(this.index)
        if(this.index==4) this.index = -1
        this.$('.next').attr('href',"#"+href)
        console.log('finish with', model.sections)
    }
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
