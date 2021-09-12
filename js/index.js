document.addEventListener('DOMContentLoaded', () => {
    // grab <form> by its id
    let form = document.getElementById('github-form');
    // grab <input> by its id
    let search = document.getElementById('search');
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${search.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(res => res.json())
        .then(resObj => {
            let userArr = resObj['items']
            renderUserArr(userArr)
        })
    })
})

function renderUserArr(userArr){
    // grab <ul> by its id
    let userList = document.getElementById('user-list');
    userArr.forEach(user => {
        // create <li>
        let li = document.createElement('li');

        // create <h2> for login
        let h2 = document.createElement('h2');
        h2.textContent = user['login'];
        // create <img> for avator
        let avatar = document.createElement('img')
        avatar.src = user['avatar_url'];
        // create <p> for url
        let link = document.createElement('p')
        link.textContent = user['html_url']

        // appened <h2>, <img>, <p> to <li>
        li.appendChild(h2);
        li.appendChild(avatar);
        li.appendChild(link)

        // append <li> to <ul>
        userList.appendChild(li);

        // Make <h2> interactive; make clicking on <h2> trigger GET fetch the user's repo
        h2.addEventListener('click', () => {
            fetch(`https://api.github.com/users/${user['login']}/repos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/vnd.github.v3+json'
                }
            })
            .then(res => res.json())   
            .then(repoArr => renderRepoArr(repoArr))
        })
    })
}

function renderRepoArr(repoArr){
    // grab <ul> by its id
    let repoList = document.getElementById('repos-list')
    repoArr.forEach(repo => {
        // create <li>
        let li = document.createElement('li');

        // create <h2> for name of repo
        let h2 = document.createElement('h2');
        h2.textContent = repo['name'];
        
        // append <h2> to <li>
        li.appendChild(h2);
        
        // append <li> to <ul>
        repoList.appendChild(li);
    })
}
