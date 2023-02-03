import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DofusKamas = ({ kamas, valueExchange, currency }) => {
  const { products } = useSelector((state) => state.products);
  // console.log(products);
  const [dofusId, setDofusId] = useState("");
  // console.log(dofusId);

  const { language } = useSelector((state) => state.language);

  useEffect(() => {
    setDofusId(
      products.filter((item) => item.category === "dofus-kamas")[0]?._id
    );
  }, [products]);
  return (
    <div className="dofus-kamas">
      <h1 className="dofus-kamas-title">Dofus Kamas</h1>
      <table>
        <thead>
          {language === "francais" && (
            <tr>
              <th>Serveur</th>
              <th className="pric-kamas">Prix({currency})</th>
              <th className="qty-kamas">Quantité Min(M)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          )}

          {language === "anglais" && (
            <tr>
              <th>Server</th>
              <th className="pric-kamas">Price({currency})</th>
              <th className="qty-kamas">Quantity Min(M)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          )}
          {language === "espagnol" && (
            <tr>
              <th>Servidora</th>
              <th className="pric-kamas">Prix({currency})</th>
              <th className="qty-kamas">Cantidad mínima(M)</th>
              <th>Estado</th>
              <th>Comportamiento</th>
            </tr>
          )}
        </thead>
        <tbody>
          {kamas.map((singleKamas) => (
            <tr key={singleKamas.serverName}>
              <td>{singleKamas?.serverName}</td>
              <td>{(singleKamas?.serverPrice * valueExchange).toFixed(2)}</td>
              <td className="amount">{singleKamas?.serverMinQty}</td>
              <td>
                <p
                  className={`status ${
                    singleKamas.serverStatus === "disponible"
                      ? "status-paid"
                      : "status-unpaid"
                  }`}
                >
                  {singleKamas.serverStatus}
                </p>
              </td>
              {/* <td className="amount">$520.18</td> */}
              <td>
                {singleKamas?.serverStatus === "disponible" ? (
                  <Link to={`/dofus/${dofusId}`} className="status status-paid">
                    {language === "francais" && "Acheter Maintenant"}
                    {language === "anglais" && "Buy Now"}
                    {language === "espagnol" && "Comprar Ahora"}
                  </Link>
                ) : (
                  <Link
                    to={`/dofus/${dofusId}`}
                    className="status status-unpaid"
                  >
                    {language === "francais" && "Par commande"}
                    {language === "anglais" && "By order"}
                    {language === "espagnol" && "Por orden"}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DofusKamas;
