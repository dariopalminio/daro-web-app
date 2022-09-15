import "./quantity-btn.css";


const QuantityBtn = ({ value, onChange }: any) => {

  const handlerQtyminus = () => {
    let newValue: number = parseInt(value);
    if (value>0) newValue = (parseInt(value) - 1);
    onChange(newValue);
  };

  const handlerQtyplus = () => {
    const newValue = (parseInt(value) + 1);
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

export default QuantityBtn;