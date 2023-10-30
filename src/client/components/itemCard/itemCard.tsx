import { Checkbox, Typography } from "antd";
import "./itemCard.css";
import { formValuesType } from "../shoppingLayout/shoppingLayout";

interface ItemCardProps {
  item: formValuesType;
  onUpdateOnCheckBoxChange: (e: any, id: string) => void;
  onOpenEditModal: (id: string) => void;
  onOpenDeleteModal: (id: string) => void;
}

const ItemCard = ({
  item,
  onUpdateOnCheckBoxChange,
  onOpenEditModal,
  onOpenDeleteModal,
}: ItemCardProps) => {
  return (
    <div className="item-card">
      <div className="card-info-wrapper">
        <Checkbox
          onChange={(e) => onUpdateOnCheckBoxChange(e, item._id as string)}
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
            Qty: {item.quantity}
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
        <span
          className="material-symbols-outlined pointer"
          onClick={() => onOpenEditModal(item._id as string)}
        >
          edit
        </span>
        <span
          className="material-symbols-outlined ml-20 pointer"
          onClick={() => onOpenDeleteModal(item._id as string)}
        >
          delete
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
