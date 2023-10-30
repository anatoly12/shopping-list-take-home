import { Button, Typography } from "antd";
import "./emptyList.css";

interface EmptyListProps {
  onOpenAddModal: () => void;
}
const EmptyList = ({ onOpenAddModal }: EmptyListProps) => {
  return (
    <div className="empty-list-container">
      <div className="message-box">
        <Typography.Text className="message">
          {"Your shopping list is empty :("}
        </Typography.Text>
        <Button
          type="primary"
          className="add-item-btn"
          onClick={onOpenAddModal}
        >
          Add your first item
        </Button>
      </div>
    </div>
  );
};

export default EmptyList;
