import React, {createContext, useState, useEffect} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import cafeApi from '../api/CafeApi';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: (limit?: number) => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
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
  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const {data} = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setproducts([...products, data]);

    return data;
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const {data} = await cafeApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setproducts(
      products.map(prod => {
        return prod._id === productId ? data : prod;
      }),
    );
  };
  const deleteProduct = async (productId: string) => {};
  const loadProductById = async (productId: string): Promise<Producto> => {
    const {data} = await cafeApi.get<Producto>(`/productos/${productId}`);

    return data;
  };
  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    let {uri, type, fileName} = data.assets[0];
    const fileToUpload = {
      uri,
      type,
      name: fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      let res = await cafeApi.put(`/uploads/productos/${id}`, formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
