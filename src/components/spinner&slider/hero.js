
import { useEffect, useState } from "react";
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
    <section className="hero-section pb-3">
      <div className="row container align-items-center">
        <div className="col-lg-6 text-center mt-5 mt-lg-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            
            alt="E-commerce shopping"
            className="hero-image"
          />
        </div>
        {/* Text Content */}
        <div className="col-lg-6 text-center text-lg-start px-4">
          <h2 className="text-primary autotype fw-bold mb-3">
            {hero}
          </h2>
          <p className="mb-4">
            Shop the best brands, top categories, and daily deals. Fast delivery & secure checkout.
          </p>
        </div>
      </div>
        <div className="text-center mt-4">
            <a className="btn btn-primary m-auto btn-lg me-3" href="#shopping">🛍 Shop Now</a>
        </div>
    </section>
  );
};
export default Hero;
