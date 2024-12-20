
function LanguageSlide({slideInfo}){
  return (
    <div className="img-slide-container">
      <h2 id="slide-title" style={{color:"white"}}>{slideInfo.lang}</h2>
      <img src={`${slideInfo.url}`} />
    </div>
  )
}

export default LanguageSlide
