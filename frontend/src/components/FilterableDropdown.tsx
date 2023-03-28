import { Children, useState, forwardRef, isValidElement } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownMenuProps } from "react-bootstrap/DropdownMenu";
import Form from "react-bootstrap/Form";

interface FilterableDropdownProps {
  buttonTitle?: string;
  items: { key: string; value: string }[];
  onItemSelection: (key: string, value: string) => void;
}

export default function FilterableDropdown({
  buttonTitle = "Select an item",
  items,
  onItemSelection,
}: FilterableDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="filterable-dropdown">{buttonTitle}</Dropdown.Toggle>
      <Dropdown.Menu
        as={CustomMenu}
        style={{ maxHeight: "500px", overflowY: "scroll" }}
      >
        {items.map((element) => (
          <Dropdown.Item
            eventKey={element.key}
            key={element.key}
            onClick={() => {
              onItemSelection(element.key, element.value);
            }}
          >
            {element.value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const CustomMenu = forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
    }: DropdownMenuProps,
    ref: any
  ) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {Children.toArray(children).filter(
            (child) =>
              !value ||
              (isValidElement(child) &&
                child.props.children
                  .toLowerCase()
                  .includes(value.toLowerCase()))
          )}
        </ul>
      </div>
    );
  }
);
