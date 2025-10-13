
import { useEffect, useState } from "react";
import image from "../images/كيف-ابدا-مشروع-متجر-الكتروني.png"
import './hero.css';
const Hero = () => {
     const [hero, setHero] = useState('');
    
      useEffect(() => {
        const sentence = " Discover Amazing Deals on Top Products";
        const speed = 150;
        let index = 0;
    
        function displayNextLetter() {
          if (index < sentence.length) {
            const nextChar = sentence.charAt(index);  // SAFELY get character
            setHero(prev => prev + nextChar);
            index++;
            setTimeout(displayNextLetter, speed);
          } else {
            setTimeout(() => {
              setHero('');
              index = 0;
              setTimeout(displayNextLetter, speed);
            }, 1000);
          }
        }
    
        displayNextLetter();
      }, []);
  return (
    <section className=" hero-section d-flex justify-content-around align-items-center flex-column flex-lg-row px-3 px-lg-5" id="hero  ">
      <img alt="Hero" className="hero-image" src={image} />
    <div className="">
        
        <div className="text-center text-lg-start">
          <h2 className="text-primary autotype fw-bold mb-4">
            {hero}
          </h2>
          <p className="mb-2 p-2 rounded shadow-sm">
            Shop the best brands, top categories, and daily deals. Fast delivery & secure checkout.
          </p>
        </div>
    </div>
        <div className="text-center my-2">
            <a className="btn btn-primary hero-btn m-auto btn-lg " href="#shopping">🛍 Shop Now</a>
        </div>
    </section>
  );
};
export default Hero;
