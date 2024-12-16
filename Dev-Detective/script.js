const themeBtn = document.querySelector('[data-changeThemeBtn]');
const wrapper = document.querySelector('.wrapper');
const h1 = document.querySelector('h1');
const formContainer = document.querySelector('.form-container');
const inputField = document.querySelector('.formInput');
const inputPlaceHolder = document.querySelector('.formInput::placeholder');
const resultContainer = document.querySelector('.result-container');
const reposInfo = document.querySelector('.repos-info');
const bioInfo = document.querySelector('.bio');
const personalInfoContainer = document.querySelector('.personal-info');
const darkThemeBtn = document.querySelector('[data-DarkTheme]');
const lightThemeBtn = document.querySelector('[data-LightTheme]');
const errorContainer = document.querySelector('[data-errorMsg]');
const dataFormBtn = document.querySelector('[data-formBtn]');
const crosscont = document.querySelector('[data-clearInput]');


themeBtn.addEventListener('click',changeTheme);

changeTheme();
getUserInfo('chayanmallick13');

inputField.addEventListener('input',(e) => {
    errorContainer.classList.remove('active');
    if(inputField.value){
        crosscont.classList.add('active');
    }
    else{
        crosscont.classList.remove('active');
    }
});

crosscont.addEventListener('click',(e) => {
    inputField.value='';
    crosscont.classList.remove('active');
    errorContainer.classList.remove('active');
});

function changeTheme(){
    if(!wrapper.classList.contains('dark')){ //light mode 
        wrapper.classList.add('dark');
        h1.classList.add('dark');
        formContainer.classList.add('dark');
        inputField.classList.add('dark');
        resultContainer.classList.add('dark');
        reposInfo.classList.add('dark');
        bioInfo.classList.add('dark');
        personalInfoContainer.classList.add('dark');
        darkThemeBtn.classList.add('dark');
        lightThemeBtn.classList.add('dark');

    }
    else{
        wrapper.classList.remove('dark');
        h1.classList.remove('dark');
        formContainer.classList.remove('dark');
        inputField.classList.remove('dark');
        resultContainer.classList.remove('dark');
        reposInfo.classList.remove('dark');
        bioInfo.classList.remove('dark');
        personalInfoContainer.classList.remove('dark');
        darkThemeBtn.classList.remove('dark');
        lightThemeBtn.classList.remove('dark');
    }
}


dataFormBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const username = inputField.value;
    if(username){
        getUserInfo(username);
    }
    else{
        errorContainer.classList.add('active');
    }
});



async function getUserInfo(userName){
    try{
        const response = await fetch(`https://api.github.com/users/${userName}`);
        const userData = await response.json();
        fetchDatainUI(userData);
    }
    catch(e){
        errorContainer.classList.add('active');
    }
}

function fetchDatainUI(userData){
    const userImg = userData?.avatar_url;
    const userName = userData?.name;
    const dates = userData?.created_at.slice(0,10);
    const date1 = new Date(dates);
    const date = date1.toString();
    const joinedDate = date.slice(8,10)+" "+date.slice(4,7) + " " + date.slice(11,15);
    console.log(joinedDate);
    const userProfile = '@' + userData?.login;
    const userProfileLink = userData?.html_url;
    const bio = userData?.bio;
    const repocount = userData?.public_repos;
    const followers = userData?.followers;
    const following = userData?.following;
    const location = userData?.location;
    const blog = userData?.blog;
    const twitter = userData?.twitter_username;
    const twitterLink = `https://x.com/${twitter}`;
    const companyName = userData?.company;


    const imageContiner = document.querySelector('[data-userImage]');
    const userNameCont = document.querySelector('[data-userName]');
    const datecontainer = document.querySelector('[data-userJoiningDate]');
    const userid = document.querySelector('[data-userProfileLink]');
    const biocont = document.querySelector('[data-userBio]');
    const repoCount = document.querySelector('[data-reposCount]');
    const followcount = document.querySelector('[data-followersCount]');
    const followingcnt = document.querySelector('[data-FollowingCount]');
    const userLocation = document.querySelector('[data-userLocation]');
    const blogsite = document.querySelector('[data-userWebsiteLink]');
    const twittercont = document.querySelector('[data-userTwitterLink]');
    const companycont = document.querySelector('[data-userCompanyName]');

    imageContiner.src = userImg;
    userNameCont.textContent = userName;
    datecontainer.textContent = joinedDate;
    userid.textContent = userProfile;
    userid.href = userProfileLink;
    biocont.textContent = (bio)?bio:"Bio is Not Available";
    repoCount.textContent = repocount;
    followcount.textContent = followers;
    followingcnt.textContent = following;
    userLocation.textContent = (location)?location:"Not Available";
    blogsite.textContent = (blog)?blog:"Not Available";
    blogsite.href = (blog)?blog:"#";
    twittercont.textContent = (twitter)?twitter:"Not Available";
    twittercont.href = (twitter)?twitterLink:"#";
    companycont.textContent = (companyName)?companyName:"Not Available";

    if(twitter){
        twittercont.style.textDecoration = 'underline';
    }
    if(blog){
        blogsite.style.textDecoration = 'underline';
    }

}

