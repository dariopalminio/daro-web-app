import React from "react";
import "./select-list.css";

import { RiDeleteBin7Fill} from "react-icons/ri";

/**
<div>
<ul class="select-list-ul">
  <li class="select-list-li">Coffee<span class="select-list-delete" aria-hidden="true">&times;</span></li>
  <li class="select-list-li">Tea<span class="select-list-delete" aria-hidden="true">&times;</span></li>
  <li class="select-list-li">Coca Cola
        <span class="select-list-delete" aria-hidden="true">&times;</span>		
        </li>
</ul>
</div>
 */

interface Props {
    id: string;
    label?: string;
    onClickSelect?: (index: number) => void;
    onClickDelete: (index: number) => void;
    style?: any;
    list: string[];
}

const SelectList: React.FC<Props> = ({ id, label, list, onClickSelect, onClickDelete, style }) => {

    const selectItem = (index: number) => {
        onClickSelect && onClickSelect(index);
    }

    const deleteItem = (index: number) => {
        onClickDelete(index);
    }

    return (
        <div className="select-list-group">
            {label && <label className='label-select-list'>{label}</label>}
            <ul className="select-list-ul">
                {list.map((item: string, index: number) => {
                    return (
                        <li className="select-list-li"
                            onClick={() => selectItem(index)}>{item}
                            <span className="select-list-delete"
                                aria-hidden="true"
                                onClick={() => deleteItem(index)}>
                                    <RiDeleteBin7Fill onClick={() => deleteItem(index)} size={20}/>
                                </span>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    );
};

export default SelectList;