import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

// import Loader from "../components/Loader";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  changeQuantity,
  addCharacterByPaymentpage,
} from "../features/productInfoSlice";

import image1 from "../assets/checkout/image-1-checkout.jpg";
import image2 from "../assets/checkout/image-2-checkout.jpg";
import image3 from "../assets/checkout/image-3-checkout.jpg";

// import ukraine from "../assets/checkout/ukraine.jpg";

import frenchFraud from "../assets/fraud/fre.png";
import englishFraud from "../assets/fraud/eng.png";
import espanishFraud from "../assets/fraud/esp.png";

// import creditcard from "../assets/payment-checkout/creditcard.webp";
import crypto from "../assets/payment-checkout/crypto.webp";
import noverif from "../assets/payment-checkout/noverif.png";
// import ideal from "../assets/payment-checkout/ideal.webp";
// import btc from "../assets/payment-checkout/btc.png";
// import eth from "../assets/payment-checkout/eth.png";
import usdt from "../assets/payment-checkout/usdt.webp";
// import visa_master from "../assets/payment-checkout/visa_master.webp";
// import visa_mastercard from "../assets/payment-checkout/visa_mastercard.webp";
// import skrill from "../assets/payment-checkout/skrill.png";
import bank from "../assets/payment-checkout/bank.png";
// import sofort from "../assets/payment/sofort.jpg";
// import giropay from "../assets/giropay.png";

import axios from "axios";

//J'ai remplacé bnb par sofort
//J'ai remplacé paypal par giropay

import SignIn from "../components/SignIn";
import PaymentSignUp from "../components/PaymentSignUp";

import PaymentSignin from "../components/PaymentSignin";

const PaymentPage = () => {
  const productInfo = useSelector((state) => state.productsinfo);
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  // const [isButtonClicked, setIsButtonClicked] = useState(false);
  // const [script, setScript] = useState(null);

  // const handleButtonClick = () => {
  //   setIsButtonClicked(true);
  // };

  // const loadScriptButton = () => {
  //   window.location = "https://pay.glocash.com/public/gateway/js/embed.js";
  // };

  // useEffect(() => {
  //   const LoadScriptButton = () => {
  //     if (isButtonClicked) {
  //       const newScript = document.createElement("script");
  //       newScript.src = "https://www.google.com";
  //       document.body.appendChild(newScript);
  //       setScript(newScript);
  //     }
  //     return () => {
  //       if (script) {
  //         document.body.removeChild(script);
  //       }
  //     };
  //   };
  //   LoadScriptButton();
  // }, [isButtonClicked, script]);

  // const handleScriptLoad = (e) => {
  //   // setScriptLoaded(true);
  //   console.log(e);
  // };

  // const handleClick = () => {
  //   setScriptLoaded(false);
  // };
  const commentErrorUser = () =>
    toast.error("Veuillez vous connecter avant d'ajouter un commentaire");

  const commentErrorVal = () =>
    toast.error("Veuillez remplir le champ de commentaire avant de confirmer");

  const commentSuccess = () =>
    toast.success("Merci d'avoir ajouter un commentaire !");

  // console.log(productInfo);

  const handleConfirmComment = () => {
    if (!user?.user) {
      commentErrorUser();
    } else if (!comment) {
      commentErrorVal();
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_CLIENT_URL}/users/create-comment`,
        data: {
          commentEmail: user?.person?.email,
          commentLastname: user?.person?.lastname,
          commentFirstname: user?.person?.firstname,
          comment: comment,
          image: user?.person?.profil,
        },
      })
        .then((res) => {
          // console.log(res);
          commentSuccess();
          setComment("");
        })
        .catch((error) => console.log(error));
    }
  };

  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1 $2");
    return x;
  }

  const { currency } = useSelector((state) => state.currency);

  const { currencyValue } = useSelector((state) => state.currency);

  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.language);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedChange, setSelectedChange] = useState(
    productInfo?.serverSelected
  );
  const [character1, setCharacter1] = useState("");
  const [character2, setCharacter2] = useState("");
  const [loader, setLoader] = useState(false);

  const [visamastercardPay, setVisamastercardPay] = useState(false);
  const [usdtPay, setUsdtPay] = useState(false);
  const [paypalPay, setPaypalPay] = useState(false);
  const [visamasterPay, setVisamasterPay] = useState(false);
  const [credicardPay, setCredicardPay] = useState(false);
  const [idealPay, setIdealPay] = useState(false);
  const [cryptoPay, setCryptoPay] = useState(false);
  const [neosurfPay, setNeosurfPay] = useState(false);
  const [skrillPay, setSkrillPay] = useState(false);
  const [ltcPay, setLtcPay] = useState(false);
  const [bnbPay, setBnbPay] = useState(false);

  const notifyNotRegisteredPaymentFrench = () =>
    toast.error("Veuillez vous connecter d'abord avant de faire une commande");

  const notifyNotRegisteredPaymentEnglish = () =>
    toast.error("Please login first before placing an order");

  const notifyfirstCharacterRefFrench = () =>
    toast.error("Le nom du personnage ne doit pas être vide");

  const notifyfirstCharacterRefEnglish = () =>
    toast.error("Character name must not be empty");

  const notifyconfirmCharacterRefFrench = () =>
    toast.error("Les noms de personnages ne correspondent pas");

  const notifyconfirmCharacterRefEnglish = () =>
    toast.error("Character names don't match");

  const notifycheckErrorFrench = () =>
    toast.error(
      "Veuillez valider les termes et conditions et la politique de confidentialité"
    );

  const notifycheckErrorEnglish = () =>
    toast.error(
      "Please validate the terms and conditions and the privacy policy"
    );

  const notyFysuccessMessageFrench = () =>
    toast.success(
      "Votre commande a été créé avec succéss, vous pouvez verifier sur votre profil, mes commandes"
    );

  const notyFysuccessMessageEnglish = () =>
    toast.success(
      "Your order has been created successfully, you can check on your profile, my orders"
    );

  const notifyNotSigninFrench = () =>
    toast.error("Veuillez vous connecter d'abord avant de faire une commande");

  const notifyPaymentErrorFrench = () =>
    toast.error("Veuillez choisir une méthode de paiements valide.");

  const notifyPaymentErrorEnglish = () =>
    toast.error("Please choose a valid payment method.");

  const notifyPaymentErrorSpanish = () =>
    toast.error("Elija un método de pago válido.");

  const notifyTotalPriceFrench = () =>
    toast.error("Le prix de la commande ne doit pas être nul");

  const notifyTotalPriceEnglish = () =>
    toast.error("Order price must be valid");

  const notifyNotSigninEnglish = () =>
    toast.error("Please login first before placing an order");

  const notyFySuccessCharacterFrench = () =>
    toast.success("Nom du personnage validé avec succéss");

  const notyFySuccessCharacterEnglish = () =>
    toast.success("Character name validated successfully");

  const handleDisplayLoginOrRegister = (e) => {
    if (e.target.id === "login") {
      setLogin(true);
      setRegister(false);
    } else if (e.target.id === "register") {
      setRegister(true);
      setLogin(false);
    } else {
      setLogin(false);
      setRegister(false);
    }
  };
  const fixedPriceBuyNow = (val) => {
    let numberToReturn = 0;
    if (val !== "undefinded" && typeof val !== "string" && val !== "") {
      numberToReturn = val.toFixed(2);
    }
    return numberToReturn;
  };

  useEffect(() => {
    setTotalPrice((productInfo?.amount / 1000000) * productInfo?.price);
  }, [productInfo, selectedChange]);

  const handleChangeValue = (e) => {
    setSelectedChange(e.target.value);
    dispatch(changeQuantity(e.target.value));
  };
  const orderNumGenerated = () => {
    const generateOrderNum = "0123456789";

    let myCode = "";
    for (let i = 0; i < 6; i++) {
      let code = Math.floor(Math.random() * generateOrderNum.length);
      myCode += generateOrderNum[code];
    }
    return myCode;
  };

  const payCheck = document.getElementById("payCheckPayment");

  const handleAddOrdersPayment = () => {
    if (!character1 || character1 !== character2) {
      language === "anglais" && notifyfirstCharacterRefEnglish();
      language === "francais" && notifyfirstCharacterRefFrench();
    } else if (!payCheck.checked) {
      language === "anglais" && notifycheckErrorEnglish();
      language === "francais" && notifycheckErrorFrench();
    } else if (!user.user) {
      language === "anglais" && notifyNotRegisteredPaymentEnglish();
      language === "francais" && notifyNotRegisteredPaymentFrench();
    } else if (totalPrice < 0) {
      language === "anglais" && notifyTotalPriceEnglish();
      language === "francais" && notifyTotalPriceFrench();
    } else {
      const newProduct = {
        productId: productInfo?.productId,
        category: productInfo?.category,
        server: productInfo?.server,
        qty: productInfo?.amount,
        amount: productInfo?.amount / 1000000,
        price: Number(productInfo?.price),
        character: character1,
      };
      const orderData = {
        userId: user?.user,
        orderNum: orderNumGenerated(),
        detailUser: user?.person,
        products: [newProduct],
        address: "",
        status: "En attente",
        totalPrice: Number(fixedPriceBuyNow(totalPrice)),
        paymentMethod: "",
      };

      let orderToPush = [];
      orderToPush.push(orderData);
      let payments = [];
      let cur = "";

      if (currency === "euro") {
        if (visamastercardPay || visamasterPay || credicardPay) {
          orderData.paymentMethod = "Carte bancaire";
          payments = ["card"];
          cur = "eur";
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: cur, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (idealPay) {
          orderData.paymentMethod = "Ideal";
          payments = ["ideal"];
          cur = "eur";
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: cur, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (cryptoPay) {
          orderData.paymentMethod = "Coinbase";
          getCoinbaseCommerce();
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (paypalPay) {
          orderData.paymentMethod = "Giropay";
          payments = ["giropay"];
          cur = "eur";
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: cur, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (bnbPay) {
          orderData.paymentMethod = "Sofort";
          payments = ["sofort"];
          cur = "eur";
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: cur, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (usdtPay) {
          orderData.paymentMethod = "Usdt TRC20";
          window.location = `/paymentusdt/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice + 1)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (neosurfPay) {
          window.location = `/paymentbtc/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else {
          language === "anglais" && notifyPaymentErrorEnglish();
          language === "francais" && notifyPaymentErrorFrench();
          language === "espagnol" && notifyPaymentErrorSpanish();
        }
      } else if (currency === "dollar") {
        if (visamastercardPay || visamasterPay || credicardPay) {
          orderData.paymentMethod = "Carte bancaire";
          payments = ["card"];
          cur = "usd";
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: cur, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (cryptoPay) {
          orderData.paymentMethod = "Coinbase";
          getCoinbaseCommerce();
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (usdtPay) {
          orderData.paymentMethod = "Usdt TRC20";
          window.location = `/paymentusdt/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (neosurfPay) {
          window.location = `/paymentbtc/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else {
          language === "anglais" && notifyPaymentErrorEnglish();
          language === "francais" && notifyPaymentErrorFrench();
          language === "espagnol" && notifyPaymentErrorSpanish();
        }
      } else if (currency === "cad") {
        if (visamastercardPay || visamasterPay || credicardPay) {
          orderData.paymentMethod = "Carte bancaire";
          payments = ["card"];
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: currency, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (cryptoPay) {
          orderData.paymentMethod = "Coinbase";
          getCoinbaseCommerce();
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (usdtPay) {
          orderData.paymentMethod = "Usdt TRC20";
          window.location = `/paymentusdt/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (neosurfPay) {
          window.location = `/paymentbtc/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else {
          language === "anglais" && notifyPaymentErrorEnglish();
          language === "francais" && notifyPaymentErrorFrench();
          language === "espagnol" && notifyPaymentErrorSpanish();
        }
      } else if (currency === "gbp") {
        if (visamastercardPay || visamasterPay || credicardPay) {
          orderData.paymentMethod = "Carte bancaire";
          payments = ["card"];
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: currency, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (cryptoPay) {
          orderData.paymentMethod = "Coinbase";
          getCoinbaseCommerce();
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (usdtPay) {
          orderData.paymentMethod = "Usdt TRC20";
          window.location = `/paymentusdt/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (neosurfPay) {
          window.location = `/paymentbtc/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else {
          language === "anglais" && notifyPaymentErrorEnglish();
          language === "francais" && notifyPaymentErrorFrench();
          language === "espagnol" && notifyPaymentErrorSpanish();
        }
      } else if (currency === "chf") {
        if (visamastercardPay || visamasterPay || credicardPay) {
          orderData.paymentMethod = "Carte bancaire";
          payments = ["card"];
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: currency, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (cryptoPay) {
          orderData.paymentMethod = "Coinbase";
          getCoinbaseCommerce();
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (usdtPay) {
          orderData.paymentMethod = "Usdt TRC20";
          window.location = `/paymentusdt/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (neosurfPay) {
          window.location = `/paymentbtc/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else {
          language === "anglais" && notifyPaymentErrorEnglish();
          language === "francais" && notifyPaymentErrorFrench();
          language === "espagnol" && notifyPaymentErrorSpanish();
        }
      } else if (currency === "mad") {
        if (visamastercardPay || visamasterPay || credicardPay) {
          orderData.paymentMethod = "Carte bancaire";
          payments = ["card"];
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: currency, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (cryptoPay) {
          orderData.paymentMethod = "Coinbase";
          getCoinbaseCommerce();
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (usdtPay) {
          orderData.paymentMethod = "Usdt TRC20";
          window.location = `/paymentusdt/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (neosurfPay) {
          window.location = `/paymentbtc/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else {
          language === "anglais" && notifyPaymentErrorEnglish();
          language === "francais" && notifyPaymentErrorFrench();
          language === "espagnol" && notifyPaymentErrorSpanish();
        }
      } else if (currency === "rub") {
        if (visamastercardPay || visamasterPay || credicardPay) {
          orderData.paymentMethod = "Carte bancaire";
          payments = ["card"];
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
            data: { line_items: orderToPush, devise: currency, pay: payments },
          })
            .then((res) => {
              window.location = res.data.url;
              // console.log(res.data.url);
              // language === "anglais" && notyFysuccessMessageEnglish();
              // language === "francais" && notyFysuccessMessageFrench();
            })
            .then(() => {
              axios({
                method: "post",
                url: `${process.env.REACT_APP_CLIENT_URL}/order`,
                data: orderData,
              })
                .then((res) => {
                  // console.log(res.data);
                  // language === "anglais" && notyFySuccessOrderEnglish();
                  // language === "francais" && notyFySuccessOrderFrench();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else if (cryptoPay) {
          orderData.paymentMethod = "Coinbase";
          getCoinbaseCommerce();
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (usdtPay) {
          orderData.paymentMethod = "Usdt TRC20";
          window.location = `/paymentusdt/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else if (neosurfPay) {
          window.location = `/paymentbtc/${user?.user}/${Number(
            fixedPriceBuyNow(totalPrice)
          )}`;
          axios({
            method: "post",
            url: `${process.env.REACT_APP_CLIENT_URL}/order`,
            data: orderData,
          });
        } else {
          language === "anglais" && notifyPaymentErrorEnglish();
          language === "francais" && notifyPaymentErrorFrench();
          language === "espagnol" && notifyPaymentErrorSpanish();
        }
      } else {
        language === "anglais" && notifyPaymentErrorEnglish();
        language === "francais" && notifyPaymentErrorFrench();
        language === "espagnol" && notifyPaymentErrorSpanish();
      }
      // console.log(orderToPush);
      // axios({
      //   method: "post",
      //   url: `${process.env.REACT_APP_CLIENT_URL}/create-checkout-session`,
      //   data: { line_items: orderToPush, devise: currency },
      // })
      //   .then((res) => {
      //     window.location = res.data.url;
      //     // console.log(res.data.url);
      //     // language === "anglais" && notyFysuccessMessageEnglish();
      //     // language === "francais" && notyFysuccessMessageFrench();
      //   })
      //   .catch((error) => console.log(error));

      // console.log(orderData);
      // fetch("http://localhost:5001/api/create-checkout-session", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     items: [
      //       { id: 1, quantity: 3 },
      //       { id: 2, quantity: 1 },
      //     ],
      //   }),
      // })
      //   .then((res) => {
      //     if (res.ok) return res.json();
      //     return res.json().then((json) => Promise.reject(json));
      //   })
      //   .then(({ url }) => {
      //     window.location = url;
      //   })
      //   .catch((e) => {
      //     console.error(e.error);
      //   });
    }
  };

  // function numberWithCommas(x) {
  //   x = x.toString();
  //   var pattern = /(-?\d+)(\d{3})/;
  //   while (pattern.test(x)) x = x.replace(pattern, "$1 $2");
  //   return x;
  // }

  const handleTogglePaymentMethod = (e) => {
    if (e.target.id === "visa_mastercard") {
      setVisamastercardPay(true);
      setUsdtPay(false);
      setPaypalPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "usdt") {
      setUsdtPay(true);
      setVisamastercardPay(false);
      setPaypalPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "ltc") {
      setLtcPay(true);
      setUsdtPay(false);
      setVisamastercardPay(false);
      setPaypalPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setBnbPay(false);
    } else if (e.target.id === "bnb") {
      setBnbPay(true);
      setLtcPay(false);
      setUsdtPay(false);
      setVisamastercardPay(false);
      setPaypalPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
    } else if (e.target.id === "paypal") {
      setPaypalPay(true);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "skrill") {
      setSkrillPay(true);
      setVisamasterPay(false);
      setPaypalPay(false);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "visa_master") {
      setVisamasterPay(true);
      setPaypalPay(false);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "creditcard") {
      setCredicardPay(true);
      setPaypalPay(false);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setVisamasterPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "ideal") {
      setIdealPay(true);
      setPaypalPay(false);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setCryptoPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "crypto") {
      setCryptoPay(true);
      setPaypalPay(false);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setNeosurfPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else if (e.target.id === "neosurf") {
      setNeosurfPay(true);
      setPaypalPay(false);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    } else {
      setNeosurfPay(false);
      setPaypalPay(false);
      setVisamastercardPay(false);
      setUsdtPay(false);
      setVisamasterPay(false);
      setCredicardPay(false);
      setIdealPay(false);
      setCryptoPay(false);
      setSkrillPay(false);
      setLtcPay(false);
      setBnbPay(false);
    }
  };

  const getCoinbaseCommerce = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-CC-Api-Key", "1d076333-7bf2-48fe-b1e2-8db2ef5fa3aa");
    let curr = "";
    if (currency === "euro") {
      curr = "eur";
    } else if (currency === "dollar") {
      curr = "usd";
    } else {
      curr = currency;
    }

    // console.log(curr);

    var raw = JSON.stringify({
      name: "Ibendouma",
      description: "Payer avec coinbase",
      pricing_type: "fixed_price",
      local_price: {
        amount: Number(fixedPriceBuyNow(totalPrice)),
        currency: curr,
      },
      metadata: {
        customer_id: user?.person?._id,
        customer_name: user?.person?.email,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("https://api.commerce.coinbase.com/charges", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.location = result?.data?.hosted_url;
      })
      .catch((error) => console.log("error", error));
  };

  // function createMarkup() {
  //   return {
  //     __html: (
  //       <script
  //         src="https://pay.glocash.com/public/gateway/js/embed.js"
  //         class="gc-embed-button"
  //         title="PAYER MAINTENANT"
  //         d-emkey="VlcDFQFVCg5QW1EG"
  //         d-merchant="MERCH-77 LTD."
  //         d-goodsname="Acheter vos produits dofus, dofus touch et dofus retro"
  //         d-price="12.78"
  //         d-currency="EUR"
  //         d-cc3ds="1"
  //         d-email="tipox1254@gmail.com"
  //         d-suceess="http://localhost:3000/checkout-success"
  //         d-failed="https://example.com/payNotify/failed"
  //         d-pending="https://example.com/payNotify/pending"
  //         d-notify="https://example.com/payNotify/notify"
  //         // d-cc3ds="https://example.com/payNotify/notify"
  //       ></script>
  //     ),
  //   };
  // }

  // function createMarkup() {
  //   return { __html: "First &middot; Second" };
  // }

  // const handleGlocash = async () => {
  //   await axios
  //     .post(" https://sandbox.glocash.com/gateway/payment/index", {
  //       REQ_EMAIL: "payment@ibendouma.com",
  //       REQ_INVOICE: "ORDER9087HBFFT56",
  //       REQ_SIGN:
  //         "ee8f48e8b619960cd59da28719d25b451eb9b2661455412c1dd2d2f335bd0842",
  //       CUS_EMAIL: "tipox1254@gmail.com",
  //       BIL_PRICE: "37.86",
  //       URL_SUCCESS: "https://ibendouma.com//checkout-success",
  //     })
  //     .then(function (response) {
  //       console.log(response.json());
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="payment-page">
      <div className="payment-page-component">
        {!user?.user && (
          <div className="login-or-signin">
            {language === "francais" && (
              <span>Ètape 1 : Connectez-vous ou inscrivez-vous</span>
            )}
            {language === "anglais" && <span>Step 1: Log in or register</span>}
            {language === "espagnol" && (
              <span>Paso 1: Inicie sesión o regístrese</span>
            )}
            <div>
              <button
                className={
                  login ? "login-or-signin-btn1" : "login-or-signin-btn2"
                }
                onClick={handleDisplayLoginOrRegister}
                id="login"
              >
                {language === "francais" && "Connexion"}
                {language === "anglais" && "Sign In"}
                {language === "espagnol" && "registrarse"}
              </button>
              <button
                className={
                  register ? "login-or-signin-btn1" : "login-or-signin-btn2"
                }
                onClick={handleDisplayLoginOrRegister}
                id="register"
              >
                {language === "francais" && "S'inscrire"}
                {language === "anglais" && "Sign Upn"}
                {language === "espagnol" && "Inscribirse"}
              </button>
            </div>

            <div className="toggle-signin-signup">
              {login && (
                <PaymentSignin setRegister={setRegister} setLogin={setLogin} />
              )}
              {register && <PaymentSignUp />}
            </div>
          </div>
        )}
        <div className="product-information">
          {language === "francais" && user?.user && (
            <h2>Ètape 1: Récapitulatif de la commande</h2>
          )}
          {language === "anglais" && user?.user && (
            <h2>Step 1: Order Summary</h2>
          )}
          {language === "espagnol" && user?.user && (
            <h2>Paso 1: Resumen del pedido</h2>
          )}

          <div>
            <span>
              {" "}
              {language === "francais" && "Categorie"}
              {language === "anglais" && "Category"}
              {language === "espagnol" && "Categoría"}: {productInfo?.category}
            </span>
            <span>
              {" "}
              {language === "francais" && "Serveur"}
              {language === "anglais" && "Server"}
              {language === "espagnol" && "Servidora"}: {productInfo?.server}
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <span>
                {" "}
                {language === "francais" && "Prix unitaire"}
                {language === "anglais" && "Unit price"}
                {language === "espagnol" && "Precio unitario"}:
              </span>{" "}
              <span
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#ff0000",
                  marginTop: "2px",
                }}
              >
                {productInfo?.price} {currency === "euro" && "€"}
                {currency === "" && "€"}
                {currency === "dollar" && "$"}
                {currency === "mad" && "MAD"}
                {currency === "usdt" && "USDT"}
                {currency === "cad" && "CAD"}
                {currency === "chf" && "CHF"}
                {currency === "rub" && "RUB"}
                {currency === "gbp" && "£"}{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="inform-to-delivery">
          {language === "francais" && (
            <h2>Ètape 2 : Information de livraison</h2>
          )}
          {language === "anglais" && <h2>Step 2: Delivery Information</h2>}
          {language === "espagnol" && <h2>Paso 2: Información de entrega</h2>}
          <div>
            <select
              name="qty-choisi"
              id="qty-choisi"
              value={selectedChange}
              onChange={handleChangeValue}
            >
              <option value={productInfo?.amount}>
                {numberWithCommas(productInfo?.amount)}
              </option>
              <option value={productInfo?.amount * 2}>
                {numberWithCommas(productInfo?.amount * 2)}
              </option>
              <option value={productInfo?.amount * 3}>
                {numberWithCommas(productInfo?.amount * 3)}
              </option>
              <option value={productInfo?.amount * 4}>
                {numberWithCommas(productInfo?.amount * 4)}
              </option>
              <option value={productInfo?.amount * 5}>
                {numberWithCommas(productInfo?.amount * 5)}
              </option>
              <option value={productInfo?.amount * 6}>
                {numberWithCommas(productInfo?.amount * 6)}
              </option>
              <option value={productInfo?.amount * 7}>
                {numberWithCommas(productInfo?.amount * 7)}
              </option>
              <option value={productInfo?.amount * 8}>
                {numberWithCommas(productInfo?.amount * 8)}
              </option>
              <option value={productInfo?.amount * 9}>
                {numberWithCommas(productInfo?.amount * 9)}
              </option>
              <option value={productInfo?.amount * 10}>
                {numberWithCommas(productInfo?.amount * 10)}
              </option>
              <option value={productInfo?.amount * 11}>
                {numberWithCommas(productInfo?.amount * 11)}
              </option>
              <option value={productInfo?.amount * 12}>
                {numberWithCommas(productInfo?.amount * 12)}
              </option>
              <option value={productInfo?.amount * 13}>
                {numberWithCommas(productInfo?.amount * 13)}
              </option>
              <option value={productInfo?.amount * 14}>
                {numberWithCommas(productInfo?.amount * 14)}
              </option>
              <option value={productInfo?.amount * 15}>
                {numberWithCommas(productInfo?.amount * 15)}
              </option>
              <option value={productInfo?.amount * 16}>
                {numberWithCommas(productInfo?.amount * 16)}
              </option>
              <option value={productInfo?.amount * 17}>
                {numberWithCommas(productInfo?.amount * 17)}
              </option>
              <option value={productInfo?.amount * 18}>
                {numberWithCommas(productInfo?.amount * 18)}
              </option>
              <option value={productInfo?.amount * 19}>
                {numberWithCommas(productInfo?.amount * 19)}
              </option>
              <option value={productInfo?.amount * 20}>
                {numberWithCommas(productInfo?.amount * 20)}
              </option>
            </select>
            <select name="delivery-method" id="delevery-method">
              {language === "francais" && (
                <option value="Kamas Face à Face">Kamas Face à Face</option>
              )}
              {language === "anglais" && (
                <option value="Kamas face to face">Kamas face to face</option>
              )}
              {language === "espagnol" && (
                <option value="kamas cara a cara">Kamas cara a cara</option>
              )}
            </select>
          </div>
        </div>
        <div className="fraud-alert">
          <span>
            {/* <IoMdNotifications
              style={{
                fontSize: "19px",
              }}
            /> */}
            {language === "francais" && (
              <span className="fraud">
                🔔 Alerte a la prévention des fraudes: Veuillez lire cette{" "}
                <Link
                  to="/faqs"
                  style={{
                    color: "#E53333",
                    fontSize: "14px",
                    marginTop: "1px",
                  }}
                >
                  FAQ
                </Link>{" "}
                avant d'acheter !
              </span>
            )}
            {language === "anglais" && (
              <span className="fraud">
                Fraud Prevention Alert: Please read this{" "}
                {/* <Link
                  to="/faqs"
                  style={{
                    color: "#E53333",
                    fontSize: "15px",
                  }}
                > */}
                FAQ
                {/* </Link>{" "} */}
                before you buy!
              </span>
            )}
            {language === "espagnol" && (
              <span>
                Alerta de fraude: ¡Por favor, lea este{" "}
                <Link
                  to="/faqs"
                  style={{
                    color: "#E53333",
                  }}
                >
                  FAQ
                </Link>{" "}
                antes de comprar!
              </span>
            )}
          </span>
          {/* {language === "francais" && (
            <img
              src={frenchFraud}
              alt="alert-a-la-fraude"
              className="img-fraud"
            />
          )}
          {language === "anglais" && (
            <img
              src={englishFraud}
              alt="alert-a-la-fraude"
              className="img-fraud"
            />
          )}
          {language === "espagnol" && (
            <img
              src={espanishFraud}
              alt="alert-a-la-fraude"
              className="img-fraud"
            />
          )} */}

          {/* <div className="pay-page-checkout-alert">
            {language === "francais" && <h3>Attention:</h3>}
            {language === "anglais" && <h3>Warning:</h3>}
            {language === "espagnol" && <h3>Advertencia:</h3>}
            <div>
              {language === "francais" && (
                <h4>1. Pour l'achat de Kamas sur iBendouma:</h4>
              )}
              {language === "anglais" && (
                <h4>1. For the purchase of Kamas on iBendouma:</h4>
              )}
              {language === "espagnol" && (
                <h4>1. Por la compra de Kamas en iBendouma:</h4>
              )}
              {language === "francais" && (
                <span
                  style={{
                    marginTop: "-10px",
                  }}
                >
                  La prévente est maintenant ouverte, veuillez attendre
                  patiemment après avoir passé la commande. Les kamas seront
                  livrés selon l'heure de la commande s'ils sont en stock,
                  <br></br> merci de votre compréhension.
                </span>
              )}
              {language === "anglais" && (
                <span
                  style={{
                    marginTop: "-10px",
                  }}
                >
                  Presale is now open, please wait patiently after placing the
                  order. Kamas will be delivered according to the time of the
                  order if they are in stock,
                  <br></br> Thank you for your understanding.
                </span>
              )}
              {language === "espagnol" && (
                <span
                  style={{
                    marginTop: "-10px",
                  }}
                >
                  La preventa ya está abierta, espere pacientemente después de
                  colocar el ordenar. Los kamas se entregarán según la hora de
                  la pedir si están en stock,
                  <br></br> Gracias por su comprensión.
                </span>
              )}
            </div>
            <div>
              {language === "francais" && <h4>2. Délai de livraison:</h4>}
              {language === "anglais" && <h4>2. Delivery time:</h4>}
              {language === "espagnol" && <h4>2.El tiempo de entrega:</h4>}

              <span
                style={{
                  marginTop: "-10px",
                }}
              >
                5MN - 24H
              </span>
            </div>
            <div>
              {language === "francais" && (
                <h4
                  style={{
                    color: "#ff0000",
                    marginLeft: "7px",
                  }}
                >
                  Attention:
                </h4>
              )}
              {language === "anglais" && (
                <h4
                  style={{
                    color: "#ff0000",
                  }}
                >
                  Warning:
                </h4>
              )}
              {language === "espagnol" && (
                <h4
                  style={{
                    color: "#ff0000",
                  }}
                >
                  Advertencia:
                </h4>
              )}

              {language === "francais" && (
                <span
                  style={{
                    marginTop: "-10px",
                  }}
                >
                  Ne donnez jamais les Kamas reçus et vos informations
                  personnelles à qui que ce soit pour quelque raison que ce
                  soit.
                </span>
              )}
              {language === "anglais" && (
                <span>
                  Never give the Kamas received and your information personal to
                  anyone for any reason
                </span>
              )}
              {language === "espagnol" && (
                <span>
                  Nunca des los Kamas recibidos y tu información. personal a
                  cualquier persona por cualquier razón eso es.
                </span>
              )}
            </div>
          </div> */}
        </div>
        <div className="character">
          <input
            type="text"
            name="character"
            id="character"
            placeholder={
              language === "francais"
                ? "Nom de personnage"
                : language === "espagnol"
                ? "Nombre del personaje"
                : "Character name"
            }
            value={character1}
            onChange={(e) => setCharacter1(e.target.value)}
          />
          <input
            type="text"
            name="character-confirm"
            id="character-confirm"
            placeholder={
              language === "francais"
                ? "Confirmez le nom personnage"
                : language === "espagnol"
                ? "Confirmar nombre de personaje"
                : "Confirm character name"
            }
            value={character2}
            onChange={(e) => setCharacter2(e.target.value)}
          />
        </div>
        {/* <div>
          {character1 && character1 === character2 && (
            <button
              className="character-validate"
              onClick={function () {
                if (user?.user) {
                  dispatch(
                    addCharacterByPaymentpage({ character: character1 })
                  );
                  language === "anglais" && notyFySuccessCharacterEnglish();
                  language === "francais" && notyFySuccessCharacterFrench();
                } else {
                  language === "anglais" && notifyNotSigninEnglish();
                  language === "francais" && notifyNotSigninFrench();
                }
              }}
            >
              {language === "francais" && "Valider personnage"}
              {language === "anglais" && "Validate character"}
              {language === "espagnol" && "Validar caracter"}
            </button>
          )}
        </div> */}
        <div className="checkout-step3">
          {language === "francais" && (
            <h2
              style={{
                color: "#757575",
              }}
            >
              Étape 3: Méthode de paiement
            </h2>
          )}
          {language === "anglais" && (
            <h2
              style={{
                color: "#757575",
              }}
            >
              Step 3: Payment Method
            </h2>
          )}
          {language === "espagnol" && (
            <h2
              style={{
                color: "#757575",
              }}
            >
              Paso 3: Método de pago
            </h2>
          )}
          {/* <div></div> */}
          <div className="paymentpage-checkout-methods">
            {/* <div>
              <span>
                {visamastercardPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    name="visa_mastercard"
                    id="visa_mastercard"
                    onClick={handleTogglePaymentMethod}
                  />
                )}
              </span>
              <img
                src={visa_mastercard}
                alt="visa_mastercard"
                id="visa_mastercard"
                onClick={handleTogglePaymentMethod}
                style={{
                  marginLeft: "10px",
                }}
              />
              <span></span>
            </div> */}
            <div>
              <span>
                {usdtPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    name="usdt"
                    id="usdt"
                    onClick={handleTogglePaymentMethod}
                  />
                )}
              </span>
              <img
                src={usdt}
                alt="usdt"
                id="usdt"
                onClick={handleTogglePaymentMethod}
                className="usdt-all"
              />
              <span>USDT(TRC20)</span>
              <div className="fee-trc">
                <span className="fee-trc-percent">0.5%</span>
                <span className="fee-trc-fee">
                  {language === "anglais" && "Fee"}
                  {language === "francais" && "Frais"}
                  {language === "espagnol" && "Tarifa"}
                </span>
              </div>
            </div>
            {/* <div>
              <button onClick={handleGlocash}>Load Script</button>
            </div> */}

            {/* {currency === "euro" && (
              <div>
                <span>
                  {bnbPay ? (
                    <MdRadioButtonChecked
                      style={{
                        color: "#129af6",
                      }}
                    />
                  ) : (
                    <MdRadioButtonUnchecked
                      name="bnb"
                      id="bnb"
                      onClick={handleTogglePaymentMethod}
                    />
                  )}
                </span>
                <img
                  src={sofort}
                  alt="bnb"
                  id="bnb"
                  onClick={handleTogglePaymentMethod}
                  // className="bnb-pay"
                  style={{
                    marginLeft: "10px",
                  }}
                />

                <span></span>
              </div>
            )} */}

            {/* {currency === "euro" && (
              <div>
                <span>
                  {paypalPay ? (
                    <MdRadioButtonChecked
                      style={{
                        color: "#129af6",
                      }}
                    />
                  ) : (
                    <MdRadioButtonUnchecked
                      name="paypal"
                      id="paypal"
                      onClick={handleTogglePaymentMethod}
                    />
                  )}
                </span>
                <img
                  src={giropay}
                  alt="paypal"
                  id="paypal"
                  onClick={handleTogglePaymentMethod}
                  className="giro-pay"
                  style={{
                    marginLeft: "10px",
                  }}
                />

                <span></span>
              </div>
            )} */}

            {/* LTC PAY */}
            {/* <div>
              <span>
                {ltcPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked name="ltc" id="ltc" />
                )}
              </span>
              <img
                src={ltc}
                alt="ltc"
                id="ltc"
                onClick={handleTogglePaymentMethod}
                className="ltc-pay"
              />

              <span>LTC(BEP20)</span>
            </div> */}

            {/* <div className="skrill-cart-payment">
              <span>
                {skrillPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    name="skrill"
                    id="skrill"
                    onClick={handleTogglePaymentMethod}
                  />
                )}
              </span>
              <img
                src={skrill}
                alt="skrill"
                id="skrill"
                onClick={handleTogglePaymentMethod}
                style={{
                  marginLeft: "10px",
                }}
              />

              {language === "francais" && <span>3% de frais</span>}
              {language === "anglais" && <span>3% fee</span>}
              {language === "espagnol" && <span>3% de tarifa</span>}
            </div> */}
            {/* <div>
              <span>
                {visamasterPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    name="visa_master"
                    id="visa_master"
                    onClick={handleTogglePaymentMethod}
                  />
                )}
              </span>
              <img
                src={visa_master}
                alt="visa_master"
                id="visa_master"
                onClick={handleTogglePaymentMethod}
              />
              <span></span>
            </div> */}

            {/* <div>
              <span>
                {credicardPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    name="creditcard"
                    id="creditcard"
                    onClick={handleTogglePaymentMethod}
                  />
                )}
              </span>
              <img
                src={creditcard}
                alt="creditcard"
                id="creditcard"
                onClick={handleTogglePaymentMethod}
              />
              <span></span>
            </div> */}

            {/* <div>
              <span>
                {idealPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    name="ideal"
                    id="ideal"
                    onClick={handleTogglePaymentMethod}
                  />
                )}
              </span>
              <img
                src={ideal}
                alt="ideal"
                id="ideal"
                onClick={handleTogglePaymentMethod}
              />
              <span></span>
            </div> */}

            {currency === "mad" && (
              <div>
                <span>
                  {idealPay ? (
                    <MdRadioButtonChecked
                      style={{
                        color: "#129af6",
                      }}
                    />
                  ) : (
                    <a href="javascript:void(Tawk_API.toggle())">
                      <MdRadioButtonUnchecked
                        name="bank"
                        id="bank"
                        onClick={handleTogglePaymentMethod}
                        style={{
                          color: "black",
                        }}
                      />
                    </a>
                  )}
                </span>
                <a href="javascript:void(Tawk_API.toggle())">
                  <img
                    src={bank}
                    alt="bank"
                    id="bank"
                    onClick={handleTogglePaymentMethod}
                  />
                </a>
                <span>
                  {language === "francais" && "Virement bancaire"}
                  {language === "anglais" && "Bank transfer"}
                  {language === "espagnol" && "transferencia bancaria"}
                </span>
              </div>
            )}

            <div>
              <span>
                {cryptoPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    name="crypto"
                    id="crypto"
                    onClick={handleTogglePaymentMethod}
                  />
                )}
              </span>
              <img
                src={noverif}
                alt="crypto"
                id="crypto"
                onClick={handleTogglePaymentMethod}
                className="crypto-all"
              />
              <div className="fee-crypto">
                <span className="fee-trc-percent">1%</span>
                <span className="fee-trc-fee">
                  {language === "anglais" && "Fee"}
                  {language === "francais" && "Frais"}
                  {language === "espagnol" && "Tarifa"}
                </span>
              </div>
            </div>
            {/* <div>
              <h1>My Component</h1>
              
              
            </div> */}

            {/* I use Glo Cash API Payment */}

            {/* <div
              dangerouslySetInnerHTML={createMarkup()}
              style={{
                background: "blue",
                height: "50px",
                width: "100px",
              }}
            /> */}

            {/* <div>
              <span>
                {neosurfPay ? (
                  <MdRadioButtonChecked
                    style={{
                      color: "#129af6",
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked name="neosurf" id="neosurf" />
                )}
              </span>
              <img
                src={btc}
                alt="neosurf"
                id="neosurf"
                onClick={handleTogglePaymentMethod}
                className="btc-pay"
              />
              <span>BTC(TRC20)</span>
            </div> */}
          </div>
        </div>
        <div className="checkout-step4">
          {language === "francais" && (
            <h2
              style={{
                color: "#757575",
              }}
            >
              Laisser un commentaire
            </h2>
          )}
          {language === "anglais" && (
            <h2
              style={{
                color: "#757575",
              }}
            >
              Leave a review
            </h2>
          )}
          {language === "espagnol" && (
            <h2
              style={{
                color: "#757575",
              }}
            >
              Dejar un comentario
            </h2>
          )}
          <div className="comment-container">
            <textarea
              className="text-comment"
              placeholder={
                language === "anglais"
                  ? "Add comments regarding this order"
                  : "Ajouter des commentaires concernant cette commande"
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="text-comment-btn" onClick={handleConfirmComment}>
              {language === "anglais" && "Confirm"}

              {language === "francais" && "Confirmer"}

              {language === "espagnol" && "Confirmar"}
            </button>
          </div>
        </div>
      </div>
      <div className="payment-page-checkout">
        <div className="page-checkout-cart">
          {language === "francais" && (
            <span className="page-checkout-textname">Total</span>
          )}
          {language === "anglais" && (
            <span className="page-checkout-textname">Total</span>
          )}
          {language === "espagnol" && (
            <span className="page-checkout-textname">Total</span>
          )}

          <span className="checkout-price">
            {fixedPriceBuyNow(totalPrice)} {currency === "euro" && "€"}
            {currency === "" && "€"}
            {currency === "dollar" && "$"}
            {currency === "mad" && "MAD"}
            {currency === "usdt" && "USDT"}
            {currency === "cad" && "CAD"}
            {currency === "chf" && "CHF"}
            {currency === "rub" && "RUB"}
            {currency === "gbp" && "£"}{" "}
          </span>
        </div>
        <div className="page-checkout-cart">
          {language === "francais" && (
            <span className="page-checkout-textname">Coupon</span>
          )}
          {language === "anglais" && (
            <span className="page-checkout-textname">Coupon</span>
          )}
          {language === "espagnol" && (
            <span className="page-checkout-textname">Cupón</span>
          )}
          <span className="checkout-number">
            -0.00 {currency === "euro" && "€"}
            {currency === "" && "€"}
            {currency === "dollar" && "$"}
            {currency === "mad" && "MAD"}
            {currency === "usdt" && "USDT"}
            {currency === "cad" && "CAD"}
            {currency === "chf" && "CHF"}
            {currency === "rub" && "RUB"}
            {currency === "gbp" && "£"}{" "}
          </span>
        </div>
        <div className="page-checkout-cart">
          {language === "francais" && (
            <span className="page-checkout-textname">
              Commission de transaction
            </span>
          )}
          {language === "anglais" && (
            <span className="page-checkout-textname">Transaction fee</span>
          )}
          {language === "espagnol" && (
            <span className="page-checkout-textname">
              Tarifa de transacción
            </span>
          )}

          <span className="checkout-number">
            + 0 {currency === "euro" && "€"}
            {currency === "" && "€"}
            {currency === "dollar" && "$"}
            {currency === "mad" && "MAD"}
            {currency === "usdt" && "USDT"}
            {currency === "cad" && "CAD"}
            {currency === "chf" && "CHF"}
            {currency === "rub" && "RUB"}
            {currency === "gbp" && "£"}{" "}
          </span>
        </div>
        <div className="page-checkout-cart">
          {language === "francais" && (
            <span className="page-checkout-textname">
              Commission de payment
            </span>
          )}
          {language === "anglais" && (
            <span className="page-checkout-textname">Payment fee</span>
          )}
          {language === "espagnol" && (
            <span className="page-checkout-textname">Cuota de pago</span>
          )}

          <span className="checkout-number">
            +{" "}
            {usdtPay
              ? `${currency === "mad" ? 11.15 : currencyValue / currencyValue}`
              : "0"}{" "}
            {currency === "euro" && "€"}
            {currency === "" && "€"}
            {currency === "dollar" && "$"}
            {currency === "mad" && "MAD"}
            {currency === "usdt" && "USDT"}
            {currency === "cad" && "CAD"}
            {currency === "chf" && "CHF"}
            {currency === "rub" && "RUB"}
            {currency === "gbp" && "£"}{" "}
          </span>
        </div>
        <div className="checkout-checkbox-terms">
          <input
            type="checkbox"
            name=""
            id="payCheckPayment"
            style={{
              cursor: "pointer",
            }}
          />

          {language === "francais" && (
            <span>
              J'ai lu et accepté la{" "}
              <Link to="/privacy-policy" className="link-checkout">
                {" "}
                Politique De Confidentialité
              </Link>{" "}
            </span>
          )}
          {language === "anglais" && (
            <span>
              I have read and accept the{" "}
              <Link to="/privacy-policy" className="link-checkout">
                {" "}
                Privacy policy
              </Link>{" "}
            </span>
          )}
          {language === "espagnol" && (
            <span>
              He leído y acepto la{" "}
              <Link to="/privacy-policy" className="link-checkout">
                {" "}
                Política de privacidad
              </Link>{" "}
            </span>
          )}
        </div>
        <div
          className="button-to-checkout-pay"
          onClick={handleAddOrdersPayment}
        >
          <button className="checkout-btn">
            <span className="checkout-icon">
              <MdLockOutline />
            </span>
            <span className="checkout-pay-mtn">
              {language === "francais" && "Payer"}
              {language === "anglais" && "Pay"}
              {language === "espagnol" && "Pagar"}{" "}
            </span>
          </button>
        </div>
        {/* <div className="ukraine-help">
          <img src={ukraine} alt="crisis-in-ukraine" />

          {language === "francais" && (
            <span className="ukraine-help-text">
              Nous promettons de faire don de 1% du bénéfice de chaque commande
              au CICR pour aider davantage de victimes de la crise ukrainienne.
            </span>
          )}
          {language === "anglais" && (
            <span className="ukraine-help-text">
              We promise to donate 1% of each order's profit to the ICRC to help
              more victims of the Ukrainian crisis.
            </span>
          )}
          {language === "espagnol" && (
            <span className="ukraine-help-text">
              Prometemos donar el 1% de las ganancias de cada pedido a la CICR
              para ayudar a más víctimas de la crisis de Ucrania.
            </span>
          )}
        </div> */}
        {/* <hr className="hr-line" /> */}
        <div className="checkout-security">
          <div>
            <a href="https://hubsecurity.com/" target="__blank">
              <img src={image1} alt="dss security" />
            </a>
            <a href="https://fr.trustpilot.com/" target="__blank">
              <img src={image2} alt="Trustpilot" />
            </a>
            <a href="https://us.norton.com/" target="__blank">
              <img src={image3} alt="shopping guarantee" />
            </a>
          </div>

          {language === "francais" && (
            <p>
              Nous utilisons la dernière technologie PCI DSS pour chiffrer
              toutes vos données personnelles. Ceci permet une transmission
              sécurisée et empêche l'accès à vos données par des tiers.
            </p>
          )}
          {language === "anglais" && (
            <p>
              We use the latest PCI DSS technology to encrypt all your personal
              data. This allows secure transmission and prevents access to your
              data by third parties.
            </p>
          )}
          {language === "espagnol" && (
            <p>
              Utilizamos la última tecnología PCI DSS para cifrar todos tus
              datos personales Esto permite una transmisión segura y impide el
              acceso a sus datos por parte de terceros.
            </p>
          )}
        </div>
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
  );
};

export default PaymentPage;
