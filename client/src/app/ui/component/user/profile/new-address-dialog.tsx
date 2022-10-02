import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "../../../common/button/button";
import ModalDialog from "../../../common/dialog/modal-dialog";
import { CenteringContainer } from "../../../common/elements/centering-container";
import TextField from "../../../common/text-field/text-field";

interface Props {
    address: any;
    isOpen: boolean;
    onClose: () => void;
    onChange: (newAddress: any) => void;
    onAccept: () => void;
    children: React.ReactNode;
}

/**
 * NewAddressDialog
 * 
 * Pattern: Presentation Component, Controled Component 
 */
const NewAddressDialog: React.FC<Props> = ({ address, isOpen, onClose, onChange, onAccept }) => {

    const { t } = useTranslation();
    const [streetValid, setStreetValid] = useState(false);
    const [departmentValid, setDepartmentValid] = useState(false);
    const expresions = {
        street: /^[0-9a-zA-Z\s]*$/, // String Contains Only Letters, Spaces, numbers and is not Empty 
        department: /^[0-9a-zA-Z\s]*$/, // String Contains Only Letters, Spaces, numbers and is not Empty 
    };

    const handleStreetChange = async (value: string) => {
        onChange({
            ...address,
            street: value
        });

        if (value &&
            (value.trim().length > 0) && expresions.street.test(value)) {
            setStreetValid(true);
        } else {
            setStreetValid(false);
        }
    };

    const handleDepartmentChange = async (value: string) => {
        onChange({
            ...address,
            department: value
        });
        if (value &&
            value.trim().length > 0 && expresions.department.test(value)) {
            setDepartmentValid(true);
        } else {
            setDepartmentValid(false);
        }
    };

    const handleNeighborhoodChange = async (value: string) => {
        onChange({
            ...address,
            neighborhood: value
        })
    };

    const handleCityChange = async (value: string) => {
        onChange({
            ...address,
            city: value
        })
    };

    const handleStateChange = async (value: string) => {
        onChange({
            ...address,
            state: value
        })
    };

    const handleCountryChange = async (value: string) => {
        onChange({
            ...address,
            country: value
        })
    };

    const ifFieldsAreInvalid = (): boolean => {
        return streetValid && departmentValid;
    };

    const handleAddClose = () => {
        onAccept();
    };

    return (

        <ModalDialog
            isOpen={isOpen}
            onClose={onClose}
        >

            <TextField
                id="street"
                label={t('my.addresses.street')}
                value={address.street}
                onChange={(e) => handleStreetChange(e.target.value)}
                {...(!streetValid && {
                    error: true,
                    helperText: t('register.info.helper.text.required')
                })}
            />
            <TextField
                id="department"
                label={t('my.addresses.department')}
                value={address.department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                {...(!departmentValid && {
                    error: true,
                    helperText: t('register.info.helper.text.required')
                })}
            />
            <TextField
                id="neighborhood"
                label={t('my.addresses.neighborhood')}
                value={address.neighborhood}
                onChange={(e) => handleNeighborhoodChange(e.target.value)}

            />
            <TextField
                id="city"
                label={t('my.addresses.city')}
                value={address.city}
                onChange={(e) => handleCityChange(e.target.value)}

            />
            <TextField
                id="state"
                label={t('my.addresses.state')}
                value={address.state}
                onChange={(e) => handleStateChange(e.target.value)}

            />
            <TextField
                id="country"
                label={t('my.addresses.country')}
                value={address.country}
                onChange={(e) => handleCountryChange(e.target.value)}

            />
            <br />
            <CenteringContainer>

                {ifFieldsAreInvalid() &&
                    <Button
                        type="button" 
                        style={{ marginTop: "15px" }}
                        onClick={handleAddClose}>
                        {t('button.command.add')}
                    </Button>
                }

                {!ifFieldsAreInvalid() &&
                    <Button
                        type="button" 
                        style={{ marginTop: "15px" }}
                        disabled>
                        {t('button.command.add')}
                    </Button>
                }
            </CenteringContainer>
        </ModalDialog>

    );
};

export default NewAddressDialog;