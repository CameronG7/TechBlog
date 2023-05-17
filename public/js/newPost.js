const $title = document.getElementById('title');
const $content = document.getElementById('content');
const $submitBtn = document.getElementById('submitBtn');
const $dashCard = document.getElementById('dashCard');





$submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const title = $title.value.trim();
  const content = $content.value.trim();

  if (!title || !content) {
    return alert('Please enter a title and content');
  }
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
    
    document.location.href = '/dashboard';
  } catch (err) {
    alert(err);
  }
});
