var form = document.getElementById("github-profile-form")
form.addEventListener('submit', function(event) {
    event.preventDefault();

    var resultBox = document.getElementById('result-box');
    var search = document.getElementById("search-username").value;
    var validatedName = search.split(' ').join('')

    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const userProfileLink = document.getElementById('user-profile-link');
    const userLoginName = document.getElementById('user-login-name');
    const userFollowers = document.getElementById('user-followers');
    const userLocation = document.getElementById('user-location');
    const userBlog = document.getElementById('user-blog');
    const userRepos = document.getElementById('user-public-repositories');
    const userBio = document.getElementById('user-bio');

    fetch(`https://api.github.com/users/${validatedName}`)
        .then(result => result.json())
        .then(data => {            
            for (key in data) {
                if(data[key] == null || data[key].length === 0){
                    data[key] = "Unavailable"
                }
            };
            
            resultBox.innerHTML = `
            <h1 class="result-title">Results</h1>
            <div id="result">
                <div class="userinfo">
                    <img id="user-avatar", src=${data.avatar_url}>
                    <p id="user-name">${data.name}</p>
                    <a id="user-profile-link" href=${data.html_url} target='_blank'>Profile Link</a>
                </div>
                <div class="userdetails">
                    <p id="user-followers">Followers : ${data.followers}</p>
                    <p id="user-location">Location : ${data.location}</p>
                    <p id="user-blog">Website : ${data.blog !== 'Unavailable' ? `<a href=${data.blog} target="_blank">${data.blog}</a>`: `${data.blog}`}</p>
                    <p id="user-public-repositories">Public Repositories : ${data.public_repos}</p>
                    <p id="user-bio">Description : ${data.bio}</p>
            </div>`

            console.log(data.blog)
        })
})