import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Edit = () => {
  const [budget, setBudget] = useState(0);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const group = doc(db, "groups", id);
    const data = {
      budget: budget,
      desc: desc,
      name: name,
      participants: participants,
    };
    await updateDoc(group, data);
    navigate("/");
  };

  const getGroupById = async (id) => {
    const group = await getDoc(doc(db, "groups", id));
    if (group.exists()) {
      // console.log(group.data());
      setBudget(group.data().budget);
      setDesc(group.data().desc);
      setName(group.data().group);
      //recorrer el array de participantes
      let participants = "";
      group.data().participants.forEach((participant) => {
        participants += participant + ",";
      });
    } else {
      console.log("el grupo no existe");
    }
  };

  useEffect(() => {
    getGroupById(id);
  }, []);

  return (
    <div>
      <h1>Editar grupo</h1>
      <form onSubmit={update}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="desc">Descripción</label>
        <input
          type="text"
          name="desc"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label htmlFor="budget">Presupuesto</label>
        <input
          type="number"
          name="budget"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default Edit;
