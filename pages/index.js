"use client";
import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { cloneDeep, differenceWith, isEqual} from "lodash";
import { useMemo, useState } from "react";

const data = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

export default function Home() {
  const [selectItem, setSelectItem] = useState([]);

  const dataList = useMemo(() => {
    if (data == null || data?.length === 0) return [];

    const checkData = differenceWith(data, selectItem, isEqual);

    return checkData;
  }, [selectItem]);

  const currentData = useMemo(() => {
    if (selectItem == null) return [];

    return selectItem;
  }, [selectItem]);

  const dataFruit = useMemo(() => {
    if (currentData == null || currentData?.length === 0) return [];

    const findData = currentData?.filter((e) => e?.type === "Fruit");

    return findData;
  }, [currentData]);

  const dataVegetable = useMemo(() => {
    if (currentData == null || currentData?.length === 0) return [];

    const findData = currentData?.filter((e) => e?.type === "Vegetable");

    return findData;
  }, [currentData]);

  const handleSelectItem = (data) => {
    setSelectItem((pre) => [...pre, data]);
  };

  const handleRemoveItem = (data) => {
    let newData = cloneDeep(currentData);
    const index = newData?.findIndex((e) => e?.name === data?.name);

    newData = [...newData?.slice(0, index), ...newData?.slice(index + 1)];

    setSelectItem([...newData]);
  };

  return (
    <div className="p-5 min-h-[calc(100vh-50px)]">
      <Card className="bg-neutral-200 h-full">
        <Row gutter={[8, 8]}>
          <Col xl={8} md={8} xs={24}>
            <Card title="All List" className="h-[calc(100vh-80px)]">
              {dataList?.map((item, index) => {
                return (
                  <Card
                    key={index}
                    styles={{ body: { padding: 12 } }}
                    className="mb-2 cursor-pointer"
                    onClick={() => handleSelectItem(item)}
                    hoverable
                  >
                    <Typography.Text>{item?.name || "N/A"}</Typography.Text>
                  </Card>
                );
              })}
            </Card>
          </Col>
          <Col xl={8} md={8} xs={24}>
            <Card
              title="Fruit"
              className="min-h-[calc(100vh-80px)] cursor-pointer"
              onClick={() =>
                handleRemoveItem(
                  dataFruit?.[
                    dataFruit?.length - 1 === -1 ? 0 : dataFruit?.length - 1
                  ]
                )
              }
            >
              {dataFruit?.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className="mb-2"
                    styles={{ body: { padding: 12 } }}
                    // onClick={() => handleRemoveItem(item)}
                  >
                    <Typography.Text>{item?.name || "N/A"}</Typography.Text>
                  </Card>
                );
              })}
            </Card>
          </Col>
          <Col xl={8} md={8} xs={24}>
            <Card
              title="Vegetable"
              className="min-h-[calc(100vh-80px)] cursor-pointer"
              onClick={() =>
                handleRemoveItem(
                  dataVegetable?.[
                    dataVegetable?.length - 1 === -1 ? 0 : dataVegetable?.length - 1
                  ]
                )
              }
            >
              {dataVegetable?.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className="mb-2"
                    styles={{ body: { padding: 12 } }}
                    // onClick={() => handleRemoveItem(item)}
                  >
                    <Typography.Text>{item?.name || "N/A"}</Typography.Text>
                  </Card>
                );
              })}
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
