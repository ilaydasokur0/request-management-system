import '../App.css'
import {useState, useEffect} from "react";
function CreateRequest() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [department, setDepartment] = useState(""); // seçilen departmanı tutuyoruz
    const [departments, setDepartments] = useState([]); // bütün departmanları tutuyoruz

    useEffect(() => {
        fetch("http://localhost:5145/api/department") // backendden departmanları çekiyoruz
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((error) => console.error("Error fetching departments:", error));
    }
, []); 

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
                            departmentId: department, // seçilen departmanın id'sini gönderiyoruz
                        };
                    setTitle("");
                    setDescription("");
                    setPriority("");
                    setDepartment("");
                    fetch("http://localhost:5145/api/request", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newRequest),
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Request created successfully:", data)
                        alert("Talep başarıyla oluşturuldu!");
                    })
                    .catch((error) => {
                        console.error("Error creating request:", error);
                        alert("Talep oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
                    });
                    }}>
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
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))} 
                        </select>
                        <button type="submit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            Talep Oluştur
                        </button>
                    </form>
                </section>
            </div>
        </section>
        )
    }
export default CreateRequest