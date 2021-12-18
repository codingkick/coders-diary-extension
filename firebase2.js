// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {getDatabase,ref,onValue,set} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,signOut } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "xxxxxxxxxxx...",
authDomain: "xxxxxxxxxxx...",
projectId: "xxxxxxxxxxx...",
storageBucket: "xxxxxxxxxxx...",
messagingSenderId: "xxxxxxxxxxx...",
appId: "xxxxxxxxxxx..."
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
const db=getDatabase(app);
// alert("hey you");
console.log(app);
const auth = getAuth();

//sending response
chrome.runtime.onMessage.addListener((msg,sender,res)=>{
    if(msg.command==="fetch")
    {
        console.log(msg);
        var domain=msg.data.domain;
        var username = msg.data.username;
        // username is same as uid.
        var date = msg.data.date;
        var quename = msg.data.quename;
        var queurl = msg.data.queurl;
        const enc_que = btoa(quename);
        const enc_date = btoa(date);
        // console.log(msg);
        // const datafrombase = ref(db,`${domain}/${username}/${enc_date}/${enc_que}`);
        const datafrombase = ref(db,`submission/${username}/${enc_date}/${enc_que}`);
        onValue(datafrombase,(snap)=>{
            const data = snap.val();
            if(data !== null)
            {
                console.log("data is not null!!");
                res({
                    data:data
                })
            }
            else
            {
                console.log("in the else part");
                set(datafrombase,{quename:quename,queurl:queurl,platform:domain,comment:""});
                const avgdatabase = ref(db,`average/${enc_date}`);
                onValue(avgdatabase,(snap)=>{
                    const data = snap.val();
                    if(data === null)
                    set(avgdatabase,{totalsubmission:1});
                    else
                    {
                        const val = data.totalsubmission;
                        console.log("val : ",val);
                        set(avgdatabase,{totalsubmission:val+1});
                    }
                    
                },{
                    onlyOnce: true
                });

                const databaseref2 = ref(db,'users/'+username);
                onValue(databaseref2,(snapshot)=>{
                    const data = snapshot.val();
                    const val2 = data.total;
                    set(databaseref2,{...data,total:val2+1});
                },{
                    onlyOnce : true
                })

                onValue(datafrombase,(snap)=>{
                    const data = snap.val();
                    console.log(data);
                    res({
                        data:data
                    })
                },{
                    onlyOnce : true
                });
                    }
        },
        {
            onlyOnce: true
          });
    }
    else if(msg.command === "login")
    {
        console.log("login");
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                const databaseref = ref(db,'users/'+user.uid);
                onValue(databaseref,(snapshot)=>{
                    const data = snapshot.val();
                    if(data === null)
                    {
                        set(databaseref,{
                            codechef:"",codeforces:"",collegeName:"",email:user.email,gfg:"",leetcode:"",total:0
                        });
                    }
                },{
                    onlyOnce : true
                });
                res({user:user})
            }).catch((error) => {
                        res({user:null});

            });
    }
    else if(msg.command === "auth")
    {
        console.log("Auth");
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("anauth!!");
              console.log(uid);
              res({user:user});
            } else {
                console.log("nothing here!!")
                res({user:null});
            }
          });
    }
    else if(msg.command === "logout")
    {
        console.log("logout");
        signOut(auth).then(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  const uid = user.uid;
                  console.log("sanauth!!");
                  console.log(uid);
                  res({user:user});
                } else {
                    console.log("signedout")
                    res({user:null});
                }
              });
          }).catch((error) => {
            res({user:null});
          });
    }
    return true;
});
