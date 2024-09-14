import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import '../App.css';

class ProductTable extends React.Component {
    render() {
        const { products, handlePurchase, handleDeleteProduct } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Producto</th>
                        <th>Características</th>
                        <th>Precio</th>
                        <th>NIT de la Empresa</th>
                        <th>ID de Categoría</th>
                        <th className="no-print">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.characteristics}</td>
                            <td>${product.price}</td>
                            <td>{product.companyNit ? product.companyNit : 'N/A'}</td>
                            <td>{product.categoryId}</td>
                            <td className="no-print">
                                <button onClick={() => handlePurchase(product.productId)}>Comprar</button>
                                <button
                                    onClick={() => handleDeleteProduct(product.productId)}
                                    style={{ marginLeft: '8px', backgroundColor: 'red', color: 'white' }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");
    const componentRef = useRef();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/business/product/getAll");
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!userId) {
            alert("Por favor, inicia sesión para comprar un producto.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/business/product/delete/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el producto");
            }

            const result = await response.text();
            fetchProducts();
            alert(`Producto eliminado exitosamente: ${result}`);
        } catch (error) {
            console.error("Error eliminando producto:", error);
            alert("Hubo un error al eliminar el producto. Inténtalo de nuevo.");
        }
    };

    const handlePurchase = async (productId) => {
        if (!userId) {
            alert("Por favor, inicia sesión para comprar un producto.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/business/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: productId,
                    customerId: userId,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al crear la orden");
            }

            const result = await response.text();
            alert(`Orden creada exitosamente: ${result}`);
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Hubo un error al crear la orden. Inténtalo de nuevo.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div>
            <h2>Lista de Productos</h2>
            <button onClick={() => navigate('/dashboard')}>Regresar al Dashboard</button>
            <ReactToPrint
                trigger={() => <button>Imprimir PDF</button>}
                content={() => componentRef.current}
            />
            <div style={{ display: 'none' }}>
                <ProductTable
                    ref={componentRef}
                    products={products}
                    handlePurchase={handlePurchase}
                    handleDeleteProduct={handleDeleteProduct}
                />
            </div>
            {products.length > 0 ? (
                <ProductTable
                    products={products}
                    handlePurchase={handlePurchase}
                    handleDeleteProduct={handleDeleteProduct}
                />
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default ViewProducts;
