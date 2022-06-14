const init = () => {
    
    const inputAccountOrigin= document.querySelector('input[type="accountOrigin"]');
    const inputAccountDestination = document.querySelector('input[type="accountDestination"]');
    const inputValue = document.querySelector('input[type="Value"]');
    const submitButton = document.querySelector('.login__submit');

    const errorHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('success');
        submitButton.classList.add('error');
        submitButton.textContent = "Error :(";
    }

    const successHandler = () => {
        submitButton.classList.remove('loading');
        submitButton.classList.remove('error');
        submitButton.classList.add('success');
        submitButton.textContent = "Sent! :)";
    }

    if(submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            submitButton.textContent = "Loading...";

            fetch('http://localhost:8080/api/banking/system/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accountOrigin: inputAccountOrigin.value,
                    accountDestination: inputAccountDestination.value,
                    value: inputValue.value
                })
            }).then((response) => {
                if (response.status !== 200) {
                    return errorHandler();
                }
                
                successHandler();
                
            }).catch(() => {
                errorHandler();
            })
        })
    }
}

window.onload = init;