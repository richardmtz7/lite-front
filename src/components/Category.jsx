import React, { useState } from "react";

const CreateCategory = ({ onCreate }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = () => {
    onCreate(categoryName);
    setCategoryName("");
  };

  return (
    <div>
      <h2>Crear Categoría</h2>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Nombre de la Categoría"
      />
      <button onClick={handleSubmit}>Crear Categoría</button>
    </div>
  );
};

export default CreateCategory;
