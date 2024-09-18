import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from "../config/api";
import '../App.css';

const ViewCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentCompany, setCurrentCompany] = useState({});
    const navigate = useNavigate();

    const fetchCompanies = async () => {
        try {
            const response = await fetch(`${ENDPOINTS.BUSINESS_COMPANY}/getAll`);
            if (!response.ok) {
                throw new Error("Error al obtener las empresas");
            }
            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCompany = async (nit) => {
        try {
            const response = await fetch(`${ENDPOINTS.BUSINESS_COMPANY}/delete/${nit}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la empresa");
            }

            const result = await response.text();
            alert(`Empresa eliminada exitosamente: ${result}`);
            fetchCompanies();
        } catch (error) {
            console.error("Error eliminando empresa:", error);
            alert("Hubo un error al eliminar la empresa. Inténtalo de nuevo.");
        }
    };

    const handleEditClick = (company) => {
        setCurrentCompany(company);
        setShowEditForm(true);
    };

    const handleEditCompany = async () => {
        try {
            const response = await fetch(`${ENDPOINTS.BUSINESS_COMPANY}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentCompany)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.text();
            fetchCompanies();
            alert(`Empresa editada: ${result}`);
            setShowEditForm(false);
        } catch (error) {
            console.error("Error editando empresa:", error);
            alert("Hubo un error editando la empresa. Por favor, inténtalo de nuevo.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCompany((prevCompany) => ({
            ...prevCompany,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const userRole = localStorage.getItem("role");

    if (loading) {
        return <div>Cargando empresas...</div>;
    }

    return (
        <div>
            <h2>Lista de Empresas</h2>
            <button onClick={() => navigate('/dashboard')}>Regresar al Dashboard</button>
            {companies.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>NIT</th>
                            <th>Nombre de la Empresa</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            {userRole === "ADMIN" && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.nit}>
                                <td>{company.nit}</td>
                                <td>{company.companyName}</td>
                                <td>{company.address}</td>
                                <td>{company.phone}</td>
                                <td>{company.status === 1 ? "Activo" : "Inactivo"}</td>
                                {userRole === "ADMIN" && (
                                    <td>
                                        <button onClick={() => handleEditClick(company)}>
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCompany(company.nit)}
                                            style={{ marginLeft: '8px', backgroundColor: 'red', color: 'white' }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay empresas disponibles.</p>
            )}

            {showEditForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Editar Empresa</h3>
                        <label>
                            NIT:
                            <input type="text" name="nit" value={currentCompany.nit} readOnly />
                        </label>
                        <label>
                            Nombre de la Empresa:
                            <input type="text" name="companyName" value={currentCompany.companyName} onChange={handleInputChange} />
                        </label>
                        <label>
                            Dirección:
                            <input type="text" name="address" value={currentCompany.address} onChange={handleInputChange} />
                        </label>
                        <label>
                            Teléfono:
                            <input type="text" name="phone" value={currentCompany.phone} onChange={handleInputChange} />
                        </label>
                        <button onClick={handleEditCompany}>Guardar Cambios</button>
                        <button onClick={() => setShowEditForm(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCompanies;
