import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Show = () => {
  //configurar los hooks
  const [groups, setGroups] = useState([]);

  //referencias la data de firebase
  const groupsDocs = collection(db, "groups");

  //funcion para mostrar todo los docs
  const getGroups = async () => {
    const data = await getDocs(groupsDocs);
    setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //funcion para eliminar
  // const deleteGroup = async (id) => {
  //   const groupDoc = doc(db, "groups", id);
  //   await deleteDoc(groupDoc);
  //   getGroups();
  // };

  //funcion de confirmacion alert
  //useEffect
  useEffect(() => {
    getGroups();
  });
  //devolvemos la vista

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-secondary mt-2">
                Crear
              </Link>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Nombre del grupo</th>
                    <th>descripcion</th>
                    <th>integrantes</th>
                    <th>presupuesto</th>
                    <th>Jueces que aportaron</th>
                    <th>editar</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((item) => (
                    <tr key={item.id}>
                      <td>{item.group}</td>
                      <td>{item.desc}</td>
                      <td>
                        {item.participants.map((item) => (
                          <p key={item.id}>{item.name}</p>
                        ))}
                      </td>

                      <td>{item.budget}</td>
                      <td>
                        {item.judges.map((item) => (
                          <p key={item.id}>
                            {item.name} aporto: ${item.money}
                          </p>
                        ))}
                      </td>
                      <td>
                        <Link to={`/edit/${item.id}`} className="btn btn-light">
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
