import React from "react";
import { Link } from "react-router-dom";

import visa from "../assets/iben/visa.webp";
import crypto from "../assets/iben/crypto.webp";
import bancontact from "../assets/iben/bancontact.webp";
import giropay from "../assets/iben/giropay.webp";
import ideal from "../assets/iben/ideal.webp";
import mastercard from "../assets/iben/mastercard.webp";
import skrill from "../assets/iben/skrill.webp";
import usdt from "../assets/iben/usdt.webp";
import neosurf from "../assets/iben/neosurf.webp";
import paysafecard from "../assets/iben/paysafecard.webp";
import paypal from "../assets/iben/paypal.png";

import { useSelector } from "react-redux";

const Footer = () => {
  let { language } = useSelector((state) => state.language);
  return (
    <div className="footer">
      <div className="footer-first">
        <div className="footer-first1">
          <h1>
            {language === "anglais" && "ABOUT US"}
            {language === "francais" && "À PROPOS DE NOUS"}
            {language === "espagnol" && "SOBRE NOSOTROS"}
          </h1>
          {language === "anglais" && (
            <p>
              Ibendouma sells kamas for Dofus, Dofus Retro and Dofus Touch at
              unbeatable prices. Our main goal is fast and cost-effective
              delivery. We will help you guarantee an excellent service 24/7,
              7/7. Purchase kamas and playing dofus or dofus touch will now be
              much easier for you. Your satisfaction is therefore at the heart
              of our mission
            </p>
          )}
          {language === "francais" && (
            <p>
              Ibendouma vend des kamas pour les jeux Dofus, Dofus Retro et Dofus
              Touch à des prix défiant toute concurrence. Notre objectif
              principal est une livraison rapide et à moindre coût. Nous vous
              garantissons un service d'excellence 24h/24, 7j/7. Acheter des
              kamas et jouer à dofus ou à dofus touch sera désormais beaucoup
              plus facile pour vous. Votre satisfaction est donc au coeur de
              notre mission
            </p>
          )}
          {language === "espagnol" && (
            <p>
              Ibendouma vende Kamas para los juegos Dofus, Dofus Retro y Dofus
              Touch a precios competitivos. Nuestro objetivo principal es una
              entrega rápida y económica. Le garanticemos un servicio de
              excelencia 24h/24, 7j/7. Comprar Kamas y jugar Dofus o Dofus touch
              ahora será mucho más fácil para usted. Su satisfacción está en el
              centro de nuestra misión
            </p>
          )}
        </div>
        <div className="secContainer">
          <div className="footer-first2">
            <h1>
              {language === "anglais" && "QUICK LINK"}
              {language === "francais" && "LIEN RAPIDE"}
              {language === "espagnol" && "ENLACE RÀPIDO"}
            </h1>
            <div className="first-link">
              <p>
                <Link
                  to="/dofus/dofus-kamas"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  Dofus kamas
                </Link>
              </p>
              <p>
                <Link
                  to="/dofus/dofus-retro"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  Dofus retro
                </Link>
              </p>

              <p>
                <Link
                  to="/dofus/dofus-touch"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  Dofus touch
                </Link>
              </p>

              <p>
                <Link
                  to="/profil"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  {language === "anglais" && "My orders"}
                  {language === "francais" && "Mes commandes"}
                  {language === "espagnol" && "Mis pedidos"}
                </Link>
              </p>
            </div>
          </div>
          <div className="footer-first3">
            <h1>INFORMATION</h1>
            <div className="third-link">
              <p>
                <Link
                  to="/faqs"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  FAQ
                </Link>
              </p>
              <p>
                <Link
                  to="/privacy-policy"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  {language === "anglais" && "Privacy policy"}
                  {language === "francais" && "Politique de confidentialité"}
                  {language === "espagnol" && "Política de privacidad"}
                </Link>
              </p>

              <p>
                <Link
                  to="/term-and-conditions"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  {language === "anglais" && "Terms & Conditions"}
                  {language === "francais" && "Termes & Conditions"}
                  {language === "espagnol" && "Términos y Condiciones"}
                </Link>
              </p>

              <p>
                <Link
                  to="/contact"
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    fontSize: "15px",
                  }}
                >
                  {language === "anglais" && "Contact us"}
                  {language === "francais" && "Nous contacter"}
                  {language === "espagnol" && "Contactarnos"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-sec">
        <div className="copy">
          {" "}
          <p className="copyright">
            {language === "anglais" &&
              `Copyright © 2019 - ${new Date().getFullYear()}, iBendouma.com. All rights reserved to iBendouma Limited`}
            {language === "espagnol" &&
              `Copyright © 2019 - ${new Date().getFullYear()}, iBendouma.com. Todos los derechos están reservados a iBendouma Limited`}
            {language === "francais" &&
              `Copyright © 2019 - ${new Date().getFullYear()}, iBendouma.com. Tous droits réservés à iBendouma Limited`}
          </p>
        </div>
        <Link to="/secure-payment">
          <div className="img-pay">
            <img src={visa} alt="visa" />
            <img src={mastercard} alt="mastercard" />
            <img src={paysafecard} alt="paysafecard" />
            <img src={bancontact} alt="bancontact" />
            <img src={crypto} alt="crypto" />
            <img src={usdt} alt="usdt" />
            <img src={skrill} alt="skrill" />
            <img src={ideal} alt="ideal" />
            <img src={paypal} alt="paypal" />
            <img src={neosurf} alt="neosurf" />
            <img src={giropay} alt="giropay" />
          </div>
        </Link>
      </div>
      {/* <div className="footer-second">
        <p className="copyright">
          {language === "anglais" &&
            `Copyright © 2019 - ${new Date().getFullYear()}, iBendouma.com. All rights are reserved to iBendouma Limited.`}
          {language === "espagnol" &&
            `Copyright © 2019 - ${new Date().getFullYear()}, iBendouma.com. Todos los derechos están reservados a iBendouma Limited.`}
          {language === "francais" &&
            `Copyright © 2019 - ${new Date().getFullYear()}, iBendouma.com. Tous les droits sont réservés à iBendouma Limited.`}
        </p>
        <div className="footerConditions">
          <span>
            <Link to="/privacy-policy" className="termsandconditiontoffoter">
              {language === "anglais" && "Privacy policy"}
              {language === "espagnol" && "Política de confidencialidad"}
              {language === "francais" && "Politique de confidentialité"}{" "}
            </Link>
          </span>
          <span>
            <Link
              to="/term-and-conditions"
              className="termsandconditiontoffoter"
            >
              {language === "anglais" && "Terms and conditions"}
              {language === "espagnol" && "Términos y Condiciones"}
              {language === "francais" && "Termes et conditions"}
            </Link>
          </span>
          <span>
            <Link to="/contact" className="termsandconditiontoffoter">
              {language === "anglais" && "Contact us"}
              {language === "espagnol" && "Contáctenos"}
              {language === "francais" && "Contactez-nous"}
            </Link>
          </span>
        </div> */}
    </div>
  );
};

export default Footer;
