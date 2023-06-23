const createNewComment = async (event) => {
    console.log('new comment works in signup.js');
    event.preventDefault();
    const article_id = event.target.dataset.id;
    const description = document.querySelector('.comment-content').value.trim();
    console.log(article_id, description)
    const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({ 
            article_id: article_id,
            description: description,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    // console.log(response)
    if (response) {
        console.log('comment successfully created');
        document.location.reload()
    } else {
        alert(response.statusText);
    }
};







document
    .querySelector('.new-comment-form')
    .addEventListener('submit', createNewComment)