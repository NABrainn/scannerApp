function validateEmail() {

    const input = document.getElementById('email-input')
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMessage = document.getElementById('email-error')
    const emailFlash = document.querySelector('.email-flash')

    input.addEventListener('input', (e) => {
        /**
        * @type {string}
        */
        const inputValue = input.value;
        if(!regex.test(inputValue)) {
            displayErrorMsg(errorMessage, 'Invalid email format')
            input.parentNode.appendChild(errorMessage);
        } else {
            hideErrorMsg(errorMessage, emailFlash)
        }
    })
}

function validateUsername() {

    const input = document.getElementById('username-input')
    //IF NO INPUT - GTF OUT!!!!
    if(!input) {
        return;
    }

    const regex = /\W/;
    const errorMessage = document.getElementById('username-error')
    const usernameFlash = document.querySelector('.username-flash')

    input.addEventListener('input', (e) => {
        /**
        * @type {string}
        */
        const inputValue = input.value;
        if(inputValue.length() < 8) {
            displayErrorMsg(errorMessage, 'Username must be at least 8 characters long.')
        } 
        else if(regex.test(inputValue)) {
            displayErrorMsg(errorMessage, 'Username cannot contain special characters.')
        }
        else {
            hideErrorMsg(errorMessage, usernameFlash)
        }
    })
}

function displayErrorMsg(msg, string) {
    msg.classList.remove('hidden')
    msg.textContent = string;
    msg.classList.add('text-danger')
}

function hideErrorMsg(msg, flash) {
    msg.classList.add('hidden')
    if (msg) {
        msg.remove();
        if(flash) {
            flash.remove();

        }
    }
}

validateEmail();
validateUsername();
