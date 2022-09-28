import styled from "styled-components";

//Styled-components
const QtyContainer = styled.div`
    display: flex;
    text-align: center;
    padding: 5px;
    margin: 2%;
    justify-content: center;
    `;

const InputQtyPlus = styled.input`
    width: 30px;
    height: 30px;
    background-color: rgb(235, 235, 235);
    border: 0px;
    cursor: pointer;
    &:hover {
      background-color: rgb(140, 195, 231);
    }
  `;

const InputQtyMinus = styled.input`
    width: 30px;
    height: 30px;
    background-color: rgb(235, 235, 235);
    border: 0px;
    cursor: pointer;
    &:hover {
      background-color: rgb(140, 195, 231);
    }
  `;

const InputQty = styled.input`
    width: 40px;
    height: 26px;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(206, 206, 206);
  `;

interface Props {
  value: number;
  onChange: (newQuantityValue: number) => void;
}

/**
 * Customized button for quantity number selection
 */
const ButtonQuantity: React.FC<Props> = ({ value, onChange }) => {

  const handlerQtyminus = () => {
    let newValue: number = value;
    if (value>0) newValue = (value - 1);
    onChange(newValue);
  };

  const handlerQtyplus = () => {
    const newValue = (value + 1);
    onChange(newValue);
  };

  return (
    <QtyContainer>
      <InputQtyMinus type='button' value='-' onClick={() => handlerQtyminus()} />
      <InputQty type='text' name='quantity' value={value} />
      <InputQtyPlus type='button' value='+' onClick={() => handlerQtyplus()} />
    </QtyContainer>
  );
};

export default ButtonQuantity;