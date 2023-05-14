const $username = document.getElementById("username");
const $password = document.getElementById("password");
const $email = document.getElementById("email");
const $submitBtn = document.getElementById("submitBtn");

$submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = $username.value;
  const password = $password.value;
  const email = $email.value;

  if(!username || !password || !email){
    return alert("Please enter a username, password, and email")
  }
  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    loginStatus = true;
    localStorage.setItem('loginStatus', true);
    // create li html element
    location.href = `/dashboard`

    
  }catch(err){alert(err)}
  
});