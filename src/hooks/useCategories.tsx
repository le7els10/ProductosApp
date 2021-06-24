import {useEffect, useState} from 'react';
import cafeApi from '../api/CafeApi';
import {Categoria, CategoriesResponse} from '../interfaces/appInterfaces';

const useCategories = () => {
  const [isLoading, setisLoading] = useState(true);
  const [categories, setcategories] = useState<Categoria[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let {data} = await cafeApi.get<CategoriesResponse>('/categorias');
    setcategories(data.categorias);
    setisLoading(false);
  };

  return {
    isLoading,
    categories,
  };
};

export default useCategories;
