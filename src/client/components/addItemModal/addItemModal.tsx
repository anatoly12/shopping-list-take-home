import { Button, Checkbox, Input, Modal, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./addItemModal.css";
import { formValuesType } from "../shoppingLayout/shoppingLayout";

interface addItemModalProps {
  open: boolean;
  onAddTask: () => void;
  onCancel: () => void;
  onInputChange: (e: any) => void;
  handleTextAreaChange: (e: any) => void;
  onSelectChange: (val: number) => void;
  formValues: formValuesType;
  onCheckboxChange?: () => void;
  heading?: string;
  subHeading?: string;
  actionButtonText?: string;
  selectRef: any;
  fieldError: boolean;
}

const selectOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
];

const AddItemModal = ({
  open,
  onAddTask,
  onCancel,
  onInputChange,
  handleTextAreaChange,
  onSelectChange,
  onCheckboxChange,
  heading = "Add an Item",
  subHeading = "Add your new item below",
  actionButtonText = "Add Task",
  selectRef,
  formValues,
  fieldError,
}: addItemModalProps) => {
  return (
    <Modal
      open={open}
      title="SHOPPING LIST"
      onOk={onAddTask}
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
          onClick={onAddTask}
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
        <Checkbox onChange={onCheckboxChange} className="checkbox">
          Purchased
        </Checkbox>
      )}
    </Modal>
  );
};

export default AddItemModal;
