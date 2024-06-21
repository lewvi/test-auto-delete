"use client";
import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { cloneDeep, differenceWith, isEqual } from "lodash";
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

const CardListContent = ({ title, data, onSelectItem, remove = false }) => {
  return (
    <Card title={title || "Title"} className="min-h-[calc(100vh-80px)] h-full">
      {data?.map((item, index) => {
        return (
          <Card
            key={index}
            styles={{ body: { padding: 16 } }}
            className="mb-2 cursor-pointer"
            onClick={() => onSelectItem(item)}
            hoverable
          >
            <Row>
              <Col span={12}>
                <Typography.Text>{item?.name || "N/A"}</Typography.Text>
              </Col>
              <Col span={12} className="flex justify-end">
                {remove ? (
                  <Button type="link" size="small" children="Remove" danger/>
                ) : (
                  <Button type="link" size="small" children="Select" />
                )}
              </Col>
            </Row>
          </Card>
        );
      })}
    </Card>
  );
};

const Home = () => {
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
        <Row gutter={[12, 8]}>
          <Col xl={8} md={8} xs={24}>
            <CardListContent
              title="All List"
              data={dataList || []}
              onSelectItem={handleSelectItem}
            />
          </Col>
          <Col xl={8} md={8} xs={24}>
            <CardListContent
              title="Fruit"
              data={dataFruit || []}
              onSelectItem={handleRemoveItem}
              remove
            />
          </Col>
          <Col xl={8} md={8} xs={24}>
            <CardListContent
              title="Vegetable"
              data={dataVegetable || []}
              onSelectItem={handleRemoveItem}
              remove
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Home;
