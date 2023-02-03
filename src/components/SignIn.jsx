import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FiSquare } from "react-icons/fi";

import { addUser } from "../features/userSlice";

import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkRemember, setCheckRember] = useState(false);

  const notifyEmailError = () => toast.error("Email inconnu");

  const notifyEmailErrorEnglish = () => toast.error("Email unknown");

  const notifyPasswordError = () =>
    toast.error("Le mot de passe doit avoir 6 caracteres minimum");

  const notifyPasswordErrorEnglish = () =>
    toast.error("Password must have a minimum of 6 characters");

  const emailErrorBackend = (text) => toast.error(text);

  const emailErrorBackendEnglish = () =>
    toast.error("Incorrect email or password");

  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.language);

  const location = useLocation();
  const handleToggleCheckRemember = () => {
    setCheckRember((prevCheckRemember) => !prevCheckRemember);
  };
  const handleSubmit = () => {
    if (!email || !password) {
      if (!email) {
        language === "anglais" ? notifyEmailErrorEnglish() : notifyEmailError();
      }
      if (!password) {
        language === "anglais"
          ? notifyPasswordErrorEnglish()
          : notifyPasswordError();
      }
    } else {
      try {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_CLIENT_URL}/users/login`,
          data: {
            email,
            password,
          },
          withCredentials: true,
        }).then((res) => {
          if (res.data.message) {
            language === "anglais"
              ? emailErrorBackendEnglish()
              : emailErrorBackend(res.data.message);
          } else {
            // console.log(res.data);
            dispatch(addUser(res.data));
            if (location.pathname === "/login") {
              window.location = "/";
            } else {
              console.log("nothing");
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="signin">
      <h1 className="signin-title">
        {language === "anglais" && "Welcome to iBendouma"}
        {language === "francais" && "Bienvenu sur iBendouma"}
        {language === "espagnol" && "Bienvenido a iBendouma"}
      </h1>
      <div className="signin-form">
        <div className="signin-form-inputfield">
          <input
            type="text"
            value={email}
            placeholder={
              language === "anglais" ? "Email address" : "Adresse e-mail"
            }
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <div className="signup-errors"></div> */}
          <input
            type="password"
            value={password}
            placeholder={language === "anglais" ? "Password" : "Mot de passe"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <div className="signup-errors">
            
          </div> */}
        </div>

        <div className="signin-remember">
          <div
            className="signin-remember-square"
            onClick={handleToggleCheckRemember}
          >
            {checkRemember ? (
              <span className="icon-checked">
                <BsCheckSquareFill />
              </span>
            ) : (
              <span className="icon">
                <FiSquare />
              </span>
            )}
            <span className="remember">
              {language === "anglais" && "Remember me"}
              {language === "francais" && "Se souvenir de moi"}
              {language === "espagnol" && "Recordarme"}
            </span>
          </div>
          <span className="signin-remember-forget">
            {" "}
            <Link
              to="/resetpassword"
              style={{
                color: "#ccc",
              }}
            >
              {language === "anglais" && "Forgot your password"}
              {language === "francais" && "Mot de passe oublié"}
              {language === "espagnol" && "Contraseña olvidada"}?
            </Link>
          </span>
        </div>
        <div className="sign-loginbutton">
          <span className="login-btn" onClick={handleSubmit}>
            {language === "anglais" && "Sign In"}
            {language === "francais" && "Se connecter"}
            {language === "espagnol" && "Conectar"}
          </span>
          <span className="signin-btn">
            <Link
              to="/register"
              style={{
                color: "#ccc",
              }}
            >
              {language === "anglais" && "Sign Up"}
              {language === "francais" && "S'inscrire"}
              {language === "espagnol" && "Registrar"}
            </Link>
          </span>
        </div>
      </div>

      <div className="signin-copyright">
        Copyright &copy; 2019 - {new Date().getFullYear()},{" "}
        {language === "francais" &&
          "Tous les droits sont réservés à iBendouma Limited."}
        {language === "anglais" &&
          "All rights are reserved to iBendouma Limited."}
        {language === "espagnol" &&
          "Todos los derechos están reservados a iBendouma Limited."}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    // <div
    //   className={
    //     location.pathname === "/paymentpage"
    //       ? "form-sign-payment"
    //       : "form-signin"
    //   }
    // >
    //   <form
    //     onSubmit={handleSubmit}
    //     className={
    //       location.pathname === "/paymentpage" ? "signin-payment" : "signin"
    //     }
    //   >
    //     <div className="input-signup">
    //       {location.pathname === "/paymentpage" || (
    //         <h4
    //           style={{
    //             color: "gray",
    //             fontWeight: 400,
    //             marginTop: "10px",
    //             fontSize: "14px",
    //           }}
    //         >
    //           {language === "francais" && "Vous n'avez pas de compte?"}
    //           {language === "anglais" && "You do not have an account?"}
    //           {language === "espagnol" && "No tienes una cuenta?"}{" "}
    //           <Link
    //             to="/register"
    //             style={{
    //               color: "#1652f0",
    //             }}
    //           >
    //             {" "}
    //             {language === "francais" && "Inscrivez vous"}
    //             {language === "anglais" && "Register"}
    //             {language === "espagnol" && "Registro"}
    //           </Link>
    //         </h4>
    //       )}

    //       <div className="mail">
    //         {language === "francais" && <label htmlFor="email">Email</label>}
    //         {language === "anglais" && <label htmlFor="email">E-mail</label>}
    //         {language === "espagnol" && (
    //           <label htmlFor="email">Correo electrónico</label>
    //         )}
    //         <input
    //           type="email"
    //           name="email"
    //           id="email"
    //           placeholder="Adresse e-mail"
    //           required
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <div ref={emailError} className="signup-errors"></div>
    //       </div>
    //       <div className="pass">
    //         {language === "francais" && (
    //           <label htmlFor="email">Mot de passe</label>
    //         )}
    //         {language === "anglais" && <label htmlFor="email">Password</label>}
    //         {language === "espagnol" && <label htmlFor="email">Clave</label>}
    //         <input
    //           type="password"
    //           name="password"
    //           id="password"
    //           required
    //           placeholder="Mot de passe"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <div ref={passwordError} className="signup-errors"></div>
    //       </div>
    //     </div>
    //     <div
    //       className="agree"
    //       style={{
    //         display: "flex",
    //         alignSelf: "center",
    //         position: "relative",
    //       }}
    //     >
    //       <input
    //         type="checkbox"
    //         style={{
    //           position: "absolute",
    //           top: "4%",
    //           cursor: "pointer",
    //           outline: "none",
    //         }}
    //         id="signinCheck"
    //       />
    //       {language === "anglais" && (
    //         <span
    //           style={{
    //             fontSize: "12px",
    //             marginLeft: "20px",
    //             // width: "300px",
    //             display: "flex",
    //             flexWrap: "wrap",
    //             lineHeight: "18px",
    //           }}
    //         >
    //           I accept the
    //           <Link
    //             to="/term-and-conditions"
    //             style={{
    //               marginLeft: "2px",
    //               marginRight: "2px",
    //               color: "#1652f0",
    //             }}
    //           >
    //             {" "}
    //             terms and conditions{" "}
    //           </Link>{" "}
    //           and the
    //           <Link
    //             to="/privacy-policy"
    //             style={{
    //               marginLeft: "2px",
    //               color: "#1652f0",
    //             }}
    //           >
    //             {" "}
    //             privacy policy
    //           </Link>
    //         </span>
    //       )}

    //       {language === "francais" && (
    //         <span
    //           style={{
    //             fontSize: "12px",
    //             marginLeft: "15px",
    //             // maxWidth: "300px",
    //             display: "flex",
    //             flexWrap: "wrap",
    //             lineHeight: "18px",
    //           }}
    //         >
    //           J'accepte les
    //           <Link
    //             to="/term-and-conditions"
    //             style={{
    //               marginLeft: "2px",
    //               marginRight: "2px",
    //               color: "#1652f0",
    //             }}
    //           >
    //             {" "}
    //             termes et conditions{" "}
    //           </Link>{" "}
    //           et la
    //           <Link
    //             to="/privacy-policy"
    //             style={{
    //               marginLeft: "2px",
    //               color: "#1652f0",
    //             }}
    //           >
    //             {" "}
    //             politique de confidentialité
    //           </Link>
    //         </span>
    //       )}

    //       {language === "espagnol" && (
    //         <span
    //           style={{
    //             fontSize: "12px",
    //             marginLeft: "15px",
    //             // maxWidth: "300px",
    //             display: "flex",
    //             flexWrap: "wrap",
    //             lineHeight: "18px",
    //           }}
    //         >
    //           Acepto los
    //           <Link
    //             to="/term-and-conditions"
    //             style={{
    //               marginLeft: "2px",
    //               marginRight: "2px",
    //               color: "#1652f0",
    //             }}
    //           >
    //             {" "}
    //             términos y condiciones{" "}
    //           </Link>
    //           y la
    //           <Link
    //             to="/privacy-policy"
    //             style={{
    //               marginLeft: "2px",
    //               color: "#1652f0",
    //             }}
    //           >
    //             {" "}
    //             política de privacidad
    //           </Link>
    //         </span>
    //       )}
    //     </div>
    //     <div ref={checkError} className="signup-errors"></div>
    //     <input type="submit" className="btn-signin" value="Se connecter" />
    //     <Link to="/resetpassword">
    //       <span
    //         style={{
    //           color: "#1652f0",
    //           fontSize: "13px",
    //         }}
    //       >
    //         {language === "anglais" && "Forgot Password ?"}
    //         {language === "francais" && "Mot de passe oublié"}
    //         {language === "espagnol" && "contraseña olvidada"}
    //       </span>
    //     </Link>
    //   </form>
    //   {location.pathname === "/paymentpage" || (
    //     <div
    //       style={{
    //         color: "rgba(244, 244, 244, 0.9)",
    //         fontSize: "13px",
    //         width: "300px",
    //         marginTop: "4rem",
    //       }}
    //     >
    //       Copyright &copy; 2019 - {new Date().getFullYear()},{" "}
    //       {language === "francais" &&
    //         "Tous les droits sont réservés à iBendouma Limited."}
    //       {language === "anglais" &&
    //         "All rights are reserved to iBendouma Limited."}
    //       {language === "espagnol" &&
    //         "Todos los derechos están reservados a iBendouma Limited."}
    //     </div>
    //   )}
    // </div>
  );
};

export default SignIn;
