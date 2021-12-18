// document.getElementsByClassName('ac__35gz')
async function func()
{
    setTimeout(()=>{
        const el = document.getElementsByClassName('ac__35gz')
        if(el === undefined)
        {
            console.log("in timeout")
            return await func();
        }
        else
        {
            alert(el.length);
            return el.length();

        }
    },2000);
}

function func2(initial_len)
{
    setTimeout(()=>{
        const el = document.getElementsByClassName('ac__35gz')
        if(el === undefined || el.length === initial_len)
        {
            console.log("in timeout2")
            return func2(initial_len);
        }
        else
        {
            alert(el.length);
            return el.length();

        }
    },2000);
}

window.onload = () =>{
    console.log("app3.js is working fine.")
    const initial_len = await func();
    console.log(initial_len);
    // const final_len = await func2(initial_len);
    // console.log(final_len,initial_len);
}