import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CreditCardInput from "react-credit-card-input";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState();
  const [cvc, setCvc] = useState();

  const handleCardNumberChange = (e) => {
      setCardNumber(e.target.value)
  };

  const handleCardExpiryChange = (e) => {
    setExpiry(e.target.value)
  };

  const handleCardCVCChange = (e) => {
    setCvc(e.target.value)
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid> */}

        <Grid item xs={12} md={12}>
          <CreditCardInput
            cardNumberInputProps={{
              value: cardNumber,
              onChange: handleCardNumberChange,
            }}
            cardExpiryInputProps={{
              value: expiry,
              onChange: handleCardExpiryChange,
            }}
            cardCVCInputProps={{
              value: cvc,
              onChange: handleCardCVCChange,
            }}
            fieldClassName="input"
          />
        </Grid>

        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
