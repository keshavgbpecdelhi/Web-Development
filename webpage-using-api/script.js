const getUserDetails = async (userName = 'manishojha28') => {
  const url = `https://api.github.com/users/${userName}`;
  const response = await fetch(url);
  const data = await response.json();

  const avatar = document.querySelector('#avatar');
  const name = document.querySelector('.name');
  const username = document.querySelector('.username');
  const doj = document.querySelector('.doj');
  const repos = document.querySelector('.repos');
  const followers = document.querySelector('.followers');
  const following = document.querySelector('.following');
  const location = document.querySelector('.location');
  const twitter = document.querySelector('.twitter');
  const website = document.querySelector('.website');
  const company = document.querySelector('.company');

  avatar.setAttribute('src', data.avatar_url);
  name.innerHTML = data.name;
  username.innerHTML = data.login;
  doj.innerHTML = formatDate(data.created_at);
  repos.innerHTML = data.public_repos;
  followers.innerHTML = data.followers;
  following.innerHTML = data.following;
  location.innerHTML = data.location;
  twitter.innerHTML = data.twitter_username || 'Not Available';
  website.innerHTML = data.blog || 'No Data';
  company.innerHTML = data.company;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const dte = date.getDate();
  let month = date.getMonth();
  const year = date.getFullYear();
  switch (month) {
    case 0:
      month = 'Jan';
      break;
    case 1:
      month = 'Feb';
      break;
    case 2:
      month = 'Mar';
      break;
    case 3:
      month = 'Apr';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'Jun';
      break;
    case 6:
      month = 'Jul';
      break;
    case 7:
      month = 'Aug';
      break;
    case 8:
      month = 'Sep';
      break;
    case 9:
      month = 'Oct';
      break;
    case 10:
      month = 'Nov';
      break;
    case 11:
      month = 'Dec';
      break;
    default:
      break;
  }
  return `Joined ${dte} ${month} ${year}`;
};

getUserDetails();

const submitHandler = () => {
  const userInput = document.querySelector('#username').value;
  console.log(userInput);
  getUserDetails(userInput);
};
