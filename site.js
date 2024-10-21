
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	const nextQuestionTimout = async (seconds = 5000) => {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, seconds)
	}
	
	// todo: create your "getNextQuestion" function
	const getNextQuestion = async () => {
		const url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'
		const response = await fetch(url)
		const json = await response.json()

		const { 
			question, 
			correct_answer: correct, 
			incorrect_answers: incorrect 
		} = json.results[0]

		const answers = shuffle([ ...incorrect, correct ])

		return { question, answers, correct }
	}

	// todo: create your "renderQuestion" function
	const renderQuestion = ({question, answers, correct }) => {	
		questionElement.innerHTML = ''
		answersElement.innerHTML = ''
		
		questionElement.textContent = decodeHtml(question)

	    answers.forEach(answer => {
			const button = document.createElement('button')
			button.textContent = answer
			
			
			button.addEventListener('click', () => { if (answer === correct) {
				button.classList.add('correct')
				answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
				alert('Correct!')
				return }
			
				button.disabled = true
				alert('Incorrect!')
			})
		
			answersElement.append(button)
		})

	}

	nextQuestionTimout()

	// todo: add the event listener to the "nextQuestion" button
	nextQuestionElement.addEventListener('click', async () => nextQuestionTimout(10000))

})()