import { FC, useRef, useState } from "react";
import { useOutSideClick } from "../hooks/useOutsideClick";

type SelectProps = {
  options: any[];
  setValue: (val: string) => void;
};

const Select: FC<SelectProps> = ({ options, setValue }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  const selectRef = useRef<HTMLUListElement>(null);

  const { isOutsideClick } = useOutSideClick(selectRef.current as HTMLElement);

  const handleChange = (option: any) => {
    setValue(option.value);
    setSelectedOption(option.label);
    setOpen(!open);
  };

  const handleOpenState = (open: boolean) => setOpen(open);

  return (
    <section className="relative my-10">
      <ul
        ref={selectRef}
        className={`absolute border-[1px] cursor-pointer  
      input-control w-full py-1 bg-opacity-100 hover:bg-opacity-100 bg-slate-700  px-0 h-10 overflow-hidden
      ${open && !isOutsideClick ? "h-auto" : "h-10"}
      `}
      >
        <li
          onClick={() => handleOpenState(!open)}
          className="flex justify-between px-3  items-center"
        >
          <p>{selectedOption ? selectedOption : "Select Quiz Category"}</p>
          <span className="text-2xl">{open ? "-" : "+"}</span>
        </li>
        {options?.map((option) => (
          <li
            className="hover:bg-black px-3 py-2"
            key={option.id}
            onClick={() =>
              handleChange({ value: option.id, label: option.name })
            }
          >
            {option.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Select;
