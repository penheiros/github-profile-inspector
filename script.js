var form = document.getElementById("github-profile-form")
form.addEventListener('submit', function(event) {
    event.preventDefault();

    var resultContainer = document.getElementById('result')
    var search = document.getElementById("search-username").value;
    var validatedName = search.split(' ').join('')
    resultContainer.style.height = 'auto';

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
            for (key in data) {if(data[key] == null || data[key].length === 0) {data[key] = "Unavailable"}}
            console.log(data);
            userAvatar.setAttribute("src", data.avatar_url);
            userName.innerHTML = data.name;
            userProfileLink.innerHTML = `Profile Link`;
            userProfileLink.setAttribute('href', data.html_url);
            userProfileLink.setAttribute('target', target="_blank");
            userLoginName.innerHTML = `Username : ${data.login}`;
            userFollowers.innerHTML = `Followers : ${data.followers}`;
            userLocation.innerHTML = `Location : ${data.location}`;
            userRepos.innerHTML = `Public Repositories : ${data.public_repos}`;
            userBio.innerHTML = `Description : ${data.bio}`;

            if (data.blog.value != undefined) {userBlog.innerHTML = `Website : <a href=${data.blog} target="_blank">${data.blog}</a>`;
            } else {userBlog.innerHTML = `Website : ${data.blog}`}
        })
})