let domain=window.location.hostname;

// console.log("here :",document.getElementsByClassName("nav-item-container__16kF"));
// console.log(domain);
domain=domain.replace('http://','').replace('https://','').replace('www.','').split(/[/?#.]/)[0];
// console.log(domain);
// sending data to firebase
let userid = "";
let quename = "";
let queurl = window.location.href;
if(domain === "leetcode")
{
    window.onload = ()=>{
        setTimeout(()=>doThis(),2000);
    };
    function doThis()
    {
        var temp_name = document.getElementsByClassName('css-v3d350')[0].innerHTML;
        quename = temp_name.split(".")[1].trim();
        // console.log(quename);
        // console.log(document.getElementsByClassName('submit__2ISl css-ieo3pr'));
        setTimeout(()=>{
            onpageload();
        },2000);
    }
    function onpageload()
    {
        document.getElementsByClassName('submit__2ISl css-ieo3pr')[0].addEventListener("click",function(){
            console.log("clicked");
            setTimeout(()=>{
                var today = new Date();
                // console.log("clicked");
                var date = today.getDate();
                var month = today.getMonth()+1;
                if(date<=9)
                date = '0'+date;
                if(month<=9)
                month = '0'+month;
                var year = today.getFullYear();
                var curr_date = month+'/'+date+'/'+year;
                const st = document.getElementsByClassName('status-column__3SUg')[1];
                if(st !== undefined)
                {
                    const status = document.getElementsByClassName('status-column__3SUg')[1].innerText;
                    if(status === 'Accepted')
                    {
                        // console.log("Accepted");
                        const sinfo = document.getElementsByClassName('time-column__1guG')[1].innerText;
                        // console.log(sinfo);
                        const detail = sinfo.split(" ");
                        const sdate = detail[0];
                        // console.log(sdate);
                        if(sdate === curr_date)
                        {
                            console.log("matched");
                            chrome.runtime.sendMessage({command:"auth"},(res1)=>{
                                // console.log(res1);
                                if(res1.user!==null)
                                {
                                    // console.log("res1.user : ",res1.user);
                                    chrome.runtime.sendMessage({command:"fetch",data:{
                                        domain:domain,username:res1.user.uid,date:curr_date,quename:quename,queurl:queurl
                                    }},(res)=>{
                                        //response from html;
                                        // console.log("response is : ",res);
                                        console.log("Accepted");
                                    });
                                }
                                else
                                {
                                    console.log("login first!!");
                                    chrome.runtime.sendMessage({
                                        command:"login"
                                    },(res2)=>{
                                        chrome.runtime.sendMessage({command:"fetch",data:{
                                            domain:domain,username:res2.user.uid,date:curr_date,quename:quename,queurl:queurl
                                        }},(res)=>{
                                            //response from html;
                                            // console.log("response is : ",res);
                                            console.log("Accepted");
                                        });
                                    })
                                }
                            })
                            
                            
                        }
                    }
                    else
                    {
                        console.log(status);
                        // console.log("wrong answer!!");
                    }
                }
                else
                {
                    console.log("sorry for the inconvenience, please re-submit")
                }
                
            },10000);
        });
    }
}
else if(domain === "practice")
{
    function doThis(){
        // console.log("hello!!");
        var submitBtn = document.getElementById("run")
        // console.log(submitBtn);
        // submitBtn.addEventListener("click",(btn)=>{submitclick(btn,submitBtn)});
        submitBtn.addEventListener("click",function(){
            console.log("clicked");
            setTimeout(()=>{
                let el = document.querySelector(".cmp_rsp h3");
                if(el.innerText === 'Problem Solved Successfully ')
                {
                    quename = document.getElementsByClassName("problem-tab__name")[0].innerText;
                    var today = new Date();
                    // console.log(today+"day");
                    var date = today.getDate();
                    var month = today.getMonth()+1;
                    if(date<=9)
                    date = '0'+date;
                    if(month<=9)
                    month = '0'+month;
                    var year = today.getFullYear();
                    var curr_date = month+'/'+date+'/'+year;
                    chrome.runtime.sendMessage({command:"auth"},(res1)=>{
                        // console.log(res1);
                        if(res1.user!==null)
                        {
                            // console.log("res1.user : ",res1.user);
                            chrome.runtime.sendMessage({command:"fetch",data:{
                                domain:domain,username:res1.user.uid,date:curr_date,quename:quename,queurl:queurl
                            }},(res)=>{
                                //response from html;
                                // console.log("response is : ",res);
                                console.log("Accepted")
                            });
                        }
                        else
                        {
                            console.log("login first!!");
                            chrome.runtime.sendMessage({
                                command:"login"
                            },(res2)=>{
                                chrome.runtime.sendMessage({command:"fetch",data:{
                                    domain:domain,username:res2.user.uid,date:curr_date,quename:quename,queurl:queurl
                                }},(res)=>{
                                    //response from html;
                                    // console.log("response is : ",res);
                                    console.log("Accepted")
                                });
                            })
                        }
                    })
                }
                else
                console.log(el.innerText);
            },10000);
        })
    }
    // function submitclick(btn,submitBtn){
    //     setTimeout(()=>{
    //         // console.log("submit button clicked!!");
    //         let el = document.querySelector(".cmp_rsp h3");
    //         if(el.innerText === 'Problem Solved Successfully ')
    //         {
    //             quename = document.getElementsByClassName("problem-tab__name")[0].innerText;
    //             var today = new Date();
    //             // console.log(today+"day");
    //             var date = today.getDate();
    //             var month = today.getMonth()+1;
    //             if(date<=9)
    //             date = '0'+date;
    //             if(month<=9)
    //             month = '0'+month;
    //             var year = today.getFullYear();
    //             var curr_date = month+'/'+date+'/'+year;
    //             chrome.runtime.sendMessage({command:"auth"},(res1)=>{
    //                 // console.log(res1);
    //                 if(res1.user!==null)
    //                 {
    //                     // console.log("res1.user : ",res1.user);
    //                     chrome.runtime.sendMessage({command:"fetch",data:{
    //                         domain:domain,username:res1.user.uid,date:curr_date,quename:quename,queurl:queurl
    //                     }},(res)=>{
    //                         //response from html;
    //                         console.log("response is : ",res);
    //                     });
    //                 }
    //                 else
    //                 {
    //                     console.log("login first!!");
    //                     chrome.runtime.sendMessage({
    //                         command:"login"
    //                     },(res2)=>{
    //                         chrome.runtime.sendMessage({command:"fetch",data:{
    //                             domain:domain,username:res2.user.uid,date:curr_date,quename:quename,queurl:queurl
    //                         }},(res)=>{
    //                             //response from html;
    //                             console.log("response is : ",res);
    //                         });
    //                     })
    //                 }
    //             })
    //         }
    //         else
    //         console.log(el.innerText);
    //     },10000);
    // }
    window.onload = ()=>{
        doThis();
    };
}
