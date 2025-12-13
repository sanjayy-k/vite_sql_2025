
import './Login.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const n=useNavigate();
    const Login = async () => {
        try {

             if (!userName || !password) {
        alert('Please fill in both username and password.');
        return;
      }
           localStorage.setItem("uname",userName)
            // console.log(uname)
            const res = await fetch('https://vitesql2025-production.up.railway.app/api/validate', {
               
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailId: userName,
                    password: password
                }),
            }  
        ) ;

            if (res.status === 200) {
                const data = await res.json();
                if (data.status === 'success') {
                   n('/Shoppingcart') // Redirect only if user exists and credentials are correct
                } else {
                    alert("User does not exist or invalid credentials"); // User does not exist or invalid credentials
                }
            }
             else {
                alert('username Does not exist or Invalid password: ' + res.status);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred, please try again later.');
        }
    };

useEffect(()=>{ 
    async function getUser() {
      try {
        const res = await fetch('https://vitesql2025-production.up.railway.app/api/users'); 
         const data = await res.json();
        //  console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  getUser();
  },[])

  return (
    
     <section className = "urlimg">
            <div className="form-box">
                <div className="form-value">
                    <form action="">
                        <h2>Login</h2>
                        <div className="inputbox">
                            {/* <ion-icon name="mail-outline"></ion-icon> */}
                            <input
                                // type="email" placeholder="your.email@example.com"
                                name="email"
                                id="a"
                                required
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label>UserName</label>
                        </div>
                        <div className="inputbox">
                            {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                            <input
                                type="password"
                                name="password"
                                id="b"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Password</label>
                        </div>
                        <div className="forget">
                            <label>
                                <input type="checkbox" />
                                Remember me <a href="/Signup">Sign Up</a>
                            </label>
                        </div>
                        <button type="button" id="loginButton" onClick={Login}>Login</button>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Login;
