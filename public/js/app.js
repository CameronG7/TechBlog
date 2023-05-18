const $navLogout = document.getElementById('navLogout');
const $navLogin = document.getElementById('navLogin');
const $postTitle = document.querySelectorAll("[id='postTitle']");
const $navHome = document.getElementById('navHome');
const $navDash = document.getElementById('navDash');


console.log($postTitle);
console.log(window.location.pathname);
console.log($navLogout.getAttribute('href'));



let loginStatus = JSON.parse(localStorage.getItem('loginStatus'));

if (loginStatus) { // really lazy way to check if user is logged in
  $navLogout.style.display = 'block';
  $navLogin.style.display = 'none';
} else {
  $navLogout.style.display = 'none';
  $navLogin.style.display = 'block';
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

$navLogout.addEventListener('click', async () => {
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

 
   
    function activeLoop(array) {
      array.forEach((element) => {
        // if the element has an href that matches the current url, add the active class else remove the active class
        if (element.getAttribute('href') === window.location.pathname) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      });
    }

      
    activeLoop([$navHome, $navDash, $navLogin, $navLogout]);

  

