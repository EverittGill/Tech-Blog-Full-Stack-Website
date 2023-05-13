const logout = async () => {
    // make a POST request to destroy the session on the back end
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // once the response is received, redirect user to the login page
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  }    



  document
    .querySelector('#logout')
    .addEventListener('click', logout);