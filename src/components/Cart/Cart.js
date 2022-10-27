import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
//Mis iconos, Funciones y Constante
import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg';
import { countDuplicatesItemArray, removeArrayDuplicates, removeItemArray } from '../../utils/arrayFunc';
import { STORAGE_PRODUCTS_CART, BASE_PATH } from '../../utils/constants';

import './Cart.scss';


export default function Cart(props){

    //productsCart tiene los id de todos los elementos del carrito. products tiene todos los datos de la BD
    const { productsCart, getProductsCart, products } = props;

    // Estados
    const [cartOpen, setCartOpen] = useState(false);
    const [singleProductsCart, setSingleProductsCart] = useState([]);  // Tengo los ids de los productos del carrito (no cantidades, solo ids)
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    // Variable que si el cartOpen es true el ancho del carrito son 400px, si es false el ancho es 0px
    const widthCartContent = cartOpen ? 400 : 0;

    //carga los productos
    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCart);
        setSingleProductsCart(allProductsId);
    }, [productsCart]);

    //Actualiza el precio total del carrito
    useEffect(() => {
        const productData = [];
        let totalPrice = 0;

        const allProductsId = removeArrayDuplicates(productsCart);
        allProductsId.forEach(productId => {
            const quantity = countDuplicatesItemArray(productId, productsCart);
            //Objeto que tiene el id del producto y la cantidad de ese producto que hay en el carrito
            const productValue = {
                id: productId,
                quantity: quantity
            };
            productData.push(productValue);
        });

        console.log(productData);

        if(!products.loading && products.result){
            products.result.forEach(product => {
                productData.forEach(item => {
                    if(product.id == item.id){
                        const totalValue = product.price * item.quantity;
                        totalPrice = totalPrice + totalValue;
                    }
                })
            })
        }

        setCartTotalPrice(totalPrice);

    }, [productsCart, products]); 

    //Función abrir el carrito
    const openCart = () => {
        setCartOpen(true);

        //Cuando el carrito está abierto el usuario no puede hacer scroll en la página web
        document.body.style.overflow = "hidden";
    }

    const closeCart = () => {
        setCartOpen(false);

        //Puedo hacer scroll en la página
        document.body.style.overflow = "scroll";
    }

    //Vacía el carrito (vacía el localstorage con la key de STORAGE_PRODUCTS_CART)
    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART);
        getProductsCart();
    }

    // Funciones para aumentar y disminuir cantidad de producto en el carrito
    const increaseQuantity = (id) => {
        const arrayItemsCart = productsCart;
        arrayItemsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
        getProductsCart(); // Esto refresca el carrito
    }
    const decreaseQuantity = (id) => {
        const arrayItemsCart = productsCart;
        const result = removeItemArray(arrayItemsCart, id.toString());
        localStorage.setItem(STORAGE_PRODUCTS_CART, result);
        getProductsCart();
    }


    return(
        <>
            <Button variant="link" className="cart">
                {//Si hay productos renderizo un icono de carrito lleno, si no hay productos renderizo uno vacío
                productsCart.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )} 
            </Button>
            <div className="cart-content" style={{ width: widthCartContent }}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart}/>
                <div className="cart-content__products">
                    {singleProductsCart.map((idProductsCart, index) => (
                        //Pinto en el carrito cada producto único, con id único (no pinto repetidos)
                        <CartContentProducts 
                            key={index} 
                            products={products} 
                            idsProductsCart={productsCart}
                            idProductCart={idProductsCart}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        /> 
                    ))}
                </div>
                <CarContentFooter cartTotalPrice={cartTotalPrice}/>
            </div>
        </>
    );
}



// Componentes Internos

function CartContentHeader(props){
    const { closeCart, emptyCart } = props;
    return (
        <div className="cart-content__header">
            <div>
                <Close onClick={closeCart}/>
                <h2>Carrito</h2>
            </div>
            <Button variant="link" onClick={emptyCart}>
                Vaciar
                <Garbage />
            </Button>
        </div>
    )
}


function CartContentProducts(props) {
    const { 
        products:{loading, result},
        idsProductsCart,
        idProductCart,
        increaseQuantity,
        decreaseQuantity
    } = props;

    //Si terminó de cargar y result tiene contenido
    if(!loading && result){
        return result.map((product, index) => {
            if(idProductCart == product.id){
                const quantity = countDuplicatesItemArray(product.id, idsProductsCart);
                return (
                    <RenderProduct 
                        key={index}
                        product={product}
                        quantity={quantity}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                )
            }
        })
    }
    return null;
}

// Componente que renderiza en el carrito un único Producto
function RenderProduct(props) {
    const { product, quantity, increaseQuantity, decreaseQuantity } = props;

    return (
        <div className="cart-content__product">
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
            <div className="cart-content__product-info">
                <div>
                    <h3>{product.name.substr(0, 25)}...</h3>
                    <p>{product.price.toFixed(2)} S/ por ud.</p>
                </div>
                <div>
                    <p>En el carrito: {quantity} ud.</p>
                    <div>
                        <button onClick={() => (increaseQuantity(product.id))}>+</button>
                        <button onClick={() => (decreaseQuantity(product.id))}>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


function CarContentFooter(props) {
    const { cartTotalPrice } = props;

    return (
        <div className="cart-content__footer">
            <div>
                <p>Total aproximado: </p>
                <p>{cartTotalPrice.toFixed(2)} S/</p>
            </div>
            <Button>Tramitar pedido</Button>
        </div>
    )
}