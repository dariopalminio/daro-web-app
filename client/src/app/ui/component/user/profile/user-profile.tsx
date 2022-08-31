import { FunctionComponent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import SessionContext, {
    ISessionContext,
} from "../../../../../domain/context/session.context";
import clsx from "clsx";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import ProfileLanguage from "./profile-language";

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
    })
);

/**
 * User Profile
 */
const UserProfile: FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { session } = useContext(SessionContext) as ISessionContext;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [docType, setDocType] = useState("");
    const [document, setDocument] = useState("");
    const [telephone, seTelephone] = useState("");

    const classes = useStyles();

    /**
 * Register
 */
    const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //register(firstName, lastName, email, password);
        //Redirect to Verify
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

                            value={firstName}
                            {...(false && { error: true, helperText: t('register.info.helper.text.required') })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic-2"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.label.lastname')}
                            placeholder=""

                            value={lastName}
                            {...(false && { error: true, helperText: t('register.info.helper.text.required') })}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic-3"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.label.email')}
                            placeholder="you@email.com"

                            value={email}

                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic-4"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.docType')}

                            value={docType}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            id="standard-basic-5"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.document')}


                            value={document}

                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            id="standard-basic-5"
                            className={clsx(classes.textfieldCustom)}
                            label={t('profile.telephone')}


                            value={telephone}

                        />

                    </Grid>

                    <Grid item xs={12}>
                        <ProfileLanguage />
                    </Grid>
                    <Grid item xs={12}>

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
        </div>
    );
};

export default UserProfile;