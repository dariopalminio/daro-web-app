import { FunctionComponent } from "react";
import clsx from "clsx";

//@material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapperCenter: {
      display: "flex",
      justifyContent: "center",
    },
  }),
);


const AlertError: FunctionComponent<{msg:string}> = ({msg}) => {

    const classes = useStyles();

    return (

        <div className={clsx(classes.wrapperCenter)}>
        <Alert severity="error">
          {msg}
          <br />{" "}
        </Alert>
      </div>
    );
 };

 export default AlertError;