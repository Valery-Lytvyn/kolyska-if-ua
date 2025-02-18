"use client";
import { Offer } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { YmlCatalog } from "@/types/types";
import { categories } from "@/lib/data";

const initialData = {
  $: {
    id: "",
    available: "",
  },
  price: "",
  currencyId: "",
  categoryId: "",
  picture: "",
  name: "",
  vendor: "",
  vendorCode: "",
  description: "",
  barcode: "",
};

const Delivery: React.FC = () => {
  const [data, setData] = useState<Offer[]>([initialData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/convertXmlToJson", {
          responseType: "json",
        });
        const data: YmlCatalog = response.data;
        // const categories = data.yml_catalog.shop.categories?.category?.map(
        //   (category) => ({
        //     categoryId: category.$.id,
        //     name: category._,
        //   })
        // );

        // console.log(categories);

        setData(data.yml_catalog.shop.offers.offer);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <h1>Converted JSON Data</h1> */}
      {!!data.length && (
        <div>
          {categories.map(({ categoryName }) => (
            <h2 key={categoryName}>{categoryName}</h2>
          ))}
        </div>
      )}
    </div>
  );
};

export default Delivery;
