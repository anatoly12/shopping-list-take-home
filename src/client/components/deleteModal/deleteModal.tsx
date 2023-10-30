import { Button, Modal, Typography } from "antd";
import "./deleteModal.css";

interface DeleteModalProps {
  open: boolean;
  onActionClick: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ open, onActionClick, onCancel }: DeleteModalProps) => {
  return (
    <Modal
      open={open}
      title="Delete Item?"
      onOk={onActionClick}
      onCancel={onCancel}
      className="delete-modal"
      style={{ top: 184 }}
      footer={[
        <Button key="cancel" className="cancel-btn" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="action"
          type="primary"
          className="action-btn"
          onClick={onActionClick}
        >
          Delete
        </Button>,
      ]}
    >
      <Typography.Text className="sub-heading">
        Are you sure you want to delete this item? This can not be undone.
      </Typography.Text>
    </Modal>
  );
};

export default DeleteModal;
