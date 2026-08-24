import '../App.css'

function CreateRequest() {
    return (
        <section className="create-request-page">
            <div>
                <section className="header">
                    <h1>Yeni Talep Oluştur</h1>
                    <div className="header-line"></div>
                    <p>Aşağıdaki formu doldurarak yeni bir talep oluşturabilirsiniz.</p>
                </section>

                <section className="form-section">
                    <form className="request-form">
                        <label htmlFor="title">Talep Başlığı:</label>
                        <input type="text" id="title" name="title" required />
                        <label htmlFor="description">Talep Açıklaması:</label>
                        <textarea id="description" name="description" required></textarea>
                        <label htmlFor="priority">Talep Önceliği:</label> 
                        <select name="priority" id="priority" required>
                            <option value="">Öncelik Seçin</option>
                            <option value="low">Düşük</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksek</option>
                        </select>
                        <button type="submit">Talep Oluştur</button>
                    </form>
                </section>
            </div>
        </section>
        )
    }
export default CreateRequest