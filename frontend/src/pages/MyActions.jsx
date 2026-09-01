import '../App.css'
import {useSearchParams} from 'react-router-dom'
import  {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import { priorityLabels, formatDate, CurrentUser } from "../labels";

function MyActions() {
const [searchParams] = useSearchParams(); // URL'deki sorgu parametrelerini alır
const view = searchParams.get('view'); // view parametresi var mı varsa değerini alır
const navigate = useNavigate();
const [requests, setRequests] = useState([]);
const [selectedPriority, setSelectedPriority] = useState("Tüm Öncelikler");
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
    fetch("http://localhost:5145/api/request")
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

const myActions = requests.filter((request) => {
    if (view === 'past') {
        return request.status === 'Completed';
    } else {
        return request.status === 'InProgress';
    }
});

const filteredActions = myActions
    .filter((request) => request.assignee === CurrentUser)
    .filter((request) => selectedPriority === "Tüm Öncelikler" || request.priority === selectedPriority)
    .filter((request) => request.title.toLowerCase().includes(searchTerm.toLowerCase()) || request.requester.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <section className="my-actions-page">
            <div>
                <section className="header">
                    <h1>{view === 'past' ? 'Geçmiş İşlemler' : 'Aktif İşlemler'}</h1>
                    <div className="header-line"></div>
                    <p>{view === 'past' ? 'Geçmiş işlemleriniz burada görüntüleyebilirsiniz' : 'Aktif işlemlerinizi burada görüntüleyebilir ve yönetebilirsiniz.'}</p>
                </section>

                <div className="search-and-filter">
                    <div className="search-box">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <input
                            className="search-input"
                            id="search-input"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Talep Ara..."
                        />
                    </div>
                    <div className="filter-section" id="filter-section">
                        <select className="priority-filter" id="priority-filter" value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
                            <option value="Tüm Öncelikler">Tüm Öncelikler</option>
                            <option value="Low">Düşük</option>
                            <option value="Medium">Orta</option>
                            <option value="High">Yüksek</option>
                        </select>
                    </div>
                </div>
            </div>
            <section className="table-section"> 
                <table className="actions-table">
                    <thead>
                        <tr>
                            <th>Talep ID</th>
                            <th>Talep Başlığı</th>
                            <th>Talebi Oluşturan</th>
                            <th>Talep Açıklaması</th>
                            <th>Öncelik</th>
                            <th>Talep Oluşturulma Tarihi</th>
                            <th>{view === 'past' ? 'İşlem Tamamlanma Tarihi' : 'İşleme Alınma Tarihi'}</th>
                        </tr>
                    </thead>
                    <tbody className="actions-list" id="actions-list">
                        {filteredActions.map((request) => (
                            <tr key={request.id} onClick={() => navigate(`/request/${request.id}`)}>
                                <td>{request.id}</td>
                                <td>{request.title}</td>
                                <td>{request.requester}</td>
                                <td>{request.description}</td>
                                <td>
                                  <span className={`priority-badge priority-${request.priority.toLowerCase()}`}>
                                    {priorityLabels[request.priority]}
                                  </span>
                                </td>
                                <td>{formatDate(request.createdAt)}</td>
                                <td>{view === 'past' ? formatDate(request.completedAt) : formatDate(request.assignedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredActions.length === 0 && (
                    <div className="empty-state">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <p>Sonuç bulunamadı.</p>
                    </div>
                )}
            </section>
        </section>
    )
}
export default MyActions
