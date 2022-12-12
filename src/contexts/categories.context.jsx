import React, { createContext, useEffect} from "react";
import { useState } from "react";
import { addCollectionAndDocuments } from "../config/firebase";
import { getCategoriesAndDocuments } from "../config/firebase";
//import PRODUCTS from '../api/shop-data.json';
import SHOP_DATA from '../api/shop-data';

export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider= ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    /*useEffect(() => {
        //debugger;
        console.log('What is => ', SHOP_DATA);
        addCollectionAndDocuments('categories', SHOP_DATA);
    },[]);*/
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log('the map => ', categoryMap);
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    },[]);
    const value = {categoriesMap};

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}