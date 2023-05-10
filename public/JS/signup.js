// const signupFormHandler = async (event) => {
//     console.log('signup form works in signup.js');
//     event.preventDefault();

//     const username = document.querySelector('#username-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();

//     const response = await fetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({ 
//             name: username,
//             email: email,
//             password: password,
//         }),
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         console.log('User successfully created')
//         document.location.replace('/homepage');
//     } else {
//         alert(response.statusText);
//     }
// };

// document
//     .querySelector('#sign-up')
//     .addEventListener('click', signupFormHandler);








const signupFormHandler = async (event) => {
    console.log('signup form works in signup.js');
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username, email, password)
    const response = await fetch('/api/user', {
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
        document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('click', signupFormHandler);
