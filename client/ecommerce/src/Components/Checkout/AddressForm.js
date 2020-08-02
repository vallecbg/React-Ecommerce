import React, { useContext, useCallback } from "react";
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  makeStyles,
  Button
} from "@material-ui/core";
import withForm from "../../Hocs/withForm";
import InputField from "../Input/InputField";
import PropTypes from "prop-types";
import * as yup from "yup";
import { StoreContext } from '../../Store/Store'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const AddressForm = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
  activeStep,
  handleNext,
  handleUserDataSubmit
}) => {
  const classes = useStyles()
  const { dispatch } = useContext(StoreContext);

  const steps = ['Shipping address', 'Review your order'];
  //console.log("Active Step:", activeStep);
  //console.log("handleNext:", handleNext);
  
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        handleNext()
        handleUserDataSubmit(formData)
        console.log(formData);
        //dispatch(register(formData));
        //history.push("/");
      });
    },
    [history, dispatch, runValidations]
  );

  const handleOnChangeFirstName = changeHandlerFactory("firstName");
  const handleOnChangeLastName = changeHandlerFactory("lastName");
  const handleOnChangeAddress1 = changeHandlerFactory("address1");
  const handleOnChangeAddress2 = changeHandlerFactory("address2");
  const handleOnChangeCity = changeHandlerFactory("city");
  const handleOnChangeState = changeHandlerFactory("state");
  const handleOnChangeZip = changeHandlerFactory("zip");
  const handleOnChangeCountry = changeHandlerFactory("country");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            label={"First Name"}
            name={"firstName"}
            changeHandler={handleOnChangeFirstName}
            runControlValidation={runControlValidation}
            formState={formState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label={"Last Name"}
            name={"lastName"}
            changeHandler={handleOnChangeLastName}
            runControlValidation={runControlValidation}
            formState={formState}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label={"Address Line 1"}
            name={"address1"}
            changeHandler={handleOnChangeAddress1}
            runControlValidation={runControlValidation}
            formState={formState}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label={"Address Line 2"}
            name={"address2"}
            changeHandler={handleOnChangeAddress2}
            runControlValidation={runControlValidation}
            formState={formState}
            notRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label={"City"}
            name={"city"}
            changeHandler={handleOnChangeCity}
            runControlValidation={runControlValidation}
            formState={formState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label={"State/Province/Region"}
            name={"state"}
            changeHandler={handleOnChangeState}
            runControlValidation={runControlValidation}
            formState={formState}
            notRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label={"ZIP / Postal Code"}
            name={"zip"}
            changeHandler={handleOnChangeZip}
            runControlValidation={runControlValidation}
            formState={formState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label={`Country`}
            name={"country"}
            changeHandler={handleOnChangeCountry}
            runControlValidation={runControlValidation}
            formState={formState}
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
          disabled={formIsInvalid()}
        >
          {activeStep === steps.length - 1 ? "Place order" : "Next"}
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address1: yup.string().required("Address Line 1 is required"),
  address2: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string(),
  zip: yup.string().required("ZIP Code is required"),
  country: yup.string().required("Country is required"),
});

const initialState = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

AddressForm.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(AddressForm, initialState, schema);
