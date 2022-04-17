const submitBtn = document.querySelector('#btn');
const main = document.querySelector('.main')
const welcomeWrapper = document.querySelector('.welcome-wrapper')
const password = document.querySelector('input[name="pass"]');
const passwordConfirm = document.querySelector('input[name="passCon"]');
const errorMsg = document.querySelector('.error--msg');




function submitForm() {
    if (password.value !== passwordConfirm.value) {
      password.classList.add('error');
      passwordConfirm.classList.add('error');
      errorMsg.style.display = 'block';
    } else if (password.value === passwordConfirm.value)  {
        main.classList.add('transform');
        welcomeWrapper.classList.add('show');
    } 
}

submitBtn.addEventListener('click', submitForm)