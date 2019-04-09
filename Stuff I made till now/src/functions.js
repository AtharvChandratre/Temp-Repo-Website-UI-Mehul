import { generateFeedback, modifyHeaderAddress, modifyStudentFeedbackID } from './index'

function $(selector) {
    return document.querySelector(selector)
}

var web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

var EthereumSession = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_studentid",
				"type": "uint256"
			},
			{
				"name": "_studentname",
				"type": "string"
			},
			{
				"name": "pk",
				"type": "address"
			}
		],
		"name": "addStudent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "giveFeedback",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "numberOfStudents",
				"type": "uint256"
			}
		],
		"name": "setNumberOfStudents",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "checkAdmin",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkFeedbackQ1",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkFeedbackQ2",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "feedbackRecord",
		"outputs": [
			{
				"name": "q1",
				"type": "uint256"
			},
			{
				"name": "q2",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNoOfStudVoted",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalStud",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "returnTotalFeedbackQ1",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "returnTotalFeedbackQ2",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "voted",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

var ethereumSessionInstance = EthereumSession.at(EthereumSession.address);

web3.eth.defaultAccount = web3.eth.accounts[0];

/**
 * Called when a student submits feedback
 * @param {number} answer1 answer to question 1
 * @param {number} answer2 answer to question 2
 */
async function feedbackSubmit(answer1, answer2) {
     var val = ethereumSessionInstance.giveFeedback(answer1,answer2);
     modifyStudentFeedbackID(val);
    console.log('Called feedbackSubmit', answer1, answer2);
}

/**
 * Called when student checks his/her feedback
 */
async function onStudentFeedbackCheck() {
    $('#answer1').value = ethereumSessionInstance.checkFeedbackQ1();
    $('#answer2').value = ethereumSessionInstance.checkFeedbackQ2(); 
    console.log('Called onStudentFeedbackCheck')
}

/**
 * Called when admin checks his/her feedback
 */
async function onAdminFeedbackCheck() {
	var q1value = ethereumSessionInstance.returnTotalFeedbackQ1();
	var q2value = ethereumSessionInstance.returnTotalFeedbackQ2();
	const noOfStudents = ethereumSessionInstance.getNoOfStudVoted();
	q1value/=noOfStudents;
	q2value/=noOfStudents;
    const dummydata = [{
        q1: q1value,
        q2: q2value
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
    ethereumSessionInstance.addStudent (id,name,address);
    console.log('Called addStudent', id, name, address);
}

modifyHeaderAddress(web3.eth.accounts[0])

export { feedbackSubmit, onStudentFeedbackCheck, addStudent, onAdminFeedbackCheck }