const createNewArticle = async (event) => {
    console.log('signup form works in signup.js');
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    console.log(title, content)
    const response = await fetch('/api/article/', {
        method: 'POST',
        body: JSON.stringify({ 
            title: title,
            content: content,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log('Article successfully created');
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};







document
    .querySelector('.new-article-form')
    .addEventListener('submit', createNewArticle)