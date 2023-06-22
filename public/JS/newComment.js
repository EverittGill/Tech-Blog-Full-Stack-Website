const createNewComment = async (event) => {
    console.log('new comment works in signup.js');
    event.preventDefault();
    const article_id = event.target.dataset.id;
    const description = document.querySelector('.comment-content').value.trim();
    console.log(article_id, description)
    const response = await fetch('/api/article/', {
        method: 'POST',
        body: JSON.stringify({ 
            article_id: article_id,
            description: description,
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
    .querySelector('.new-comment-form')
    .addEventListener('submit', createNewArticle)