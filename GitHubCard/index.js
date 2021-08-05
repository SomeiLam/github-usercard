/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
function getUser(name) {
  axios.get(`https://api.github.com/users/${name}`)
    .then(res => {
      container.appendChild(userMaker(res));
      
      console.log(res)
    })
    .catch(err => {
      console.error(err);
    })
}
getUser('someilam')

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

const container = document.querySelector('.container');

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get('https://api.github.com/users/SomeiLam/followers')
     .then(res => {
       res.data.forEach(user => {
         followersArray.push(user);
         getUser(user.login);
       });
     }).catch(err => {console.error(err);})



/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function userMaker(obj) {
  // div.card
  const userCard = document.createElement('div')
  userCard.classList.add('card');

  // img
  const image = document.createElement('img');
  image.src = obj.data.avatar_url;
  userCard.appendChild(image);

  // button
  const expandButton = document.createElement('button');
  expandButton.classList.add('button');
  expandButton.textContent = '+';
  expandButton.style.height = '2em'
  expandButton.style.marginRight = '1.5em';
  expandButton.style.marginTop = '5em';
  expandButton.style.width = '25px';
  userCard.appendChild(expandButton);

  // div.card-info
  const cardInfo = document.createElement('div')
  cardInfo.classList.add('card-info');
  cardInfo.style.display = 'none';
  userCard.appendChild(cardInfo);

  // h3.name
  const userName = document.createElement('h3');
  userName.classList.add('name');
  userName.textContent = obj.data.login;
  cardInfo.appendChild(userName);

  // p.username
  const usersUserName = document.createElement('p');
  usersUserName.classList.add('username');
  usersUserName.textContent = obj.data.name;
  cardInfo.appendChild(usersUserName);

  // p location
  const location = document.createElement('p');
  if (obj.data.location === null) {
    location.textContent = `Location: Private`;
  } else {
    location.textContent = `Location: ${obj.data.location}`;
  }
  cardInfo.appendChild(location);

  // p followers & following & bio
  const followers = document.createElement('p');
  followers.textContent = `Followers: ${obj.data.followers}`;
  cardInfo.appendChild(followers);
  const followings = document.createElement('p');
  followings.textContent = `Followings: ${obj.data.following}`;
  cardInfo.appendChild(followings);
  const bio = document.createElement('p');
  bio.textContent = `Bio: ${obj.data.bio}`;
  cardInfo.appendChild(bio);
  
  // button event listener
  expandButton.addEventListener('click', () => {
    if (cardInfo.style.display == 'none') {
      cardInfo.style.display = 'block';
      expandButton.textContent = '-';
    } else {
      cardInfo.style.display = 'none';
      expandButton.textContent = '+';
    }
  })

  return userCard;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/