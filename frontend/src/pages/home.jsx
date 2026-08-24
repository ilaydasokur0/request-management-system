function Home() {
  return (
    <>
      <section className="main-page">
            <div>
              <section className="header">
                <h1>Bekleyen Talepler</h1>
                <div className="header-line" id="header-line"></div>
                <p>Ekibinize ait bekleyen talepleri görüntüleyin ve yönetin.</p>
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
                {/* Talepler daha sonra buraya gelecek */}
              </tbody>
            </table>
      </section>
    </>
  )
}

export default Home
