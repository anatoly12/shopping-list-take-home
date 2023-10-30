import { Button, Checkbox, Input, Modal, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./itemModal.css";
import { formValuesType } from "../shoppingLayout/shoppingLayout";

interface ItemModalProps {
  open: boolean;
  onActionClick: () => void;
  onCancel: () => void;
  onInputChange: (e: any) => void;
  handleTextAreaChange: (e: any) => void;
  onSelectChange: (val: number) => void;
  formValues: formValuesType;
  onCheckboxChange?: (e: any) => void;
  heading: string;
  subHeading: string;
  actionButtonText: string;
  selectRef: any;
  fieldError: boolean;
}

const selectOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
];

const ItemModal = ({
  open,
  onActionClick,
  onCancel,
  onInputChange,
  handleTextAreaChange,
  onSelectChange,
  onCheckboxChange,
  heading,
  subHeading,
  actionButtonText,
  selectRef,
  formValues,
  fieldError,
}: ItemModalProps) => {
  return (
    <Modal
      open={open}
      title="SHOPPING LIST"
      onOk={onActionClick}
      onCancel={onCancel}
      className="modal"
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
          {actionButtonText}
        </Button>,
      ]}
    >
      <div className="headingWrapper">
        <Typography.Text className="heading">{heading}</Typography.Text>
        <Typography.Text className="sub-heading">{subHeading}</Typography.Text>
      </div>
      <Input
        placeholder="Item Name"
        className="input"
        onChange={onInputChange}
        value={formValues.itemName}
        status={fieldError && !formValues.itemName ? "error" : ""}
      />
      <TextArea
        placeholder="Description"
        rows={6}
        maxLength={100}
        showCount
        className="description"
        onChange={handleTextAreaChange}
        value={formValues.description}
        status={fieldError && !formValues.description ? "error" : ""}
      />
      <Select
        style={{ width: 120 }}
        placeholder="How many?"
        onChange={onSelectChange}
        options={selectOptions}
        className="select"
        ref={selectRef}
        value={formValues.quantity}
        status={fieldError && !formValues.quantity ? "error" : ""}
      />
      {onCheckboxChange && (
        <Checkbox
          onChange={onCheckboxChange}
          className="checkbox"
          checked={formValues.purchased}
        >
          Purchased
        </Checkbox>
      )}
    </Modal>
  );
};

export default ItemModal;
