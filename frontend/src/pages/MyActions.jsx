import '../App.css'
import {useSearchParams} from 'react-router-dom'

function MyActions() {
const [searchParams] = useSearchParams(); // URL'deki sorgu parametrelerini alır
const view = searchParams.get('view'); // view parametresi var mı varsa değerini alır
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
                        <th>Talep Açıklaması</th>
                        <th>Öncelik</th>
                        <th>Talep Oluşturulma Tarihi</th>
                        <th>{view === 'past' ? 'İşlem Tamamlanma Tarihi' : 'İşleme Alınma Tarihi'}</th>
                    </tr>
                </thead>
                <tbody className="actions-list" id="actions-list">
                    {/* İşlemler daha sonra buraya gelecek */}
                </tbody>
            </table>
        </section>
            </div>
        </section>
    )
}
export default MyActions
