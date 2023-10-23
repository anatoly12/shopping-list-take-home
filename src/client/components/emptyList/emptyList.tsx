import { Button, Typography } from "antd";
import "./emptyList.css";

interface EmptyListProps {
  openModal: () => void;
}
const EmptyList = ({ openModal }: EmptyListProps) => {
  return (
    <div className="empty-list-container">
      <div className="message-box">
        <Typography.Text className="message">
          {"Your shopping list is empty :("}
        </Typography.Text>
        <Button type="primary" className="add-item-btn" onClick={openModal}>
          Add your first item
        </Button>
      </div>
    </div>
  );
};

export default EmptyList;
