import { Button, Typography } from "antd";
import "./shoppingList.css";
import ItemCard from "../itemCard/itemCard";
import { formValuesType } from "../shoppingLayout/shoppingLayout";

interface ShoppingListProps {
  listData: formValuesType[];
}

const ShoppingList = ({ listData }: ShoppingListProps) => {
  return (
    <div className="shopping-list-container">
      <div className="list-heading-wrapper">
        <Typography.Text className="list-heading">Your Items</Typography.Text>
        <Button type="primary" className="add-item-btn">
          Add Item
        </Button>
      </div>
      {listData.map((item) => (
        <ItemCard key={item._id} item={item}/>
      ))}
    </div>
  );
};

export default ShoppingList;
