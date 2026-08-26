import '../App.css';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function MyRequests() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // URL'deki sorgu parametrelerini alır
    const view = searchParams.get('view'); // view parametresi var mı varsa değerini alır
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5145/api/request")
            .then((response) => response.json())
            .then((data) => setRequests(data))
            .catch((error) => console.error("Error fetching requests:", error));
    }, []);

    const myRequests = requests.filter((request) => {
        if (view === 'past') {
            return request.status === 'Completed' && request.requester === 'Ilayda Sokur';
        } else {
            return request.status !== 'Completed' && request.requester === 'Ilayda Sokur';
        }
    }); // Şimdilik "ben" olarak Ilayda Sokur'u sabit kabul ediyoruz; gerçek kullanıcı girişi eklenince değişecek.


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