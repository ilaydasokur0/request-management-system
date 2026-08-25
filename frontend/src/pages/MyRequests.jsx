import '../App.css';
import { useSearchParams } from 'react-router-dom';

function MyRequests() {
    const [searchParams] = useSearchParams(); // URL'deki sorgu parametrelerini alır
    const view = searchParams.get('view'); // view parametresi var mı varsa değerini alır
    return (
        <section className="my-requests-page">
            <div>
                <section className="header">
                    <h1>{view === 'past' ? 'Geçmiş Taleplerim' : 'Aktif Taleplerim'}</h1>
                    <div className="header-line"></div>
                    <p>{view === 'past' ? 'Geçmiş taleplerinizi görüntüleyebilirsiniz.' : 'Aktif taleplerinizi görüntüleyebilir ve yönetebilirsiniz.'}</p>
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
                                <th>{view === 'past' ? 'İşlem Tamamlanma Tarihi' : 'Oluşturulma Tarihi'}</th>
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