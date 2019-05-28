// http://x-tag.github.io/v1/docs

// make a template so this is a reusable module with atributes.
const componentName = 'movie-detail'
import ComponentBase from './component-base'
const prototype = ComponentBase.prototype
const html = require('../views/movie.pug')
const movieList = require('../data/movie-list')
const keys = []
//const html = require('../../views/biography.pug')

const {
	xtag,
} = (<any>window)

const lifecycle = {
	created(){
		this.delegateEvents({
			'click .nextMovie' : 'goNextMovie',
		})
		this.render()
		// console.log('movielist',movieList)
		// console.log('withIndex',movieList[0])
		// console.log('withKey',Object.keys(movieList))
		this.movieList = movieList
		this.movieKeys = Object.keys(movieList)
		this.currentKey = ''
		this.currentIndex = 0
		// console.log(this.movieKeys)
		this.fillContent('Deadpool 2')
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
		this.banner = this.$('.headerBanner img')
		this.movieTitle = this.$('.bodyContent .cta .titleWrapper .title')
		this.link = this.$('.bodyContent .cta .titleWrapper .link')
		this.description = this.$('.bodyContent .cta .description')
		this.trailerVideo = this.$('.bodyContent .images .trailer video')
		this.trailerImage = this.$('.bodyContent .images .trailer img')

		this.characterImage = this.$('.bodyContent .images .character img')
		this.characterDescription = this.$('.bodyContent .images .character .description')
		this.sceneImage = this.$('.bodyContent .images .sceneImage')
	},
	fillContent(movieName){
		console.log(movieName, this.currentIndex)

		this.currentKey = 'movieName'
		this.currentIndex = this.movieKeys.indexOf(movieName)
		const tempMovie = this.movieList[movieName]
		this.banner.attr('src',tempMovie.banner)
		this.movieTitle.text(tempMovie.title)
		this.link.attr('href',tempMovie.link)
		this.description.text(tempMovie.description)
		this.trailerVideo.attr('src',tempMovie.trailerVideo)
		this.trailerImage.attr('src',tempMovie.trailerImage)
		if(tempMovie.trailerVideo===""){
			this.trailerVideo.addClass('hidden')
		}else{
			this.trailerImage.addClass('hidden')
		}
		this.characterImage.attr('src',tempMovie.characterImage)
		this.characterDescription.text(tempMovie.characterDescription)
		this.sceneImage.attr('src',tempMovie.sceneImage)

		/*TODO: Film section with click on divs that calls this method with
		the name of the movie clicked as param, and pull data from
		json of movies.
		*/
	},
	goNextMovie(){
		var tempIndex = this.currentIndex + 1
		if(tempIndex>= this.movieKeys.length) 
			tempIndex= 0
			
		this.fillContent(this.movieKeys[tempIndex])
		
	}
	
}

export default xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})
