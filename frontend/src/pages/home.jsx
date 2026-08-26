import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { statusLabels, priorityLabels } from "../labels";

function Home() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5145/api/request")
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);
  
  return (
    <>
      <section className="main-page">
            <div>
              <section className="header">
                <h1>Bekleyen Talepler</h1>
                <div className="header-line" id="header-line"></div>
                <p>Ekibinize ait bekleyen talepleri görüntüleyebilir ve yönetebilirsiniz.</p>
              </section>
              
              <div className="search-and-filter">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Talep Ara..."
                />

                <div className="filter-section" id="filter-section">
                  <select className="priority-filter" id="priority-filter">
                    <option>Tüm Öncelikler</option>
                    <option>Düşük</option>
                    <option>Orta</option>
                    <option>Yüksek</option>
                  </select>
                </div>
              </div>
            </div>
      </section>

      <section className="table-section">
            <table>
              <thead>
                <tr>
                  <th>Talep ID</th>
                  <th>Talep Başlığı</th>
                  <th>Talebi Oluşturan</th>
                  <th>Talep Açıklaması</th>
                  <th>Talep Durumu</th>
                  <th>Öncelik</th>
                  <th>Oluşturulma Tarihi</th>
                </tr>
              </thead>

              <tbody className="talep-listesi" id="talep-listesi">
                {requests.filter((request) => request.status === "Pending").map((request) => (
                  <tr key={request.id} onClick={() => navigate(`/request/${request.id}`)}>
                    <td>{request.id}</td>
                    <td>{request.title}</td>
                    <td>{request.requester}</td>
                    <td>{request.description}</td>
                    <td>{statusLabels[request.status]}</td>
                    <td>{priorityLabels[request.priority]}</td>
                    <td>{request.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      </section>
    </>
  )
}

export default Home
