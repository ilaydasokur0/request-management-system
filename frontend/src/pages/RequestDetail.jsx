import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { statusLabels, priorityLabels } from "../labels";
import { departmentLabels, formatDate, CurrentUser } from "../labels";

function RequestDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);   
    const [departmentEmployees, setDepartmentEmployees] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5145/api/request/${id}`)
            .then((response) => response.json())
            .then((data) => setRequest(data))
            .catch((error) => console.error("Error fetching request details:", error));
    }, [id]);

    const departmentId = request?.department?.id;

    useEffect(() => {
        if (!departmentId) return;
        fetch(`http://localhost:5145/api/employee/${departmentId}`)
            .then((response) => response.json())
            .then((data) => setDepartmentEmployees(data))
            .catch((error) => console.error("Error fetching department employee:", error));
    }
, [request?.department?.id]);

    useEffect(() => {
            fetch(`http://localhost:5145/api/comment/${id}`)
                .then((response) => response.json())
                .then((data) => setComments(data))
                .catch((error) => console.error("Error fetching comments:", error));
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
                    <div className="request-detail">
                        <div className="request-detail-container">
                            <button className="back-button" onClick={() => navigate(-1)}>
                                ◀ Geri Dön
                            </button>
                            {request.status == "Pending" && request.requester !==   CurrentUser && (
                                <select
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedEmployee = departmentEmployees.find((employee) => employee.id === parseInt(selectedId));

                                        fetch(`http://localhost:5145/api/request/${id}/assign`, {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                assignee: selectedEmployee?.name
                                            })
                                        })
                                            .then(() => fetch(`http://localhost:5145/api/request/${id}`))
                                            .then((response) => response.json())
                                            .then((data) => setRequest(data)); // talep detayları anlık olarak güncelleniyor
                                    }}
                                >
                                    <option value="Talebi Atayın">Talebi Atayın</option>
                                    {departmentEmployees.filter((employee) => employee.name !== request.requester).map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {request.status == "InProgress" && request.assignee ===   CurrentUser && (
                                <button value="Talebi Tamamla" className="complete-button"
                                    onClick={(e)=> {
                                        fetch(`http://localhost:5145/api/request/${id}/complete`, {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                            })
                                        })
                                            .then(() => fetch(`http://localhost:5145/api/request/${id}`))
                                            .then((response) => response.json())
                                            .then((data) => setRequest(data)); // talep detayları anlık olarak güncelleniyor
                                    }}
                                >
                                    Talebi Tamamla
                                </button>
                            )}
                        </div>

                        <section className="request-detail-info">
                            <div className="request-detail-info-item">
                                <h1>{request.title}</h1>
                                <p><strong>Talep Açıklaması:</strong> {request.description}</p>
                            </div>
                        </section>

                        <div className="request-detail-meta">
                            <div className="request-detail-meta-item">
                                <span className="meta-label">Talebi Oluşturan</span>
                                <span className="meta-value">{request.requester}</span>
                            </div>
                            <div className="request-detail-meta-item">
                                <span className="meta-label">Atanan Kişi</span>
                                <span className="meta-value">{request.assignee || "—"}</span>
                            </div>
                            <div className="request-detail-meta-item">
                                <span className="meta-label">Departman</span>
                                <span className="meta-value">{departmentLabels[request.department.name.toLowerCase()] || request.department.name}</span>
                            </div>
                            <div className="request-detail-meta-item">
                                <span className="meta-label">Talep Durumu</span>
                                <span className="meta-value">
                                    <span className={`status-badge status-${request.status.toLowerCase()}`}>
                                        {statusLabels[request.status] || request.status}
                                    </span>
                                </span>
                            </div>
                            <div className="request-detail-meta-item">
                                <span className="meta-label">Öncelik</span>
                                <span className="meta-value">
                                    <span className={`priority-badge priority-${request.priority.toLowerCase()}`}>
                                        {priorityLabels[request.priority] || request.priority}
                                    </span>
                                </span>
                            </div>
                            <div className="request-detail-meta-item">
                                <span className="meta-label">Oluşturulma Tarihi</span>
                                <span className="meta-value">{formatDate(request.createdAt)}</span>
                            </div>
                            {request.assignedAt && (
                                <div className="request-detail-meta-item">
                                    <span className="meta-label">İşleme Alınma Tarihi</span>
                                    <span className="meta-value">{formatDate(request.assignedAt)}</span>
                                </div>
                            )}
                            {request.completedAt && (
                                <div className="request-detail-meta-item">
                                    <span className="meta-label">İşlem Tamamlanma Tarihi</span>
                                    <span className="meta-value">{formatDate(request.completedAt)}</span>
                                </div>
                            )}
                        </div>
                        <section className="comments-section">
                            <h2>Yorumlar</h2>
                            <div className="request-detail-comments">
                                {comments.length === 0 ? (
                                    <p className="no-comments">Henüz yorum yok.</p>
                                ) : (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="comment">
                                            <div className="comment-header">
                                                <span className="comment-author">{comment.author}</span>
                                                <span className="comment-date">{formatDate(comment.createdAt)}</span>
                                            </div>
                                            <div className="comment-message">{comment.message}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </section>
    );
}
export default RequestDetail