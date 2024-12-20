import "./LandingPage.css"
import LanguageSlide from './LanguageSlide'
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

const LANGUAGE_IMAGES = {
  0:{
    url:'https://zechariahdbucket.s3.us-east-2.amazonaws.com/english-slide.jpg',
    lang:'English'
  },
  1:{
    url:'https://zechariahdbucket.s3.us-east-2.amazonaws.com/spanish-slide.jpg',
    lang:'Spanish'
  },
  2:{
    url:'https://zechariahdbucket.s3.us-east-2.amazonaws.com/japanese-slide.jpg',
    lang:'Japanese'
  }
};

function LandingPage(){
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(()=>{

  },[])
  return (
    <div className="landing-page">
      <div>
        <h1 className="title">About Us</h1>
      </div>
      <div className="slides-container">
        <FaArrowLeft id="left-arrow" onClick={()=>setCurrentSlide(curr => curr > 0 ? curr-1 : curr)}/>
        <LanguageSlide slideInfo={LANGUAGE_IMAGES[currentSlide]} />
        <FaArrowRight id="right-arrow" onClick={()=>setCurrentSlide(curr => curr <= 1 ? curr+1 : curr)}/>
      </div>
    </div>
  );
}

export default LandingPage
