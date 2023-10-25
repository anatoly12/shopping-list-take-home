import { Layout, Typography } from "antd";
import "./shoppingList.css";
import EmptyList from "../emptyList/emptyList";
import AddItemModal, { formValuesType } from "../addItemModal/addItemModal";
import { useEffect, useRef, useState } from "react";

const initialFormValues = {
  itemName: "",
  description: "",
  quantity: null,
  purchased: false,
};
const ShoppingList = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [formValues, setFormValues] =
    useState<formValuesType>(initialFormValues);
  const selectRef = useRef();
  const { Header } = Layout;

  useEffect(() => {
    console.log("formValues ", formValues);
  }, [formValues]);

  const handleAddTask = () => {
    // setOpenAddModal(false);
    // fetch("/add-item", {
    //   method: "POST",
    //   body: JSON.stringify(formValues)
    // })
  };

  const handleCancel = () => {
    setOpenAddModal(false);
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
      />
    </Layout>
  );
};

export default ShoppingList;
