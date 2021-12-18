// document.querySelector('section.login').style.display = 'none';
// document.querySelector('section.logout').style.display = 'none';

chrome.runtime.sendMessage({command:"auth"},(res1)=>{
    if(res1.user === null)
    {
        console.log("res of auth : ",res1);
        document.querySelector('section.login').style.display = 'block';
        document.querySelector('section.logout').style.display = 'none';
        document.querySelector('section.login').addEventListener("click",login);
    }
    else
    {
        document.querySelector('section.logout').style.display = 'block';
        document.querySelector('section.login').style.display = 'none';
        document.querySelector('section.logout u').innerHTML = res1.user.email;
        // console.log("here:",res1);
        document.querySelector('section.logout').addEventListener("click",logout);
    }
})

const login = ()=>{
    chrome.runtime.sendMessage({
        command:"login"
    },(res2)=>{
        document.querySelector('section.logout').style.display = 'block';
        document.querySelector('section.login').style.display = 'none';
        document.querySelector('section.logout').addEventListener("click",logout);
        document.querySelector('section.logout u').innerHTML = res2.user.email;
        // console.log("login res received : ",res2.email);
    })
}

const logout = ()=>{
    chrome.runtime.sendMessage({
        command:"logout"
    },(res3)=>{
        console.log("logout res received : ",res3);
        document.querySelector('section.logout').style.display = 'none';
        document.querySelector('section.login').style.display = 'block';
        document.querySelector('section.login').addEventListener("click",login);
    })
}