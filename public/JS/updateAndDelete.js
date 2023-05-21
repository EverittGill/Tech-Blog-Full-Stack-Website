const delButtonHandler = async (event, id) => {
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
    .querySelector('.delete-article-btn')
    .addEventListener('submit', delButtonHandler);
  

