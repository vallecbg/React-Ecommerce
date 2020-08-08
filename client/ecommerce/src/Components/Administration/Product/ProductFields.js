import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import InputField from "../../Input/InputField";
import InputAutocomplete from "../../Input/InputAutocomplete";
import InputNumber from "../../Input/InputNumber";
import InputCheckbox from "../../Input/InputCheckbox";
import InputTextarea from "../../Input/InputTextarea";
import BackupIcon from "@material-ui/icons/Backup";
import { fetchPhotos, openUploadWidget } from "../../../Services/uploadService";
//import { Image } from "cloudinary-react";

const ProductFields = ({
  changeHandlerFactory,
  runControlValidation,
  formState,
  productImages,
  setProductImages,
  handleChangePopular,
  popular,
  categories,
  isLoading,
  handleChangeCategory
}) => {

//   useEffect(() => {
//       fetchPhotos("image", setProductImages)
//   }, [])

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "vallec",
      tags: [tag, 'anImage'],
      uploadPreset: "reactify"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if(photos.event === 'success'){
          //TODO: add product image id to get it for thumbnail in details
            setProductImages([...productImages, {url: photos.info.url, imgId: photos.info.public_id}])
        }
      } else {
        console.log(error);
      }
    })
  }

  const handleOnChangeTitle = changeHandlerFactory("title");
  const handleOnChangePrice = changeHandlerFactory("price");
  const handleOnChangeDelivery = changeHandlerFactory("delivery");
  const handleOnChangeDescription = changeHandlerFactory("description");

  //TODO: set loading component
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
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
          <Grid item xs={12}>
            <InputAutocomplete
              label={"Category"}
              name={"category"}
              changeHandler={handleChangeCategory}
              options={categories}
            />
          </Grid>
          <Grid item xs={12}>
            <InputNumber
              label={"Price"}
              name={"price"}
              type={"number"}
              changeHandler={handleOnChangePrice}
              runControlValidation={runControlValidation}
              formState={formState}
            />
          </Grid>
          <Grid item xs={12}>
            <InputNumber
              label={"Delivery"}
              name={"delivery"}
              type={"number"}
              changeHandler={handleOnChangeDelivery}
              runControlValidation={runControlValidation}
              formState={formState}
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextarea 
                cols={51}
                rows={15}
                label={"Description"}
                name={"description"}
                handleChange={handleOnChangeDescription}
                formState={formState}
                runControlValidation={runControlValidation}
            />
          </Grid>
          <Grid item xs={12}>
            <InputCheckbox
              label={"Popular Product"}
              name={"popular"}
              changeHandler={handleChangePopular}
              checked={popular}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => beginUpload("image")}
            >
              <BackupIcon style={{ marginRight: "10px" }} />
              Upload Image
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

ProductFields.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
  productImage: PropTypes.string,
  setProductImage: PropTypes.func,
  handleChangePopular: PropTypes.func,
  popular: PropTypes.bool,
};

export default ProductFields;
