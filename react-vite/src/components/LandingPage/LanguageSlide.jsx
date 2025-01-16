import { useNavigate } from "react-router-dom"

const LANGUAGES = {"English": "eng", "Spanish": "sp", "Japanese":"jp"}

function LanguageSlide({slideInfo}){
  const navigate = useNavigate()
  return (
    <div className="slides">
      <h2 id="slide-title" style={{color:"white"}}>{slideInfo.lang}</h2>
      <div className="img-slide-container">
        <img onClick={() => navigate(`/books/${LANGUAGES[slideInfo.lang]}`)} src={`${slideInfo.url}`} />
      </div>
    </div>
  )
}

export default LanguageSlide
