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

function fetchGitHubInformation (event){

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
    $.getJSON(`https://api.github.com/users/${username}`)
).then(
    // if previous function is done, goes another one
    function(response) {
        let userData = response; //we put a response from JSON to userData variable
        $('#gh-user-data').html(userInformationHTML(userData)); // we select a user data div and set the result to another function called userInformationHTML with argument of userData
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
