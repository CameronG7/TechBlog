const $title = document.getElementById('title');
const $comment = document.getElementById('comment');
const $submitBtn = document.getElementById('submitBtn');
const $dashCard = document.getElementById('dashCard');





$submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const title = $title.value.trim();
  const comment = $comment.value.trim();

  if (!title || !comment) {
    return alert('Please enter a title and comment');
  }
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, comment }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
    
    document.location.reload();
  } catch (err) {
    alert(err);
  }
});


