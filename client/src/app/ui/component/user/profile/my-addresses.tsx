import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Address } from "../../../../../domain/model/user/address.type";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory"
import Button from "../../../common/button/button";

//@material-ui https://v4.mui.com/
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        papperRegisterForm: {
            width: "400px",
            height: "570px",
            margin: "0 auto 0 auto",
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
        wrapperCenter: {
            display: "flex",
            justifyContent: "center",
        },
        wrapperCenterWithPaddingTop: {
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
        },
        labelForPass: {
            color: "#888888",
            width: "250px",
        },
        textfieldCustom: {
            width: "250px",
        },
        h1Custom: {
            fontSize: "1.5em",
            color: "#525252",
            paddingLeft: "1rem",
        },
        buttonCustom: {
            margin: "0 auto auto auto",
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    })
);

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
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [newAddress, setNewAddress] = React.useState(initialNewAddress);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [myAddresses, setMyAddresses] = useState<Array<Address>>(addresses);
    const validator: IUserValidator = UserValidatorFactory.create();
    const [streetValid, setStreetValid] = useState(false);
    const [departmentValid, setDepartmentValid] = useState(false);

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

    const handleClickOpen = () => {
        setOpenDialog(true);
        setNewAddress(initialNewAddress);
    };

    const handleDeleteAddress = async (index: number) => {
        const arrayOfAddresses: Array<Address> = myAddresses;
        arrayOfAddresses.splice(index, 1); //delete element of index
        setMyAddresses(arrayOfAddresses);
        onChange(myAddresses); //set addresses array in parent
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleAddClose = () => {
        const arrayOfAddresses: Array<Address> = myAddresses;
        arrayOfAddresses.push(newAddress);
        setMyAddresses(arrayOfAddresses);
        setOpenDialog(false);
        onChange(myAddresses); //set addresses array in parent
    };

    const ifFieldsAreInvalid = (): boolean => {
        return streetValid && departmentValid;
    };
    
    return (
        <div>
            <Typography variant="h6" className={classes.title}>
                {t('my.addresses.title')}
            </Typography>
            <div className={classes.demo}>
                <List dense={dense}>
                    {myAddresses.map((address: any, index: number) =>
                        <ListItem>
                            <ListItemText
                                primary={convertAddressOneLine(address)}
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAddress(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>,
                    )}
                </List>
            </div>

            <Button onClick={handleClickOpen}>
                {t('my.addresses.add')}
            </Button>

            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('my.addresses.title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('my.addresses.add')}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="street"
                        label={t('my.addresses.street')}
                        value={newAddress.street}
                        onChange={(e) => handleStreetChange(e.target.value)}
                        fullWidth
                        {...(!streetValid && {
                            error: true,
                            helperText: t('register.info.helper.text.required')
                        })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="department"
                        label={t('my.addresses.department')}
                        value={newAddress.department}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        fullWidth
                        {...(!departmentValid && {
                            error: true,
                            helperText: t('register.info.helper.text.required')
                        })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="neighborhood"
                        label={t('my.addresses.neighborhood')}
                        value={newAddress.neighborhood}
                        onChange={(e) => handleNeighborhoodChange(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label={t('my.addresses.city')}
                        value={newAddress.city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="state"
                        label={t('my.addresses.state')}
                        value={newAddress.state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="country"
                        label={t('my.addresses.country')}
                        value={newAddress.country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={handleClose}>
                        {t('button.command.cancel')}
                    </Button>

                    {ifFieldsAreInvalid() &&
                        <Button 
                        onClick={handleAddClose}>
                            {t('button.command.add')}
                        </Button>
                    }

                    {!ifFieldsAreInvalid() &&
                        <Button disabled>
                            {t('button.command.add')}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyAddresses;