import '../App.css'
import {useState} from "react";
function CreateRequest() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [department, setDepartment] = useState("");

    return (
        <section className="create-request-page">
            <div>
                <section className="header">
                    <h1>Yeni Talep Oluştur</h1>
                    <div className="header-line"></div>
                    <p>Formu doldurarak yeni bir talep oluşturabilirsiniz.</p>
                </section>

                <section className="form-section">
                    <form className="request-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const newRequest = {
                            title: title,
                            description: description,
                            priority: priority,
                            department: department,
                        };
                        fetch("http://localhost:5145/api/request", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newRequest),
                        })
                        .then((response) => {
                            if (response.ok) {
                                alert("Talep başarıyla oluşturuldu!");
                            } else {
                                alert("Talep oluşturulamadı. Lütfen tekrar deneyin.");
                            }
                        })
                        .catch((error) => {
                            console.error("Error creating request:", error);
                            alert("Talep oluşturulamadı. Lütfen tekrar deneyin.");
                        });
                    }}
                    >
                        <label htmlFor="title">Talep Başlığı:</label>
                        <input type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />

                        <label htmlFor="description">Talep Açıklaması:</label>
                        <textarea id="description"
                        name="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <label htmlFor="priority">Talep Önceliği:</label> 
                        <select name="priority" id="priority" required
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Öncelik Seçin</option>
                            <option value="Low">Düşük</option>
                            <option value="Medium">Orta</option>
                            <option value="High">Yüksek</option>
                        </select>

                        <label htmlFor="department">Departman:</label>
                        <select name="department" id="department" required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="">Departman Seçin</option>
                            <option value="it">IT</option>
                            <option value="hr">İK</option>
                            <option value="finance">Finans</option>
                        </select>
                        <button type="submit">Talep Oluştur</button>
                    </form>
                </section>
            </div>
        </section>
        )
    }
export default CreateRequest