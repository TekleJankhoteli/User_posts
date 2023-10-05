let container = document.getElementById("container");
let users = document.createElement("div");
let allButton = document.createElement("button");
let posts = document.createElement("div");
let showAllPosts = true;
let selectedUserId = null; 


// style container/usersDiv/postsDiv
container.style.display = "flex";
container.style.justifyContent="center";
container.style.gap="80px";
container.style.backgroundColor="#E7D4CC"

users.style.paddingLeft="30px";

posts.style.marginTop="32px";

// style Allbutton
allButton.style.width = "200px";
allButton.style.height = "30px";
allButton.innerText = "All User";
allButton.style.backgroundColor="#FAF6F5";
allButton.style.border="none";
allButton.style.color="#8B7F7A";
allButton.style.marginTop="10px";
allButton.style.cursor = "pointer";

//  add eventlisteners on all button
allButton.addEventListener("mouseover",()=>{
    allButton.style.backgroundColor="#FFE5CC";
    
})

allButton.addEventListener("mouseout",()=>{
    allButton.style.backgroundColor="#FAF6F5"
})


allButton.addEventListener("click", () => {
    const selectedUsernames = users.querySelectorAll('.selected');
    selectedUsernames.forEach((username) => {
        username.classList.remove("selected");
    });

    showAllPosts = !showAllPosts;
    selectedUserId = null;
    fetchPosts();
});


// function for fetch users and eventlistener for userName
function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((result) => {
            result.forEach((element) => {
                let userName = document.createElement("h2");
                userName.innerText = element.username;
                userName.style.border="2px solid #FAF6F5";
                userName.style.color="#8B7F7A";
                userName.style.textAlign="center";
                userName.style.cursor = "pointer";


             
    
            //    cklick
                userName.addEventListener("click", () => {
                    console.log("cklicked")
                    let firstSelectedUser=users.querySelector('.selected')
                    if(firstSelectedUser){
                        firstSelectedUser.classList.remove("selected")
                    }

                    userName.classList.add("selected");
                    selectedUserId=element.id;
                    showAllPosts = false;
                    fetchPostsByUserId(selectedUserId); 
                });


              
                users.appendChild(userName);
                
            });
        });
}

// function for fetch posts
function fetchPosts() {
    posts.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((result) => {
            result.forEach((element) => {
                if (showAllPosts) {
                    let userPost = document.createElement("h2");
                    userPost.innerText ="*" +element.title ;
                    userPost.style.fontStyle="italic";
                    userPost.style.borderBottom="2px solid #FAF6F5";
                    posts.appendChild(userPost);
                }
            });
        });
}

// function for fetching specific post by ID  
function fetchPostsByUserId(userId) {
    posts.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((result) => {
            result.forEach((element) => {
                if (!showAllPosts && element.userId === userId) {
                    let userPost = document.createElement("h2");
                    userPost.innerText ="*"+ element.title;
                    userPost.style.borderBottom="2px solid #FAF6F5";
                    userPost.style.fontStyle="italic";
                  
                  
                    posts.appendChild(userPost);
                }
            });
        });
}

fetchUsers();
fetchPosts();

container.appendChild(users);
users.appendChild(allButton);
container.appendChild(posts);




