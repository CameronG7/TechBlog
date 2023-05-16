const $navLogoutA = document.getElementById('navLogout');
const $navLoginA = document.getElementById('navLogin');
const $postTitle = document.querySelectorAll("[id='postTitle']");

console.log($postTitle);

if (location.href.includes('post')) {
  const $commentBtn = document.getElementById('commentBtn');
  const $backBtn = document.getElementById('backBtn');
  const $comment = document.getElementById('comment');

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
}

let loginStatus = JSON.parse(localStorage.getItem('loginStatus'));

if (loginStatus) {
  $navLogoutA.style.display = 'block';
  $navLoginA.style.display = 'none';
} else {
  $navLogoutA.style.display = 'none';
  $navLoginA.style.display = 'block';
}

//when a post title is clicked, grab the post id and send it to the api route to get the post
$postTitle.forEach((post) => {
  post.addEventListener('click', async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute('data-id');
    console.log(postId);

    location.href = `/post/${postId}`;
  });
});

$navLogoutA.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST'
    });

    localStorage.setItem('loginStatus', false);

    // create li html element
    location.href = `/login`;
  } catch (err) {
    console.log(err);
    alert(err);
  }
});
