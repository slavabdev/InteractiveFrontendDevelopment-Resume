//THEN ADD THIS 
// Add a user information to the DOM
function userInformationHTML(user) { //user is an object that been returned from the GitHub API (to see all the properties of user console.log(user))
    //it will return users public name
    return `
        <h2>${user.name}  
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>    
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src ="${user.avatar_url}" width="80" height="80" alt="${user.login}"/> 
                </a>
            </div>  
            <p>Followers: ${user.followers} - Following: ${user.folowing} <br> Repos: ${user.public_repos}</p>
        </div>`
}
 // @<a that will let a link to appear before the users name. Link lead to the user profile. text in anchor tag is users login (comment to lines 4-8)

 // comment to line 9-14 we want to display users avatar

 // comment to line 15 -  we want to show a user followers and following and public repos

function repoInformationHTML(repos) {    //GitHub returns a value of repo in array, so here we will use an array method
    if (repos.length === 0) {
        return `<div class="clearfix repo-list">No repos!</div>`
    }
let listItemsHTML = repos.map(function(repo){  //map method similar to forEach, but it returns a result in array  
    return `<li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
});

return `<div class="clearfix repo-list">
            <p>
                <strong>Repo List:</strong>
            </p>    
                <ul>
                    ${listItemsHTML.join("\n")}   
                </ul>
        </div>`
}

 //STARTED CODE FROM THIS FUNCTION (below)

 function fetchGitHubInformation(event){
     $('gh-user-data').html('');
    $('gh-repo-data').html('');

    let username = $("#gh-username").val();
    // first we make a new variable to hold in an id and value  
    if(!username) {
            $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
            return;
            // if username wasn't typed in gh-user-data, then add a h2
    };

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." /> 
       </div>`); 
        // when name is typed add a div to htm to show a loading gif.
    
//Promise
$.when(
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)  //now we want to get a response for repos
).then(
    // if previous function is done, goes another one
    
    function(firstResponse, secondResponse) {  //By the reason we have 2 responses, we add one more response
        let userData = firstResponse[0];//we put a response from JSON to userData variable
        let repoData = secondResponse[0];//we put a response from JSON to userData variable
        //when we do two calls like this, the when() method packs a response up into arrays. And each one is the first element of the array. So we just need to put the indexes in there for these responses.

        $('#gh-user-data').html(userInformationHTML(userData)); // we select a user data div and set the result to another function called userInformationHTML with argument of userData
        $('#gh-repo-data').html(repoInformationHTML(repoData));
    }, function(errorResponse) {
        if (errorResponse.status === 404) { //if 404 error will take place show the text below
            $('#gh-user-data').html(`<h2> No user found for user ${username}`)
        } else {  // if any other errors will occure show the text below.
            console.log(errorResponse)
            $('#gh-user-data').html(`<h2>Error:${errorResponse.responseJSON.message} </h2>`) //show the JSON response we get back
        }
    });
}
    //username is value
//in this case 1st argument is function 
$(document).ready(fetchGitHubInformation);