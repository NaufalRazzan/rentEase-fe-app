import '../../styles/style.css'

export const Category = () => {
    return (
        <div className="section">
          <div className="container">
            <h3>MAU SEWA APA HARI INI?</h3>
            <div className="box">
              {['Motor1', 'Moge', 'Mobil', 'Supercar', 'Sepeda'].map((item, index) => (
                <div className="col-5" key={index}>
                  <img src={`/assets/${item}.png`} width="50px" alt={`${item}`} />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
}