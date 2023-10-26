import { Checkbox, Typography } from "antd";
import "./itemCard.css";
import { formValuesType } from "../shoppingLayout/shoppingLayout";

interface ItemCardProps {
  item: formValuesType;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className="item-card">
      <div className="card-info-wrapper">
        <Checkbox
          onChange={() => {}}
          className="checkbox"
          checked={item.purchased}
        />
        <div className="card-info">
          <Typography.Text
            className={item.purchased ? "item-name-stroke" : "item-name"}
          >
            {item.itemName}
          </Typography.Text>
          <Typography.Text
            className={
              item.purchased ? "item-description-stroke" : "item-description"
            }
          >
            {item.description}
          </Typography.Text>
        </div>
      </div>
      <div className="card-actions-wrapper">
        <span className="material-symbols-outlined pointer">edit</span>
        <span className="material-symbols-outlined ml-20 pointer">delete</span>
      </div>
    </div>
  );
};

export default ItemCard;
