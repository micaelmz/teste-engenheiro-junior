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
import {CreateProductModal, UpdateProductModal, DeleteClientModal} from "../../components/modals/ProductsModals";
import {ClientService} from "../../service/ClientService";


export default function ProductsDashboard() {

  const cdnProductUrl = 'http://localhost:8000/img/products/';
  /* STATES */
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [targetProduct, setTargetProduct] = useState(null); // Target to edit or delete

  /* UTILS */
  const fetchProductsData = () => {
    ProductService.getData().then((data) => {
      const updatedData = data.map((product) => ({
        ...product,
        available: product.quantity > 0
      }));
      setProducts(updatedData);
    });
  };

  // check if images already has a complete URL (laravel factory generated) or if has just a name and need to be concatenated with the base URL
  const solveTypeOfImage = (image) => {
    if (image.includes("http")){
      return image;
    }
    return `${cdnProductUrl}/${image}`;
  }

  /* LIFECYCLE */
  useEffect(() => {
    setTargetProduct(ProductService.getBaseObject());
    fetchProductsData();
  }, []);

  return (
      <BasePage fabShow fabCallback={() => {
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
          <InputGroup className="mb-3">
            <Form.Control value={searchQuery} onChange={(e) => {
              setSearchQuery(e.target.value)
            }} placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start" onClick={() => {
              ProductService.search(searchQuery).then((response) => {
                setProducts(response);
              });
            }
            }>
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
                            available={product.quantity > 0}
                            image={solveTypeOfImage(product.image)}
                            onClick={() => {
                              setTargetProduct(product);
                              setIsOpenUpdateModal(true);
                            }}
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
          <UpdateProductModal
              service={ProductService}
              isOpen={isOpenUpdateModal}
              setTargetProduct={setTargetProduct}
              productObj={targetProduct}
              handleDelete={(productObj) => {
                setTargetProduct(productObj);
                setIsOpenDeleteModal(true);
              }}
              handleClose={() => {
                setIsOpenUpdateModal(false);
                fetchProductsData();
              }}
          />
          <DeleteClientModal
              service={ProductService}
              isOpen={isOpenDeleteModal}
              setTargetProduct={setTargetProduct}
              productObj={targetProduct}
              handleClose={() => {
                setIsOpenDeleteModal(false);
                setIsOpenUpdateModal(false);
                fetchProductsData();
              }}
          />
        </div>
      </BasePage>
  );
}
