import "./button-quantity.css";

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
    <div className='qty_div'>
      <input type='button' value='-' className='qtyminus minus' onClick={() => handlerQtyminus()} />
      <input type='text' name='quantity' value={value} className='qty' />
      <input type='button' value='+' className='qtyplus plus' onClick={() => handlerQtyplus()} />
    </div>
  );
};

export default ButtonQuantity;