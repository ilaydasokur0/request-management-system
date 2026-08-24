import '../App.css'

function MyActions() {
    return (
        <section className="my-actions-page">
            <div>
                <section className="header">
                    <h1>İşlemdeki Talepler</h1>
                    <div className="header-line"></div>
                    <p>İşleme aldığınız talepleri görüntüleyebilir ve yönetebilirsiniz.</p>
                </section>
        <section className="table-section"> 
            <table className="actions-table">
                <thead>
                    <tr>
                        <th>Talep ID</th>
                        <th>Talep Başlığı</th>
                        <th>Talep Açıklaması</th>
                        <th>Talep Durumu</th>
                        <th>Öncelik</th>
                        <th>Oluşturulma Tarihi</th>
                        <th>İşleme Alınma Tarihi</th>
                    </tr>
                </thead>
                <tbody className="actions-list" id="actions-list">
                    {/* İşlemler daha sonra buraya gelecek */}
                </tbody>
            </table>
        </section>
            </div>
        </section>
    )
}
export default MyActions
