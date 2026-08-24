import '../App.css';

function MyRequests() {
    return (
        <section className="my-requests-page">
            <div>
                <section className="header">
                    <h1>Taleplerim</h1>
                    <div className="header-line"></div>
                    <p>Burada oluşturduğunuz talepleri görebilir ve yönetebilirsiniz.</p>
                </section>
                <section className="table-section">
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Talep ID</th>
                                <th>Talep Başlığı</th>
                                <th>Talep Açıklaması</th>
                                <th>Talep Durumu</th>
                                <th>Öncelik</th>
                                <th>Oluşturulma Tarihi</th>
                            </tr>
                        </thead>
                        <tbody className="requests-list" id="requests-list">
                            {/* Talepler daha sonra buraya gelecek */}
                        </tbody>
                    </table>
                </section>
            </div>
        </section>
    );
}

export default MyRequests;