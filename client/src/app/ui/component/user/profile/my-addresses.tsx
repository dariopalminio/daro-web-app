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
 */
const MyAddresses: React.FC<IMyProps> = (props: IMyProps) => {

    const { addresses, onChange } = props;
    const { t } = useTranslation();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [newAddress, setNewAddress] = React.useState(initialNewAddress);
    const [myAddresses, setMyAddresses] = useState<Array<Address>>(addresses);
    const validator: IUserValidator = UserValidatorFactory.create();
    const [streetValid, setStreetValid] = useState(false);
    const [departmentValid, setDepartmentValid] = useState(false);
    const { isDialogOpen, toggle } = useModalDialog();

    const handleStreetChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            street: value
        });
        setStreetValid(await validator.nameWithNumberIsValid(value));
    };

    const handleDepartmentChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            department: value
        });
        setDepartmentValid(await validator.nameWithNumberIsValid(value));
    };

    const handleNeighborhoodChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            neighborhood: value
        })
    };

    const handleCityChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            city: value
        })
    };

    const handleStateChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            state: value
        })
    };

    const handleCountryChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            country: value
        })
    };

    const convertAddressOneLine = (address: any) => {
        return address.street + " " + address.department;
    };

    const getStrinArrayAddresses = () => {
        const stringArray: string[] = myAddresses.map((address: any, index: number) => convertAddressOneLine(address));
        return stringArray;
    }

    const handleClickOpen = () => {
        toggle();
        setNewAddress(initialNewAddress);
    };

    const handleDeleteAddress = async (index: number) => {
        const arrayOfAddresses: Array<Address> = myAddresses;
        arrayOfAddresses.splice(index, 1); //delete element of index
        setMyAddresses(arrayOfAddresses);
        onChange(myAddresses); //set addresses array in parent
    };

    const handleAddClose = () => {
        const arrayOfAddresses: Array<Address> = myAddresses;
        arrayOfAddresses.push(newAddress);
        setMyAddresses(arrayOfAddresses);
        toggle();
        onChange(myAddresses); //set addresses array in parent
    };

    const ifFieldsAreInvalid = (): boolean => {
        return streetValid && departmentValid;
    };

    return (
        <div>
            <h1>
                {t('my.addresses.title')}
            </h1>
            <div>
                <SelectList
                    id="mySelectList"
                    label="Tus direcciones:"
                    list={getStrinArrayAddresses()}
                    onClickDelete={(index) => handleDeleteAddress(index)} />
            </div>

            <div>
                <Button onClick={handleClickOpen}>
                    {t('my.addresses.add')}
                </Button>
            </div>

            <ModalDialog
                isOpen={isDialogOpen}
                onClose={toggle}
            >

                <TextField
                    id="street"
                    label={t('my.addresses.street')}
                    value={newAddress.street}
                    onChange={(e) => handleStreetChange(e.target.value)}
                    {...(!streetValid && {
                        error: true,
                        helperText: t('register.info.helper.text.required')
                    })}
                />
                <TextField
                    id="department"
                    label={t('my.addresses.department')}
                    value={newAddress.department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    {...(!departmentValid && {
                        error: true,
                        helperText: t('register.info.helper.text.required')
                    })}
                />
                <TextField
                    id="neighborhood"
                    label={t('my.addresses.neighborhood')}
                    value={newAddress.neighborhood}
                    onChange={(e) => handleNeighborhoodChange(e.target.value)}

                />
                <TextField
                    id="city"
                    label={t('my.addresses.city')}
                    value={newAddress.city}
                    onChange={(e) => handleCityChange(e.target.value)}

                />
                <TextField
                    id="state"
                    label={t('my.addresses.state')}
                    value={newAddress.state}
                    onChange={(e) => handleStateChange(e.target.value)}

                />
                <TextField
                    id="country"
                    label={t('my.addresses.country')}
                    value={newAddress.country}
                    onChange={(e) => handleCountryChange(e.target.value)}

                />

                {ifFieldsAreInvalid() &&
                    <Button
                        style={{ "margin-top": "5px;" }}
                        onClick={handleAddClose}>
                        {t('button.command.add')}
                    </Button>
                }

                {!ifFieldsAreInvalid() &&
                    <Button
                        style={{ "margin-top": "5px;" }}
                        disabled>
                        {t('button.command.add')}
                    </Button>
                }

            </ModalDialog>

        </div>
    );
};

export default MyAddresses;