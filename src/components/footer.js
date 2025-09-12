
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import "./footer.css"
import { faFacebook, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faClock, faCopyright, faLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
function Footer(){
    return(
        <>
        <div className="bg-dark text-white pt-2 pb-3 mt-3">
            <Container className="d-flex gap-5 flex-wrap justify-content-center  ">
                <div className="social-account">
                    <h4>our store's social accounts</h4>
                    <div className="social">
                        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                    </div>
                    
                </div>
                <p className="parag-footer">
                    "Thanks for shopping with us! We're here to bring you the best products, unbeatable deals, and a seamless shopping experience. Follow us on social media and stay connected for the latest offers and updates."
                </p>
                <address >
                    <p>
                        <FontAwesomeIcon className="text-primary me-1" icon={faLocation}/> Egypt, El-Menofia, Menof
                    </p>
                    <p><FontAwesomeIcon className="text-primary me-1" icon={faClock} />business time 24h</p>
                    <p>
                    <span className="d-block"><FontAwesomeIcon className="text-primary me-1" icon={faPhone} />01023966702</span>
                    <span className="d-block"><FontAwesomeIcon className="text-primary me-1" icon={faPhone} />0483627137</span>
                    </p>
                </address>
            </Container>
            <p className="text-center mb-0">Copyright <FontAwesomeIcon icon={faCopyright}/> 2025 <span className="text-info">E-Commerce</span> All rights reserved</p>
        </div>
        </>
    )
}
export default Footer