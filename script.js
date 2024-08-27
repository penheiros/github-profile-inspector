var form = document.getElementById("github-profile-form");

form.addEventListener('submit', function(event) {

    event.preventDefault();

    var resultBox = document.getElementById('result-box');
    var search = document.getElementById("search-username").value;
    var validatedName = search.split(' ').join('');

    document.getElementById("search-username").value = "";

    fetch(`https://api.github.com/users/${validatedName}`)
        .then(result => result.json())
        .then(data => {            
            for (key in data) {
                if(data[key] == null || data[key].length === 0 || data[key] == undefined){
                    data[key] = "Unavailable"
                }
                console.log(key, data[key]);
            };
            resultBox.innerHTML = `
            <h1 class="result-title">Results</h1>
            <div id="result">
                <div class="userinfo">
                    <div class="section">
                        <img id="user-avatar", src=${data.avatar_url}>
                        <div class="name-container">
                            <p id="user-name">${data.name === 'Unavailable' ? data.login : data.name}</p>
                            <a id="user-login" href=${data.html_url} target="_blank"> ${'@' + data.login}</a>
                        </div>

                    </div>
                </div>
                <div class="userdetails">
                    <p id="user-bio">${data.bio !== 'Unavailable' ? data.bio : "No description."}</p>

                    <div class="follow-container">
                        <p id="user-public-repositories">Public Repos </br> ${data.public_repos}</p>
                        <p id="user-followers">Followers </br> ${data.followers}</p>
                        <p id="user-following">Following </br> ${data.following}</p>
                    </div>

                    <p id="user-location">Location : ${data.location}</p>
                    <p id="user-blog">Website : ${data.blog !== 'Unavailable' ? `<a href=${data.blog} target="_blank">${data.blog}</a>`: `${data.blog}`}</p>
            </div>`
        })
})