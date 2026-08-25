import '../App.css';
import { useParams } from 'react-router-dom';
import { mockRequests } from '../data/mockRequests';

function RequestDetail() {
    const { id } = useParams();
    const request = mockRequests.find((request) => request.id === parseInt(id));
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
                        <dt>Talep Başlığı:</dt>
                        <dd>{request.title}</dd>
                        <dt>Talep Açıklaması:</dt>
                        <dd>{request.description}</dd>
                        <dt>Talep Durumu:</dt>
                        <dd>{request.status}</dd>
                        <dt>Öncelik:</dt>
                        <dd>{request.priority}</dd>
                        <dt>Oluşturulma Tarihi:</dt>
                        <dd>{request.createdAt}</dd>
                    </dl>
                </section>
            </div>
        </section>
    );
}
export default RequestDetail