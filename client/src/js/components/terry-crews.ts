const componentName = 'terry-crews'
import ComponentBase from './component-base'
const prototype = ComponentBase.prototype
const logo = require('../../../public/assets/images/tc-logo.svg')
const html = require('../views/index.pug')
import capabilities from '../utils/capabilities'
import './sections/section-landing'
import './sections/section-biography'
import './sections/section-filmography'
import './sections/section-art'
import './sections/section-activism'
import './movie-detail'
import './tc-footer'
const loadAnimData = require('../data/load-anim-data.json')
import './tc-nav'

import model from '../model'
(<any>window).model = model // for debugging 

const {
	TweenMax,
	lottie,
	$, xtag,
	Power4,
} = <any>window;

const lifecycle = {
	created(){
    this.delegateEvents({
			'movieClicked section-filmography' : 'showMovieDetail'
		})
		this.render()
		
		const imagesToLoad = $('img','svg').length; //number of slides with .bcg container
		this.setLoading();
		this.onLoadingDone();
		
		const $desktopNav = this.$('nav')
		const $globalBackground = this.$('#globalBackground')
		const $logo = this.$('#tc-logo')
		this.$footer = this.$('tc-footer')

		$desktopNav.on('active-section-changed', (e) => {
			this.scrollToSection(e.detail)
		})

		// model section changed, update children
		model.on('currentSection', (currentSection, prevSection) => {
			//console.log(currentSection, prevSection)
			//window.location.replace(`#${currentSection}`)

			// only deactivate a section if it is > 1 section away from the current
			// this ensures the section isn't on screen when deactivating
			if(prevSection){
				const sectionKeys = Object.keys(this.sections)
				sectionKeys.forEach((key, i) => {
					if(this.sections[key].hasAttribute('active')){
						this.sections[key].setBooleanAttribute('active', false)
					}
				})
				
			}
			const newSection = this.sections[currentSection]
			
			newSection.setBooleanAttribute('active', true)
			$desktopNav.attr('section', currentSection)
			$(this).attr('section', currentSection)
			
			//Update index for next
			this.$footer[0].updateLabels()
			
			if(currentSection === 'biography'){
				$logo.attr('theme', 'light')
			}else{
				$desktopNav.attr('theme', 'dark')
				$logo.attr('theme', 'dark')
			}
			if(currentSection === 'landing'){
				this.$footer.addClass('hidden')
			}else{
				this.$footer.removeClass('hidden')
			}
			if(currentSection === 'activism' || currentSection === 'art'){
				$globalBackground.addClass('show')
			}else{
				$globalBackground.removeClass('show')
			}
		})

		$(document).ready(()=>{
			this.checkURL()
			// set current section from hash
			if(window.location.hash.length){
				setTimeout(() => {
					model.currentSection = window.location.hash.slice(1, window.location.hash.length)
				}, 400);
				
			}else{
				model.currentSection = 'landing'				
			}
		})

		// exports
		Object.assign(this, {
			$desktopNav,
		})
	},
}

const methods = {
	render (){
		const mobileNavIcon = `
			<svg version="1.1"
				xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				x="0px" y="0px" width="25px" height="19.5px" viewBox="0 0 25 19.5" style="enable-background:new 0 0 25 19.5;"
				xml:space="preserve">
				<line class="st0" x1="0" y1="1" x2="25" y2="1"/>
				<line class="st0" x1="0" y1="9.8" x2="25" y2="9.8"/>
				<line class="st0" x1="0" y1="9.8" x2="25" y2="9.8"/>
				<line class="st0" x1="0" y1="18.5" x2="25" y2="18.5"/>
			</svg>
		`
		xtag.innerHTML(this, `
			${html}
		`)

		this.sections = {
			'landing': 		this.$$('section-landing'),
			'filmography': 	this.$$('section-Filmography'),
			'art': 	this.$$('section-art'),
			'biography': 	this.$$('section-biography'),
			'activism': 	this.$$('section-Activism'),
			'detail': 	this.$$('movie-detail'),
		}

		const $targs = this.$('#mobile-nav-btn, share-buttons, #tc-logo')
		TweenMax.set($targs, {opacity: 0})
		TweenMax.fromTo($targs, 1, {opacity: 0}, {opacity: 1, delay: .5})
		
	},

	scrollToSection(key:string, immediate:boolean=false){
		// console.log('scrollToSection', key)
		const targetTop = this.sections[key].offsetTop
		const obj = {
			y: window.scrollY
		}
		const dur = immediate ? 0 : .8
		TweenMax.to(obj, dur, {y: targetTop, ease: Power4.easeInOut, onUpdate: () => {
			window.scrollTo(0, obj.y)
		}})
	},
	
	onClickDolbyLogo(){
		this.scrollToSection('landing')
	},
	deactivateMain(){
		this.$('#sectionContainer').addClass('hidden')
		$('body').css('overflow-y', 'hidden') // prevent scroll, temporal
	},
	activateMain(){
		this.$('#sectionContainer').removeClass('hidden')
		$('body').css('overflow', 'auto') // reactivate scroll, temporal 
		this.$$('#mobile-nav-btn').setAttribute('state', 'open')
	},
	checkURL(){
		window.onpopstate = (event)=>{
			let tempUri = window.location.hash;
			console.log('url', tempUri);
			if(window.location.hash.length){
				console.log("wear",window.location.hash.slice(1, window.location.hash.length))
				model.currentSection = window.location.hash.slice(1, window.location.hash.length)
				
			}else{
				model.currentSection = 'landing'
			}	
		};
	},
	selectSection(){
		const theKeys = Object.keys(this.sections);
		for (let index = 0;  index < theKeys.length; index++) {
			const key = theKeys[index];
			const section = this.sections[key]
			if(model.currentSection !== key) model.currentSection = key
		}
	},
	showMovieDetail(e){
		window.location = '#detail' as any
		this.$$('movie-detail').fillContent(e.detail.movie)
	},
	

	setLoading(){
		//
		const loaderContainer = this.$('#loadingScreen');
		console.log(loaderContainer)
		lottie.loadAnimation({
			container: loaderContainer[0], // the dom element that will contain the animation
			renderer: 'svg',
			loop: true,
			autoplay: true,
			name: 'loading',
			animationData: loadAnimData // the path to the animation json
		});
		lottie.setSpeed(2.2,'loading');
	},
	onLoadingDone(){
		window.onload = ()=>{
			
			TweenMax.to(this.$('#loadingScreen'), 1,{opacity: 0, delay: 1.5, onComplete:()=>{
				this.$('#loadingScreen').addClass('hidden')
				$(this).addClass('loaded')
			}})
		}

	},
 
	loadProgress(imgLoad, image){
    //one more image has been loaded
		this.loadedCount++;
    	this.loadingProgress = (this.loadedCount/this.imagesToLoad);
	}
}

export default xtag.register(componentName, {
	prototype, lifecycle, methods
})
