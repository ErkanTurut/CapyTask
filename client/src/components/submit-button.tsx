import { FC } from "react";
import { Button } from "./ui/button";
//@ts-ignore
import { useFormStatus } from "react-dom";

interface submitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SubmitButton: FC<submitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {children}
      <span className="sr-only"> {children} </span>
    </Button>
  );
};

export default SubmitButton;
