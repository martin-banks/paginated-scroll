import Styles from '../../styles/app.css'
import {state} from '../_state'

const windowHeight = window.innerHeight
const colors = [
	'darkred',
	'lightblue',
	'goldenrod',
	'lightgrey',
	'green',
	'lightgreen',
	'salmon'
]
const random = ()=> Math.ceil(Math.random() * colors.length) -1
const template = props => {
	let styles = Object.keys(props.styles).map( style => `${style}:${props.styles[style]}`).join(';')

	return `<section id="section__${props.index}" class=${Styles.page} 
		style="
			background-color:${colors[random()]};
			${styles}
		">
			<h1>${props.content}</h1>
	</section>`
}




export const Section = function(props) {
	const container = document.querySelector(props.container)
	let localState = {
		cardPositions: {},
		containerHeight: 0
	}
	const getCardPosition = index => localState.cardPositions[`section__${index}`]
	const getContainerHeight = ()=> localState.containerHeight

	const setCardPosition = update => localState.cardPositions[`section__${update.index}`] = { 
		x: update.x || 0, y: update.y || 0, z: update.z || 0
	}
	const setContainerHeight = update => localState.containerHeight = update

	const getActiveSection = props => {
		Object.keys(localState.cardPositions).filter( id => {
			return localState.cardPositions[id].y 
		})
	}

	
	const content = state.content.sections.map( (section, index) => {
		let posY = `${windowHeight * index}`
		setCardPosition({
			index, 
			y: parseInt(posY)
		})

		return template({
			index,
			content: section.title, 
			styles: {
				transform: `translate3d(0,${posY}px,0)`
			}
		})
	}).join('')

	container.innerHTML = content
	setContainerHeight(`${windowHeight * state.content.sections.length}`)
	//window.innerHeight * state.content.section.length
	


	function animateScrollTo(props){
		let duration = props.duration || 100
		let animStart = null
		let startPosition = document.body.scrollTop
		let distance = props.target - startPosition
		//console.log('starting animated scroll to', props.target)
		let direction = distance < 0 ? 'max' : 'min'
		/*make change for each animation frame*/
		function animateFrame(timestamp) {
			if (!animStart) animStart = timestamp
				let progress = timestamp - animStart
				let newIncrement = progress / duration
				/*calculate increment of the distance to scroll and update*/
				let position = Math[direction](props.target, startPosition + (newIncrement * distance))
				/*console.info('scrolling to: ',position)*/
				/* check position value hasn't exceeded target and apply */
				document.body.scrollTop = position

			/* check if animation has reached duration. If not request animation frame and call again */
			if (progress < duration) {
				/*progress has not yet reached the duration, call animation frame again*/
				window.requestAnimationFrame(animateFrame)
			} else {
				/*animation has completed*/
				return !!props.callback ? setTimeout(()=> props.callback , 1000) : false
				
			}
		}
		window.requestAnimationFrame(animateFrame) /* request animation frame and call function */
	}


	const addEvent = function(object, type, callback) {
		if (object == null || typeof(object) == 'undefined') {
			console.error(`Cannot add ${type} to ${object}. Object not recognised`)
			return
		}
		if (object.addEventListener) {
			object.addEventListener(type, callback, false)
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback)
		} else {
			object["on"+type] = callback
		}
	}

	let scrollAfterDelay
	const snapToPosition = ()=> {
		clearTimeout(scrollAfterDelay)
		scrollAfterDelay = window.setTimeout(()=> {
			window.removeEventListener('scroll', snapToPosition)
			let scrollPos = document.body.scrollTop
			let activeSection = Math.round(scrollPos / window.innerHeight)
			animateScrollTo({
				target: getCardPosition(activeSection).y,
				callback: window.addEventListener('scroll', snapToPosition, false)
			})
		}, 80)	
	}

	window.addEventListener('scroll', snapToPosition, false)
	
	
	





	return {
		getCardPosition,
		getContainerHeight,
		setCardPosition,
		setContainerHeight
	}
}