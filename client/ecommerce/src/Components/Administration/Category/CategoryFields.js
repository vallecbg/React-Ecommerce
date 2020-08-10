import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import InputField from "../../Input/InputField";

const CategoryFields = ({
  changeHandlerFactory,
  runControlValidation,
  formState,
  runValidations,
  formIsInvalid,
  history,
}) => {
  const handleOnChangeTitle = changeHandlerFactory("title");

  //TODO: set loading component
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            label={"Title"}
            name={"title"}
            changeHandler={handleOnChangeTitle}
            runControlValidation={runControlValidation}
            formState={formState}
          />
        </Grid>
      </Grid>
    </div>
  );
};

CategoryFields.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default CategoryFields;
