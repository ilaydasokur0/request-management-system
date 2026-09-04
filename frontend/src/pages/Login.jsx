import '../App.css'
import {useState, useEffect} from "react";


function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

    return (
        <section className="login-page">
            <div>
                <section className="header">
                    <h1>Giriş Yap</h1>
                    <div className="header-line"></div>
                    <p>Hesabınıza giriş yapmak için bilgilerinizi girin.</p>
                </section>
                <section className="form-section">
                    <form className="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const loginData = {
                            email: email,
                            password: password,
                        };
                        console.log(loginData);
                    }}
                    >
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Giriş Yap</button>
                    </form>
                </section>
            </div>
        </section>
    )
}
export default Login;