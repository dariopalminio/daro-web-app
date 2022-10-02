import React, { ReactNode } from "react";
import styled from "styled-components";


export const LiSelectOption = styled.li`
  background-color: #ffffff;
  padding: 6px 20px;
  border-bottom: 1px solid #e4e4e4;
  cursor: pointer;
  list-style-type: none;
  &:hover {
    background-color: #d9d9d9;
  }
`;

const Opts: React.FC<{
  children: ReactNode | ReactNode[];
  value: string;
  changeSelectedOption: (valueSelected: string) => void;
}> = ({ children, value, changeSelectedOption }) => {

  return (
    <LiSelectOption onClick={() => changeSelectedOption(value)}>
      {children}
    </LiSelectOption>
  );
};

export default Opts;