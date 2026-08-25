import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { mockRequests } from '../data/mockRequests';

const departmentLabels = {
    it: 'IT',
    hr: 'İK',
    finance: 'Finans',
};

function RequestDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const request = mockRequests.find((request) => request.id === parseInt(id));

    if (!request) {
        return <p>Talep bulunamadı.</p>;
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
                            <select>
                                <option value="Talebi Atayın">Talebi Atayın</option>
                                <option value="a">a</option>
                            </select>
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
                                {request.status}
                            </span>
                        </dd>
                        <dt>Öncelik:</dt>
                        <dd>
                            <span className={`priority-badge priority-${request.priority}`}>
                                {request.priority}
                            </span>
                        </dd>
                        <dt>Oluşturulma Tarihi:</dt>
                        <dd>{request.createdAt}</dd>
                        {request.assignedAt && (
                            <>
                                <dt>İşleme Alınma Tarihi:</dt>
                                <dd>{request.assignedAt}</dd>
                            </>
                        )}
                        {request.completedAt && (
                            <>
                                <dt>İşlem Tamamlanma Tarihi:</dt>
                                <dd>{request.completedAt}</dd>
                            </>
                        )}
                    </dl>
                </section>
            </div>
        </section>
    );
}
export default RequestDetail