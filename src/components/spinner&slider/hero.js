
import { useEffect, useState } from "react";
import image from "../images/bg-hero.png"
import './hero.css';
const Hero = () => {
     const [hero, setHero] = useState('');
    
      useEffect(() => {
        const sentence = " Discover Amazing Deals on Top Products";
        const speed = 150;
        let index = 0;
    
        function displayNextLetter() {
          if (index < sentence.length) {
            const nextChar = sentence.charAt(index);
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
    <section className=" hero-section d-flex justify-content-around align-items-center flex-column px-3 " id="hero  ">
      <span className="overlay"></span>
    <div className="d-flex">
        <div className="text-center text-lg-start">
          <h2 className="text-white autotype fw-bold mb-4">
            {hero}
          </h2>
          <p className="mb-2 p-2 rounded text-white shadow-sm">
            Shop the best brands, top categories, and daily deals. Fast delivery & secure checkout.
          </p>
        </div>
        <div className="d-flex">
          <div className="discount">
            discount 50%
          </div>
          <div className="hero-image-div">
          <img className="hero-image" src={image} alt="image" />
          </div>
        </div>
    </div>
        <div className="text-center mb-2">
            <a className="btn btn-primary m-auto btn-lg " href="#shopping">🛍 Shop Now</a>
        </div>
    </section>
  );
};
export default Hero;
