const init = () => {
    
    const inputAccount= document.querySelector('input[type="account"]');
    const inputBarCode = document.querySelector('input[type="barCode"]');
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

            fetch('http://localhost:8020/api/banking/system/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accountOrigin: inputAccount.value,
                    barCode: inputBarCode.value,
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