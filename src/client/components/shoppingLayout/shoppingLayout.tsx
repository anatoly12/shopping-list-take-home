import { Layout, Typography } from "antd";
import "./shoppingLayout.css";
import AddItemModal from "../addItemModal/addItemModal";
import { useEffect, useRef, useState } from "react";
import Loader from "../loader/loader";
import ShoppingList from "../shoppingList/shopppingList";
import EmptyList from "../emptyList/emptyList";

export type formValuesType = {
  itemName: string;
  description: string;
  quantity: number | null;
  purchased?: boolean;
  _id?: string;
};

const initialFormValues = {
  itemName: "",
  description: "",
  quantity: null,
  purchased: false,
};
const ShoppingLayout = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState<formValuesType[]>([]);
  const [formValues, setFormValues] =
    useState<formValuesType>(initialFormValues);
  const selectRef = useRef();
  const { Header } = Layout;

  const getShoppingList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/shopping-list");
      const data = await response.json();
      console.log("list data response ", data);
      setListData(data);
    } catch (err) {
      console.log("Error in fetching List ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  const handleAddTask = async () => {
    if (
      !formValues.itemName ||
      !formValues.description ||
      !formValues.quantity
    ) {
      setError(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        cache: "no-cache",
        mode: "cors",
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      handleCancel();
      console.log("Response in adding Item", data);
    } catch (err) {
      console.log("Error in adding Item", err);
    } finally {
      getShoppingList();
    }
  };

  const handleCancel = () => {
    setOpenAddModal(false);
    setError(false);
    setFormValues(initialFormValues);
  };

  const openModal = () => {
    setOpenAddModal(true);
  };

  const handleSelectChange = (val: number) => {
    const values = { ...formValues };
    values.quantity = val;
    setFormValues(values);
  };

  const handleInputChange = (e: any) => {
    const values = { ...formValues };
    values.itemName = e.target.value;
    setFormValues(values);
  };

  const handleTextAreaChange = (e: any) => {
    const values = { ...formValues };
    values.description = e.target.value;
    setFormValues(values);
  };

  return (
    <Layout>
      <Header className="shopping-navbar">
        <Typography.Text className="nav-title">Shopping List</Typography.Text>
      </Header>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {listData.length > 0 ? (
            <ShoppingList listData={listData} />
          ) : (
            <>
              <EmptyList openModal={openModal} />
              <AddItemModal
                open={openAddModal}
                onAddTask={handleAddTask}
                onCancel={handleCancel}
                onInputChange={handleInputChange}
                handleTextAreaChange={handleTextAreaChange}
                onSelectChange={handleSelectChange}
                formValues={formValues}
                selectRef={selectRef}
                fieldError={error}
              />
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default ShoppingLayout;
