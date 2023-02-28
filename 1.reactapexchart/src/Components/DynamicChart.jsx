import React, { useEffect } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const DynamicChart = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [],
      },
      fill: {
        color: [],
      },
      plotOptions: {
        bar: {
          horizontal: false,
          database: {
            position: "top",
          },
        },
      },
    },
    series: [
      {
        name: "price",
        data: [],
        type: "column",
        color: "#FF0000",
      },
      {
        name: "discountPercentage",
        data: [],
        type: "column",
        color: "#06a37c",
      },
      {
        name: "rating",
        data: [],
        type: "column",
        color: "#2b088d",
      },
      {
        name: "stock",
        data: [],
        type: "line",
        color: "#16ca2e",
      },
    ],
  });

  useEffect(() => {
    const price = [];
    const name = [];
    const rating = [];
    const discountPercentage = [];
    const stock = [];
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        response.data.products.map((product) => {
          price.push(product.price);
          name.push(product.brand);
          rating.push(product.rating);
          discountPercentage.push(product.discountPercentage);
          stock.push(product.stock);
          console.log(product);
        });
        setState({
          options: {
            chart: {
              id: "apexchart-example",
            },
            xaxis: {
              categories: name,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                database: {
                  position: "top",
                },
              },
            },
          },
          series: [
            // {
            //   name: "price",
            //   data: price,
            //   type: "line",
            //   color: "#FF0000",
            // },
            {
              name: "discountPercentage",
              data: discountPercentage,
              type: "column",
              color: "#06a37c",
            },
            {
              name: "rating",
              data: rating,
              type: "column",
              color: "#2b088d",
            },
            {
              name: "stock",
              data: stock,
              type: "column",
              color: "#16ca2e",
            },
          ],
        });
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ color: "teal" }}>Dynamic ApexChart With API</h1>
      <br />
      <br />
      <ReactApexChart
        options={state.options}
        series={state.series}
        height={350}
      />
    </div>
  );
};

export default DynamicChart;
