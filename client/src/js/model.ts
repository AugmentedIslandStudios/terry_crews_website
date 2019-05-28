
/*
    singleton model for the app
*/

const Model = require('model-o')

const model = new Model({
    currentSection: '',
    sections: {
        'landing': 'landing',
        'biography': 'biography',
        'art': 'art',
        'filmography': 'Filmography',
        'activism': 'Activism',
        'detail':   'detail',
    },
    muted: false,
})

export default model
