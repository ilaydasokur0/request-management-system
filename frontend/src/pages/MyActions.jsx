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
        <section className="actions-section"> 
            <table>
                <thead>
                    <tr>
                        <th>İşlem ID</th>
                        <th>İşlem Türü</th>
                        <th>İşlem Açıklaması</th>
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
