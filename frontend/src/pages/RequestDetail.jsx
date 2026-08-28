import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { statusLabels, priorityLabels } from "../labels";
import { departmentLabels, formatDate, CurrentUser } from "../labels";

function RequestDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);   

    useEffect(() => {
        fetch(`http://localhost:5145/api/request/${id}`)
            .then((response) => response.json())
            .then((data) => setRequest(data))
            .catch((error) => console.error("Error fetching request details:", error));
    }, [id]);

    if (!request) {
        return <div>Loading...</div>;
    }

    return (
        <section className="request-detail-page">
            <div>
                
                <section className="header">
                    <h1>Talep Detayı</h1>
                    <div className="header-line"></div>
                    <p>Talep detaylarını burada görüntüleyebilirsiniz.</p>
                </section>
                <section className="request-detail-section">
                    <dl className="request-detail">
                        <div className="request-detail-container">
                            <button className="back-button" onClick={() => navigate(-1)}>
                                ◀ Geri Dön
                            </button>
                            {request.status == "Pending" && request.requester !==   CurrentUser && (
                                <select>
                                    <option value="Talebi Atayın">Talebi Atayın</option>
                                    <option value="a">a</option>
                                </select>
                            )}
                        </div>

                        <dt>Talep Başlığı:</dt>
                        <dd>{request.title}</dd>
                        <dt>Talebi Oluşturan:</dt>
                        <dd>{request.requester}</dd>
                        <dt>Atanan Kişi:</dt>
                        <dd>{request.assignee}</dd>
                        <dt>Departman:</dt>
                        <dd>{departmentLabels[request.department] || request.department}</dd>
                        <dt>Talep Açıklaması:</dt>
                        <dd>{request.description}</dd>
                        <dt>Talep Durumu:</dt>
                        <dd>
                            <span className={`status-badge status-${request.status.toLowerCase()}`}>
                                {statusLabels[request.status] || request.status}
                            </span>
                        </dd>
                        <dt>Öncelik:</dt>
                        <dd>
                            <span className={`priority-badge priority-${request.priority.toLowerCase()}`}>
                                {priorityLabels[request.priority] || request.priority}
                            </span>
                        </dd>
                        <dt>Oluşturulma Tarihi:</dt>
                        <dd>{formatDate(request.createdAt)}</dd>
                        {request.assignedAt && (
                            <>
                                <dt>İşleme Alınma Tarihi:</dt>
                                <dd>{formatDate(request.assignedAt)}</dd>
                            </>
                        )}
                        {request.completedAt && (
                            <>
                                <dt>İşlem Tamamlanma Tarihi:</dt>
                                <dd>{formatDate(request.completedAt)}</dd>
                            </>
                        )}
                    </dl>
                </section>
            </div>
        </section>
    );
}
export default RequestDetail