import { Layout, Typography } from "antd";
import "./shoppingLayout.css";
import { useEffect, useRef, useState } from "react";
import Loader from "../loader/loader";
import ShoppingList from "../shoppingList/shopppingList";
import EmptyList from "../emptyList/emptyList";
import ItemModal from "../itemModal/itemModal";
import DeleteModal from "../deleteModal/deleteModal";

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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [idToDeleteItem, setIDToDeleteItem] = useState<string | null>(null);
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

  const handleActionClick = async () => {
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
      const response = await fetch(
        openEditModal
          ? "http://localhost:3000/update-item"
          : "http://localhost:3000/add-item",
        {
          method: openEditModal ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          cache: "no-cache",
          mode: "cors",
          body: JSON.stringify(formValues),
        }
      );
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
    setOpenEditModal(false);
    setError(false);
    setFormValues(initialFormValues);
    setIDToDeleteItem(null);
    setOpenDeleteModal(false);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleOpenEditModal = (id: string) => {
    setOpenEditModal(true);
    const values = listData.find((d) => d._id === id);
    if (values) {
      setFormValues(values);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setOpenDeleteModal(true);
    setIDToDeleteItem(id);
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

  const handleCheckBoxChange = (e: any) => {
    const values = { ...formValues };
    values.purchased = e.target.checked;
    setFormValues(values);
  };

  const handleUpdateOnCheckBoxChange = async (e: any, id: string) => {
    try {
      const data = listData.find((d) => d._id === id);
      const dataIndex = listData.findIndex((d) => d._id === id);
      if (data) {
        data.purchased = e.target.checked;
        const list = [...listData];
        list.splice(dataIndex, 1, data);
        setListData(list);
        const response = await fetch("http://localhost:3000/update-item", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          cache: "no-cache",
          mode: "cors",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log("response in updating item ", res);
      }
    } catch (err) {
      console.log("Error in updating item ", err);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/delete-item?id=${idToDeleteItem}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          cache: "no-cache",
          mode: "cors",
        }
      );
      const list = listData.filter((d) => d._id !== idToDeleteItem);
      setListData(list);
      handleCancel()
      const res = await response.json();
      console.log("Response in deleting item ", res);
    } catch (err) {
      console.log("Error Deleting item ", err);
    }
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
            <ShoppingList
              listData={listData}
              onUpdateOnCheckBoxChange={handleUpdateOnCheckBoxChange}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
              onOpenDeleteModal={handleOpenDeleteModal}
            />
          ) : (
            <EmptyList onOpenAddModal={handleOpenAddModal} />
          )}
          <ItemModal
            open={openAddModal || openEditModal}
            onActionClick={handleActionClick}
            onCancel={handleCancel}
            onInputChange={handleInputChange}
            handleTextAreaChange={handleTextAreaChange}
            onCheckboxChange={openEditModal ? handleCheckBoxChange : undefined}
            onSelectChange={handleSelectChange}
            formValues={formValues}
            selectRef={selectRef}
            fieldError={error}
            heading={openEditModal ? "Edit an Item" : "Add an Item"}
            subHeading={
              openEditModal ? "Edit your item below" : "Add your new item below"
            }
            actionButtonText={openEditModal ? "Save Item" : "Add Task"}
          />
          <DeleteModal
            open={openDeleteModal}
            onActionClick={handleDeleteItem}
            onCancel={handleCancel}
          />
        </>
      )}
    </Layout>
  );
};

export default ShoppingLayout;
