import {mockRequests} from "../data/mockRequests";

function Home() {
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
                  <th>Talebi Oluşturan</th>
                  <th>Talep Başlığı</th>
                  <th>Talep Açıklaması</th>
                  <th>Talep Durumu</th>
                  <th>Öncelik</th>
                  <th>Oluşturulma Tarihi</th>
                </tr>
              </thead>

              <tbody className="talep-listesi" id="talep-listesi">
                {mockRequests.filter((request) => request.status === "Pending" && request.requester === "Ayşe Kaya").map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.requester}</td>
                    <td>{request.title}</td>
                    <td>{request.description}</td>
                    <td>{request.status}</td>
                    <td>{request.priority}</td>
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
