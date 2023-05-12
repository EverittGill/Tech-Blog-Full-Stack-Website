const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if( email && password ) {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        console.log(response)
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
  }
};


  



    const signupFormHandler = async (event) => {
        console.log('signup form works in signup.js');
        event.preventDefault();
    
        const username = document.querySelector('#username-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
        console.log(username, email, password)
        const response = await fetch('/api/user/', {
            method: 'POST',
            body: JSON.stringify({ 
                name: username,
                email: email,
                password: password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            console.log('User successfully created');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    };
    
    document
        .querySelector('.signup-form')
        .addEventListener('submit', signupFormHandler);
    


    document
        .querySelector('.login-form')
        .addEventListener('submit', loginFormHandler);
    
    