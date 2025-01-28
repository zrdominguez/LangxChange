import "./LandingPage.css"
import LanguageSlide from './LanguageSlide'


const LANGUAGE_IMAGES = [
  {url:'https://zechariahdbucket.s3.us-east-2.amazonaws.com/english-slide.jpg', lang: "English"},
  {url:'https://zechariahdbucket.s3.us-east-2.amazonaws.com/spanish-slide.jpg', lang:'Spanish'},
  {url:'https://zechariahdbucket.s3.us-east-2.amazonaws.com/japanese-slide.jpg', lang:'Japanese'},
];

function LandingPage(){

  return (
    <div className="landing-page">
      <div className="title-about-us">
        <h1 className="title">About Us</h1>
        <p>We believe language learning shouldn&apos;t stop at textbooks. Our mission is to connect language enthusiasts with engaging and authentic reading material. We curate reviews of novels, short stories, and more, written in various languages, to help you discover captivating literature and expand your language horizons.</p>
      </div>
      <div className="slides-container">

        {LANGUAGE_IMAGES.map((info, index) => <LanguageSlide key={index} slideInfo={info} />)}

      </div>
    </div>
  );
}

export default LandingPage
