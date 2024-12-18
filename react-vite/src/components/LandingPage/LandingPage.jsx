import "./LandingPage.css"
import {LanguageSlide} from './LanguageSlide'
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";

const LANGUAGE_IMAGES = [
  'https://zechariahdbucket.s3.us-east-2.amazonaws.com/english-slide.jpg',
  'https://zechariahdbucket.s3.us-east-2.amazonaws.com/spanish-slide.jpg',
  'https://zechariahdbucket.s3.us-east-2.amazonaws.com/japanese-slide.jpg']

function LandingPage(){
  const [currentSlide, setCurrentSlide] = useState(0)
  return (
    <div className="landing-page">
      <FaArrowLeft />
      <LanguageSlide imgUrl={LANGUAGE_IMAGES[currentSlide]} />
      <FaArrowRight/>
    </div>
  );
}

export default LandingPage
