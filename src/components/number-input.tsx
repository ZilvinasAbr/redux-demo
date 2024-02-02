import { Input } from './ui/input';

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export const NumberInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
}: Props) => {
  return (
    <Input
      id={id}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(event) => {
        const newValue = event.target.value;
        // Regular expression to check if the string contains only digits
        if (/^\d*$/.test(newValue)) {
          onChange(newValue);
        }
      }}
    />
  );
};
