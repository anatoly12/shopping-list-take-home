import { Layout, Typography } from "antd";
import "./shoppingList.css";
import EmptyList from "../emptyList/emptyList";
import AddItemModal from "../addItemModal/addItemModal";
import { useState } from "react";

const ShoppingList = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { Header } = Layout;

  const handleAddTask = () => {
    setOpenAddModal(false);
  };

  const handleCancel = () => {
    setOpenAddModal(false);
  };
  const openModal = () => {
    setOpenAddModal(true);
  };
  const handleSelectChange = () => {

  }

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
        onSelectChange={handleSelectChange}
      />
    </Layout>
  );
};

export default ShoppingList;
