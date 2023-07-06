var form = document.getElementById("github-profile-form")


form.addEventListener('submit', function(event) {
    event.preventDefault();

    var search = document.getElementById("search-username").value;
    var validatedName = search.split(' ').join('')
    var resultContainer = document.getElementById('result')

    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const userLoginName = document.getElementById('user-login-name');
    const userFollowers = document.getElementById('user-followers');
    const userRepos = document.getElementById('user-public-repositories');
    const userBio = document.getElementById('user-bio');

    fetch(`https://api.github.com/users/${validatedName}`)
        .then(result => result.json())
        .then(data => {
            console.log(data);
            userAvatar.setAttribute("src", data.avatar_url);
            userName.innerHTML = data.name;
            userLoginName.innerHTML = `Username : ${data.login}`;
            userFollowers.innerHTML = `Followers : ${data.followers}`;
            userRepos.innerHTML = `Public Repositories : ${data.public_repos}`;
            
            if (data.bio == null) {
                userBio.innerHTML = "Description : Empty";
            } else {userBio.innerHTML = `Description : ${data.bio}`;}
        })
    
    resultContainer.style.height = 'auto';
})