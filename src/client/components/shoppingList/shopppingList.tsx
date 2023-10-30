import { Button, Typography } from "antd";
import "./shoppingList.css";
import ItemCard from "../itemCard/itemCard";
import { formValuesType } from "../shoppingLayout/shoppingLayout";

interface ShoppingListProps {
  listData: formValuesType[];
  onUpdateOnCheckBoxChange: (e: any, id: string) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (id: string) => void;
  onOpenDeleteModal: (id: string) => void;
}

const ShoppingList = ({
  listData,
  onUpdateOnCheckBoxChange,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal,
}: ShoppingListProps) => {
  return (
    <div className="shopping-list-container">
      <div className="list-heading-wrapper">
        <Typography.Text className="list-heading">Your Items</Typography.Text>
        <Button
          type="primary"
          className="add-item-btn"
          onClick={onOpenAddModal}
        >
          Add Item
        </Button>
      </div>
      {listData.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onUpdateOnCheckBoxChange={onUpdateOnCheckBoxChange}
          onOpenEditModal={onOpenEditModal}
          onOpenDeleteModal={onOpenDeleteModal}
        />
      ))}
    </div>
  );
};

export default ShoppingList;
