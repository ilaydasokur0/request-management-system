import '../App.css';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MyRequests() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // URL'deki sorgu parametrelerini alır
    const view = searchParams.get('view'); // view parametresi var mı varsa değerini alır

    // Şimdilik "ben" olarak Ilayda Sokur'u sabit kabul ediyoruz; gerçek kullanıcı girişi eklenince değişecek.
    const myRequests = mockRequests
        .filter((request) => request.requester === 'Ilayda Sokur')
        .filter((request) => (view === 'past' ? request.status === 'Completed' : request.status !== 'Completed'));

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
                                <th>Talep Atanan</th>
                                <th>Talep Açıklaması</th>
                                <th>Talep Durumu</th>
                                <th>Öncelik</th>
                                <th>{view === 'past' ? 'İşlem Tamamlanma Tarihi' : 'Oluşturulma Tarihi'}</th>
                            </tr>
                        </thead>
                        <tbody className="requests-list" id="requests-list">
                            {myRequests.map((request) => (
                                <tr key={request.id} onClick={() => navigate(`/request/${request.id}`)}>
                                    <td>{request.id}</td>
                                    <td>{request.title}</td>
                                    <td>{request.assignee}</td>
                                    <td>{request.description}</td>
                                    <td>{request.status}</td>
                                    <td>{request.priority}</td>
                                    <td>{view === 'past' ? request.completedAt : request.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </section>
    );
}

export default MyRequests;