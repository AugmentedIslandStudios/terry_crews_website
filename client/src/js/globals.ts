import './lib/hypot'
// import * as $ from 'jquery'
import $ from './lib/zepto'
import * as lottie from './lib/lottie'
import {TweenMax, Power4, Power3, Linear} from 'gsap'
import * as THREE from 'three'
const _xtag = require('x-tag/dist/x-tag-core.min.js')

/*

const {
    TweenMax,
	xtag,
} = (<any>window)

*/

Object.assign(window, {
    THREE,
    lottie,
    TweenMax, Power4, Power3, Linear,
    $,
    xtag: _xtag,
})
