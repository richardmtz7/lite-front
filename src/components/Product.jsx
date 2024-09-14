import React, { useState, useEffect } from "react";

const CreateProduct = ({ onCreate }) => {
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [characteristics, setCharacteristics] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8081/api/business/category/getAll");
    const data = await response.json();
    setCategories(data);
  };

  const fetchCompanies = async () => {
    const response = await fetch("http://localhost:8081/api/business/company/getAll");
    const data = await response.json();
    setCompanies(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchCompanies();
  }, []);

  const handleSubmit = () => {
    const newProduct = {
      productName,
      characteristics,
      price: parseFloat(price),
      categoryId: selectedCategory,
      companyNit: selectedCompany,
    };

    onCreate(newProduct);

    setProductName("");
    setCharacteristics("");
    setPrice("");
    setSelectedCategory("");
    setSelectedCompany("");
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Nombre del Producto"
      />

      <input
        type="text"
        value={characteristics}
        onChange={(e) => setCharacteristics(e.target.value)}
        placeholder="Características del Producto"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio del Producto"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Seleccionar Categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>

      <select
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">Seleccionar Empresa</option>
        {companies.map((company) => (
          <option key={company.nit} value={company.nit}>
            {company.companyName} ({company.nit})
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Crear Producto</button>
    </div>
  );
};

export default CreateProduct;
