import React, { useState } from "react";

const CreateCompany = ({ onCreate }) => {
  const [nit, setNit] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    const newCompany = {
      nit: nit,
      companyName: companyName,
      address: address,
      phone: phone,
    };

    onCreate(newCompany);

    setNit("");
    setCompanyName("");
    setAddress("");
    setPhone("");
  };

  return (
    <div>
      <h2>Crear Empresa</h2>
      <input
        type="text"
        value={nit}
        onChange={(e) => setNit(e.target.value)}
        placeholder="NIT"
      />
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Nombre de la Empresa"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Dirección"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Teléfono"
      />
      <button onClick={handleSubmit}>Crear Empresa</button>
    </div>
  );
};

export default CreateCompany;
