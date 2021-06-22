import React, {createContext, useState, useEffect} from 'react';
import cafeApi from '../api/CafeApi';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: (limit?: number) => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (productId: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setproducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (limit = 50) => {
    let {data} = await cafeApi.get<ProductsResponse>(
      `productos?limite=${limit}`,
    );
    setproducts([...data.productos]);
    // setproducts([...products, ...data.productos]);
  };
  const addProduct = async (categoryId: string, productName: string) => {};
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};
  const deleteProduct = async (productId: string) => {};
  const loadProductById = async (productId: string) => {
    throw new Error('not implemented');
  };
  const uploadImage = async (data: any, id: string) => {};

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
