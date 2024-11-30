import { err, ok } from './error.js';

function validateEmail() {

    const input = document.getElementById('email-input')
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const target = document.getElementById('email-error')

    input.addEventListener('input', (e) => {
        /**
        * @type {string}
        */
        const inputValue = input.value;
        if(!regex.test(inputValue)) {
            displayErrorMsg(target, 'Invalid email format')
        } else {
            hideErrorMsg(target)
        }
    })
}

function validateUsername() {

    const input = document.getElementById('username-input')
    //IF NO INPUT - GTF OUT!!!!
    if(!input) {
        return err('Element is null')
    } else{
        ok(`Element is ${input}`)
    }

    const regex = /\W/;
    const target = document.getElementById('username-error')


    input.addEventListener('input', (e) => {
        /**
        * @type {string}
        */
        const inputValue = input.value;
        if(inputValue.length() < 8) {
            displayErrorMsg(target, 'Username must be at least 8 characters long.')
        } 
        else if(regex.test(inputValue)) {
            displayErrorMsg(target, 'Username cannot contain special characters.')
        }
        else {
            hideErrorMsg(target)
        }
    })
}

function displayErrorMsg(target, string) {
    target.classList.remove('hidden')
    target.textContent = string;
}

function hideErrorMsg(target) {
    target.classList.add('hidden')
}

validateEmail();
validateUsername();
