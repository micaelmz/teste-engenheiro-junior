import React, {useEffect, useState} from 'react';
import BasePage from './BasePage';
import Row from 'react-bootstrap/Row';
import {Typography} from '@mui/material';
import {InputGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {Button} from 'primereact/button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import ProductCard from '../../components/ProductCard';
import {ProductService} from '../../service/ProductService';
import ProductsSkeleton from "../../components/ProductsSkeleton";
import {CreateProductModal} from "../../components/modals/ProductsModals";


export default function ProductsDashboard() {

  const cdnProductUrl = 'http://localhost:8000/img/products/';
  /* STATES */
  const [products, setProducts] = useState(null);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [targetProduct, setTargetProduct] = useState(null); // Target to edit or delete

  /* UTILS */
  const fetchProductsData = () => {
    ProductService.getData().then((data) => {
      const updatedData = data.map((product) => ({
        ...product,
        available: product.stock_quantity > 0
      }));
      setProducts(updatedData);
    });
  };

  /* LIFECYCLE */
  useEffect(() => {
    setTargetProduct(ProductService.getBaseObject());
    fetchProductsData();
  }, []);

  return (
      <BasePage fabShow fabCallback={()=>{
        setTargetProduct(ProductService.getBaseObject());
        setIsOpenCreateModal(true);
      }}>
        <div className="card">
          <Typography variant="h6" className="text-black poppins mb-2 fw-bold">
            Todos os produtos
          </Typography>
          <Typography variant="h7" className="text-black-50 poppins fw-bold mb-4">
            Clique em um produto para ver detalhes
          </Typography>
          <InputGroup className="mb-4">
            <Form.Control placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start">
              <SearchOutlinedIcon/>
            </Button>
          </InputGroup>
          <Row>
            {products ?
                (products.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            price={product.price}
                            available={product.available}
                            image={`${cdnProductUrl}/${product.image}`}
                        />
                    ))
                ) : (
                    <ProductsSkeleton/>
                )}
          </Row>
          <CreateProductModal
              service={ProductService}
              isOpen={isOpenCreateModal}
              setTargetProduct={setTargetProduct}
              productObj={targetProduct}
              handleClose={() => {
                setIsOpenCreateModal(false);
                fetchProductsData();
              }}
          />
        </div>
      </BasePage>
  );
}
