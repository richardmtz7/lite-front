import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateProduct from "./Product";
import CreateCompany from "./Company";
import CreateCategory from "./Category";

const Dashboard = () => {
  const [selectedAction, setSelectedAction] = useState("");

  const handleCreateProduct = async (newProduct) => {
    try {
      const response = await fetch("http://localhost:8081/api/business/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productName: newProduct.productName,
          characteristics: newProduct.characteristics,
          price: newProduct.price,
          companyNit: newProduct.companyNit,
          categoryId: newProduct.categoryId
        })
      });
  
      const result = await response.json();
      alert(`Producto creado: ${result.productName}`);
      fetchProducts();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  const handleCreateCompany = async (company) => {
    try {
      const response = await fetch("http://localhost:8081/api/business/company/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nit: company.nit,
          companyName: company.companyName,
          address: company.address,
          phone: company.phone
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      alert(`Empresa creada: ${result.companyName}`);
    } catch (error) {
      console.error("Error creando empresa:", error);
      alert("Hubo un error creando la empresa. Por favor, inténtalo de nuevo.");
    }
  };
  

  const handleCreateCategory = async (categoryName) => {
    try {
      const response = await fetch("http://localhost:8081/api/business/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ categoryName })
      });
      const result = await response.json();
      alert(`Categoría creada: ${result.categoryName}`);
    } catch (error) {
      console.error("Error creando categoría:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard de Gestión</h1>
      <p>Recuerde que para crear un producto, es necesario primero haber creado una categoria y una empresa</p>
      <div>
        <button onClick={() => setSelectedAction("category")}>Crear Categoría</button>
        <button onClick={() => setSelectedAction("company")}>Crear Empresa</button>
        <button onClick={() => setSelectedAction("product")}>Crear Producto</button>
      </div>
      <br />
      <div>
      <Link to="/view-products"><button>Ver Productos</button></Link>
      <Link to="/view-companies"><button>Ver Empresas</button></Link>
      </div>

      {selectedAction === "product" && <CreateProduct onCreate={handleCreateProduct} />}
      {selectedAction === "company" && <CreateCompany onCreate={handleCreateCompany} />}
      {selectedAction === "category" && <CreateCategory onCreate={handleCreateCategory} />}
    </div>
  );
};

export default Dashboard;
