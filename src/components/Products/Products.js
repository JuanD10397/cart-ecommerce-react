import React from 'react';
import { Container, Row } from 'react-bootstrap';
//Mis Componentes
import Loading from '../Loading';
import Product from '../Product';

export default function Products(props){

    const { 
        products: { result, loading, error },
        addProductCart
    } = props;

    return(
        <Container>
            <Row>
                {/* Si loading es true o result es inválido se hace el primer () sino entra al segundo () 
                En el segundo hago un map de todos los productos y les paso los datos por params a Product*/}
                {loading || !result ? (
                    <div>
                        <Loading />
                    </div>
                ) : (
                    result.map((product, index) => ( 
                        <Product 
                            key={index} 
                            product={product} 
                            addProductCart={addProductCart}
                        /> 
                    )))}
            </Row>
        </Container>
    );
}