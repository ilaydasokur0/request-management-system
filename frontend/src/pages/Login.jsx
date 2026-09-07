import '../App.css'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';


function Login() {
const navigate = useNavigate();
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
                        fetch("http://localhost:5145/api/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(loginData),
                        })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json();
                        })
                        .then((data) => {
                            localStorage.setItem("token", data.token);
                            navigate("/");
                        })
                        .catch((error) => {
                            console.error("Error during login:", error);
                            alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
                        });
                    }}
                    >
                        <label htmlFor="email">Email</label>
                        <div className="login-input-wrapper">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            <input type="email" id="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <label htmlFor="password">Şifre</label>
                        <div className="login-input-wrapper">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            <input type="password" id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit">Giriş Yap</button>
                    </form>
                </section>
            </div>
        </section>
    )
}
export default Login;