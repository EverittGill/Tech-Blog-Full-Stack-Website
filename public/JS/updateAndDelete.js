const updateButtonHandler = async (event) => {
  event.preventDefault();

  const articleId = event.target.dataset.id;
  const title = document.querySelector('.article-title').value.trim();
  const content = document.querySelector('.article-content').value.trim();
  alert(articleId + title + content)
  if (title && content) {
    const response = await fetch(`/api/article/${articleId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    }
  }
};




const delButtonHandler = async (event) => {
  const id = event.target.dataset.id;
    if (event.target.hasAttribute('data-id')) {
      const response = await fetch(`/api/article/${id}`, {
        method: 'DELETE',
      });
        console.log(response, "the update and delete js file is hitting")
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  


  document
  .querySelector('.update-article-btn')
  .addEventListener('click', updateButtonHandler);


  
  document
    .querySelector('.delete-article-btn')
    .addEventListener('click', delButtonHandler);
  

