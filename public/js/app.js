const $navLogoutA = document.getElementById("navLogout");
const $navLoginA = document.getElementById("navLogin");
let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));

if (loginStatus) {
  $navLogoutA.style.display = "block";
  $navLoginA.style.display = "none";
} else {
  $navLogoutA.style.display = "none";
  $navLoginA.style.display = "block";
}


$navLogoutA.addEventListener("click", async () => {
 
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      
    });

    localStorage.setItem("loginStatus", false);


    // create li html element
    location.href = `/login`

    
  }catch(err){
    console.log(err)
    alert(err)}
  
});

