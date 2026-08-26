import '../App.css'
import {useSearchParams} from 'react-router-dom'
import  {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import { priorityLabels } from "../labels";

function MyActions() {
const [searchParams] = useSearchParams(); // URL'deki sorgu parametrelerini alır
const view = searchParams.get('view'); // view parametresi var mı varsa değerini alır
const navigate = useNavigate();
const [requests, setRequests] = useState([]);

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

    return (
        <section className="my-actions-page">
            <div>
                <section className="header">
                    <h1>{view === 'past' ? 'Geçmiş İşlemler' : 'Aktif İşlemler'}</h1>
                    <div className="header-line"></div>
                    <p>{view === 'past' ? 'Geçmiş işlemleriniz burada görüntüleyebilirsiniz' : 'Aktif işlemlerinizi burada görüntüleyebilir ve yönetebilirsiniz.'}</p>
                </section>
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
                    {myActions.map((request) => (
                        <tr key={request.id} onClick={() => navigate(`/request/${request.id}`)}>
                            <td>{request.id}</td>
                            <td>{request.title}</td>
                            <td>{request.requester}</td>
                            <td>{request.description}</td>
                            <td>{priorityLabels[request.priority]}</td>
                            <td>{request.createdAt}</td>
                            <td>{view === 'past' ? request.completedAt : request.assignedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
            </div>
        </section>
    )
}
export default MyActions
