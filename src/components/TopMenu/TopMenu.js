import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
//Mi Logo
import { ReactComponent as Logo } from '../../assets/svg/logo.svg'; //Lo importo como si fuera un Componente
import Cart from '../Cart';

import './TopMenu.scss'


export default function TopMenu(props){

    const { productsCart, getProductsCart, products } = props;

    return(
        <Navbar bg="dark" variant="dark" className="top-menu" style={{color:"#fff"}}>
            <Container>
                <BrandNav />
                {/*<MenuNav />*/}
                <Cart productsCart={productsCart} getProductsCart={getProductsCart} products={products}/>
            </Container>
        </Navbar>
    );
}


// Componentes internos

function BrandNav(){
    return(
        <Navbar.Brand>
            <Logo />
            <h2>La casa de los helados</h2>
        </Navbar.Brand>
    )
}


// Este no lo usaremos
function MenuNav(){
    return(
        <Nav className="mr-auto">
            <Nav.Link href='#'>Aperitivos</Nav.Link>
            <Nav.Link href='#'>Helados</Nav.Link>
            <Nav.Link href='#'>Gomitas</Nav.Link>
        </Nav>
    );
}