import { generateFeedback, modifyHeaderAddress, modifyStudentFeedbackID } from './index'

function $(selector) {
    return document.querySelector(selector)
}

/**
 * Called when a student submits feedback
 * @param {number} answer1 answer to question 1
 * @param {number} answer2 answer to question 2
 */
async function feedbackSubmit(answer1, answer2) {
    modifyStudentFeedbackID('<some-random-dummy-id>')
    console.log('Called feedbackSubmit', answer1, answer2)
}

/**
 * Called when student checks his/her feedback
 */
async function onStudentFeedbackCheck() {
    $('#answer1').value = 5
    $('#answer2').value = 7
    console.log('Called onStudentFeedbackCheck')
}

/**
 * Called when admin checks his/her feedback
 */
async function onAdminFeedbackCheck() {
    const dummydata = [{
        q1: 5,
        q2: 1
    }, {
        q1: 3,
        q2: 7
    }]
    generateFeedback(dummydata)
    console.log('Called onAdminFeedbackCheck')
}

/**
 * Called when admin adds a student
 * @param {number} id student ID
 * @param {string} name student name
 * @param {string} address student address
 */
async function addStudent(id, name, address) {
    console.log('Called addStudent', id, name, address)
}

modifyHeaderAddress('0xABCDEFGHIJKLMNOP')

export { feedbackSubmit, onStudentFeedbackCheck, addStudent, onAdminFeedbackCheck }