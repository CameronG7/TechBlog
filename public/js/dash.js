const $title = document.getElementById('title');
const $comment = document.getElementById('comment');

const $dashCard = document.getElementById('dashCard');
const $newPost = document.getElementById('postBtn');


// when you click the title of a card all other cards are hidden and the clicked card is expanded to show the comment section



$newPost.addEventListener('click', async () => {
  
  try {
    
    
    document.location.replace('newPost');
  } catch (err) {
    alert(err);
  }
});


