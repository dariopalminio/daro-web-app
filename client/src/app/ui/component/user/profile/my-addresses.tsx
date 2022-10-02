import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Address } from "../../../../../domain/model/user/address.type";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory"
import Button from "../../../common/button/button";
import useModalDialog from "../../../common/dialog/use-modal-dialog";
import ModalDialog from "../../../common/dialog/modal-dialog";
import TextField from "../../../common/text-field/text-field";
import SelectList from "../../../common/select-list/select-list";
import NewAddressDialog from "./new-address-dialog";
import { CenteringContainer } from "../../../common/elements/centering-container";


const initialNewAddress: Address = {
    street: '',
    department: '',
    neighborhood: '',
    city: '',
    state: '',
    country: ''
};

interface IMyProps {
    addresses: Array<Address>,
    onChange: (newAddresses: Array<any>) => void //is used as: onChange={(newAddresses: Array<any>) => handleAddClose(newAddresses)}
}

/**
 * My Address component
 * 
 * Pattern: Presentation Component, Controled Component 
 */
const MyAddresses: React.FC<IMyProps> = (props: IMyProps) => {

    const { addresses, onChange } = props;
    const { t } = useTranslation();
    const [myAddresses, setMyAddresses] = useState<Array<Address>>(addresses);
    const { isDialogOpen, toggle } = useModalDialog();
    const [newAddress, setNewAddress] = React.useState(initialNewAddress);

    const convertAddressOneLine = (address: any) => {
        return address.street + " " + address.department;
    };

    const getStrinArrayAddresses = () => {
        const stringArray: string[] = myAddresses.map((address: any, index: number) => convertAddressOneLine(address));
        return stringArray;
    }

    const handleClickOpen = () => {
        toggle();
    };
/**
const removeFromCart = (id: string) => {
        setCartItems((currentCart) => {
            const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.itemId === id);

            if (indexOfItemToRemove === -1) {
                return currentCart;
            }
            const newCartItems = [
                ...currentCart.slice(0, indexOfItemToRemove),
                ...currentCart.slice(indexOfItemToRemove + 1),
            ];
            saveCart(newCartItems);
            return newCartItems;
        });
 */
    const handleDeleteAddress = async (index: number) => {
        const arrayOfAddresses: Array<Address> = myAddresses;
        arrayOfAddresses.splice(index, 1); //delete element of index
        setMyAddresses(arrayOfAddresses);
        onChange(myAddresses); //set addresses array in parent
    };

    const handleAddNewAddressAndClose = () => {
        const arrayOfAddresses: Array<Address> = myAddresses;
        arrayOfAddresses.push(newAddress);
        setMyAddresses(arrayOfAddresses);
        toggle();
        onChange(myAddresses); //set addresses array in parent
        setNewAddress(initialNewAddress);
    };

    const handleNewAddressChange = (newAddress: any) => {
        setNewAddress(newAddress);
    };

    const handleCloseNewAddressDialog = () => {
        toggle();
        setNewAddress(initialNewAddress);
    };

    return (
        <div>
            <h1>
                {t('my.addresses.title')}
            </h1>
            <div style={{textAlign: "left"}}>
                <SelectList
                    id="mySelectList"
                    label="Tus direcciones:"
                    list={getStrinArrayAddresses()}
                    onClickDelete={(item, index) => handleDeleteAddress(index)} />
            </div>

            <div>
                <Button type="button" onClick={handleClickOpen}
                    style={{ marginTop: "15px" }}
                >
                    {t('my.addresses.add')}
                </Button>
            </div>

            <NewAddressDialog
                address={newAddress}
                isOpen={isDialogOpen}
                onClose={handleCloseNewAddressDialog}
                onChange={(newAddress: any) => handleNewAddressChange(newAddress)}
                onAccept={() => handleAddNewAddressAndClose()}
            >

            </NewAddressDialog>

        </div>
    );
};

export default MyAddresses;