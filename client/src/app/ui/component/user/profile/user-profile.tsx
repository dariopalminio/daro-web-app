import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SessionContext, {
    ISessionContext,
} from "../../../../../domain/context/session.context";
import clsx from "clsx";
import { Profile } from "../../../../../domain/model/user/profile.type";
import { Address } from "../../../../../domain/model/user/address.type";

//@material-ui https://v4.mui.com/
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ProfileLanguage from "./profile-language";
import useProfile from "../../../../../domain/hook/profile.hook";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import AlertError from "../alert-error";
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

const initialEmptyProfile: Profile = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    docType: '',
    document: '',
    telephone: '',
    language: '',
    addresses: []
};

const initialNewAddress: Address = {
    street: '',
    department: '',
    neighborhood: '',
    city: '',
    state: '',
    country: ''
};


/**
 * User Profile
 */
const UserProfile: FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { session } = useContext(SessionContext) as ISessionContext;
    const [profile, setProfile] = useState(initialEmptyProfile)
    const { isProcessing, hasError, msg, isSuccess, getProfile, updateProfile } = useProfile();
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [newAddress, setNewAddress] = React.useState(initialNewAddress);


    const fetchData = async () => {
        const username = session?.preferred_username;

        try {
            const info = await getProfile(username);

            if (info.language) i18n.changeLanguage(info.language.toLowerCase());

            setProfile({
                ...profile,
                userName: info.userName,
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                docType: info.docType.toUpperCase(),
                document: info.document,
                telephone: info.telephone,
                language: info.language.toLowerCase(),
                addresses: info.addresses
            })
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const info = await updateProfile(profile);
        } catch (e) {
            console.log(e);
        }
    };

    const handleLanguageChange = (len: string): void => {
        setProfile({
            ...profile,
            language: len
        })
    };

    const handleFirstNameChange = (firstNameValue: string): void => {
        setProfile({
            ...profile,
            firstName: firstNameValue
        })
    };

    const handleLastNameChange = (lastNameValue: string): void => {
        setProfile({
            ...profile,
            lastName: lastNameValue
        })
    };

    const handleDocTypeChange = async (docTypeValue: string) => {
        setProfile({
            ...profile,
            docType: docTypeValue
        })
    };

    const handleDocumentChange = async (documentValue: string) => {
        setProfile({
            ...profile,
            document: documentValue
        })
    };

    const handleTelephoneChange = async (telephoneValue: string) => {
        setProfile({
            ...profile,
            telephone: telephoneValue
        })
    };

    const handleStreetChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            street: value
        })
    };

    const handleDepartmentChange = async (value: string) => {
        setNewAddress({
            ...newAddress,
            department: value
        })
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

    const handleDeleteAddress = async (index: number) => {

        const array = profile.addresses;

        array.splice(index, 1); //delete element of index

        setProfile({
            ...profile,
            addresses: array
        })
    };

    const convertAddressOneLine = (address: any) => {

        return address.street + " " + address.department;
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
        setNewAddress(initialNewAddress);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleCancelClose = () => {
        setOpenDialog(false);
    };

    const handleAddClose = () => {
        const array = profile.addresses;

        array.push(newAddress);

        setProfile({
            ...profile,
            addresses: array
        })
        setOpenDialog(false);
    };

    return (
        <div>

            <form
                id="RegisterForm"
                data-testid="RegisterForm"
                action="#"
                onSubmit={handleUpdateSubmit}
            >

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>

                        <h1 className={clsx(classes.h1Custom)}>
                            {t('profile.title')}
                        </h1>

                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic-1"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.label.firstname')}
                            placeholder=""
                            onChange={(e) => handleFirstNameChange(e.target.value)}
                            value={profile.firstName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic-2"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.label.lastname')}
                            placeholder=""
                            onChange={(e) => handleLastNameChange(e.target.value)}
                            value={profile.lastName}

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic-3"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.label.email')}
                            placeholder="you@email.com"
                            disabled={true}
                            value={profile.email}

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl className={clsx(classes.textfieldCustom)}>
                            <InputLabel id="demo-select-small">{t('profile.docType')}</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={profile.docType}
                                label={t('profile.docType')}
                                onChange={(e) => handleDocTypeChange(e.target.value as string)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'RUT'}>RUT</MenuItem>
                                <MenuItem value={'DNI'}>DNI</MenuItem>
                                <MenuItem value={'OTHER'}>OTHER</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            id="standard-basic-5"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.document')}
                            onChange={(e) => handleDocumentChange(e.target.value)}
                            value={profile.document}

                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            id="standard-basic-5"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.telephone')}
                            onChange={(e) => handleTelephoneChange(e.target.value)}
                            value={profile.telephone}

                        />

                    </Grid>

                    <Grid item xs={12}>
                        <ProfileLanguage
                            onChange={(len: string) => handleLanguageChange(len)} />
                    </Grid>
                    <Grid item xs={12}>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" className={classes.title}>
                                {t('profile.my.addresses.title')}
                            </Typography>
                            <div className={classes.demo}>
                                <List dense={dense}>
                                    {profile.addresses.map((address, index) =>
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

                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                {t('profile.my.addresses.add')}
                            </Button>
                            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        New address
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="street"
                                        label="Street"
                                        value={newAddress.street}
                                        onChange={(e) => handleStreetChange(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="department"
                                        label="department"
                                        value={newAddress.department}
                                        onChange={(e) => handleDepartmentChange(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="neighborhood"
                                        label="neighborhood"
                                        value={newAddress.neighborhood}
                                        onChange={(e) => handleNeighborhoodChange(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="city"
                                        label="city"
                                        value={newAddress.city}
                                        onChange={(e) => handleCityChange(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="state"
                                        label="state"
                                        value={newAddress.state}
                                        onChange={(e) => handleStateChange(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="country"
                                        label="country"
                                        value={newAddress.country}
                                        onChange={(e) => handleCountryChange(e.target.value)}
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCancelClose} color="primary">
                                    {t('button.command.cancel')}
                                    </Button>
                                    <Button onClick={handleAddClose} color="primary">
                                    {t('button.command.add')}
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </Grid>


                        <Button
                            className={clsx(classes.buttonCustom)}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {t('profile.command.submit')}
                        </Button>

                    </Grid>
                </Grid>

            </form>


            <br />

            {isProcessing && (
                <div className="box">
                    <strong>{t('login.info.loading')}</strong>
                    <CircularProgress />
                </div>
            )}

            {hasError && <AlertError msg={t(msg)} />}

        </div>
    );
};

export default UserProfile;