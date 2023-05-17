
  const $commentBtn = document.getElementById('commentBtn');
  const $backBtn = document.getElementById('backBtn');
  const $comment = document.getElementById('comment');
  const $commentCard = document.getElementById('commentCard');

  $commentBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const comment = $comment.value.trim();
    const id = $comment.getAttribute('data-id');
    console.log(comment, id);

    if (!comment) {
      return alert('Please enter a comment');
    }
    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        body: JSON.stringify({ comment, id }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      console.log(data);

      location.href = `/`;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  });
  
  // when the back button is clicked, return to the home page
  $backBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    location.href = `/`;
  } 
  );
