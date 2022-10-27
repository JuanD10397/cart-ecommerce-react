import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//Mis Componentes, Hooks y constantes
import TopMenu from './components/TopMenu';
import Products from './components/Products';
import useFetch from './hooks/useFetch';
import { urlAPIProducts } from './utils/constants';
import { STORAGE_PRODUCTS_CART } from './utils/constants';


function App() {

  //Hago petición http con mi hook a la BD. Products tiene toda la info de la BD
  const products = useFetch(urlAPIProducts, null);

  // Estado del carrito
  const [productsCart, setProductsCart] = useState([]);


  useEffect(() => {
    getProductsCart()
  }, []);


  //Funció recoger productos que hay en el carrito
  const getProductsCart = () => {
    const idsProducts = localStorage.getItem( STORAGE_PRODUCTS_CART );

    //Si hay productos en el carrito
    if(idsProducts) {
      //Convierto el string de localstorage en un arreglo
      const idsProductsSplit = idsProducts.split(',');
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]); //Si no hay productos obtengo un arreglo vacío
    }
  }


  //Función añadir productos al carrito
  const addProductCart = (id, name) => {
    
    //Guardo el nuevo id en el arreglo productsCart
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);

    //Guardar el estado en el localstorage (le paso la key que se usará en el localstorage y el valor que se guardará asociado a esa key)
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);

    getProductsCart();

    toast.success(`${name} añadido al carrito correctamente`);
  };
  

  return (
    <div>
      <TopMenu productsCart={productsCart} getProductsCart={getProductsCart} products={products}/>
      <Products products={products} addProductCart={addProductCart}/>
      <ToastContainer 
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}

export default App;
