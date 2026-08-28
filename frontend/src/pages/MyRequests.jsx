import '../App.css';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { statusLabels, priorityLabels, formatDate, CurrentUser } from "../labels";


function MyRequests() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // URL'deki sorgu parametrelerini alır
    const view = searchParams.get('view'); // view parametresi var mı varsa değerini alır
    const [requests, setRequests] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState("Tüm Öncelikler");
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        fetch("http://localhost:5145/api/request")
            .then((response) => response.json())
            .then((data) => setRequests(data))
            .catch((error) => console.error("Error fetching requests:", error));
    }, []);

    const myRequests = requests.filter((request) => {
        if (view === 'past') {
            return request.status === 'Completed' && request.requester === CurrentUser;
        } else {
            return request.status !== 'Completed' && request.requester === CurrentUser;
        }
    }); 

    return (
        <section className="my-requests-page">
            <div>
                <section className="header">
                    <h1>{view === 'past' ? 'Geçmiş Taleplerim' : 'Aktif Taleplerim'}</h1>
                    <div className="header-line"></div>
                    <p>{view === 'past' ? 'Geçmiş taleplerinizi görüntüleyebilirsiniz.' : 'Aktif taleplerinizi görüntüleyebilir ve yönetebilirsiniz.'}</p>
                </section>
            
                <div className="search-and-filter">
                    <input
                        className="search-input"
                        id="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Talep Ara..."
                    />
                    <div className="filter-section" id="filter-section">
                        <select className="priority-filter" id="priority-filter" value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
                            <option value="Tüm Öncelikler">Tüm Öncelikler</option>
                            <option value="Low">Düşük</option>
                            <option value="Medium">Orta</option>
                            <option value="High">Yüksek</option>
                        </select>
                    </div>
                </div>

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
                            {myRequests.filter(request => selectedPriority === "Tüm Öncelikler" || request.priority === selectedPriority).filter(request => request.title.toLowerCase().includes(searchTerm.toLowerCase()) || request.assignee.toLowerCase().includes(searchTerm.toLowerCase())).map((request) => (
                                <tr key={request.id} onClick={() => navigate(`/request/${request.id}`)}>
                                    <td>{request.id}</td>
                                    <td>{request.title}</td>
                                    <td>{request.assignee}</td>
                                    <td>{request.description}</td>
                                    <td>{statusLabels[request.status]}</td>
                                    <td>{priorityLabels[request.priority]}</td>
                                    <td>{view === 'past' ? formatDate(request.completedAt) : formatDate(request.createdAt)}</td>
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