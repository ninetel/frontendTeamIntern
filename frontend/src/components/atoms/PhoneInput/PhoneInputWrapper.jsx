import { useField, useFormikContext } from "formik";
import { Box } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";

const PhoneInputWrapper = ({ name, label, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleOnChange = (value, e) => {
    let localNumber = value.startsWith("+977") ? value.slice(4) : value;
    setFieldValue(name, localNumber);
  };
  const configPhoneInput = {
    ...field,
    ...otherProps,
    // select: true,
    // error: true,
    disableDropdown: false,
    countryCodeEditable: false,
    variant: "outlined",
    size: "small",
    fullWidth: true,
    fontSize: "30px",
    defaultCountry: "np",
    onChange: handleOnChange,
    height: "52px",
  };

  return (
    <Box>
      <MuiPhoneNumber
        inputProps={{
          style: { height: "35px" },
        }}
        {...configPhoneInput}
      />
    </Box>
  );
};

export default PhoneInputWrapper;

// error={formik.touched.phone && Boolean(formik.errors.phone)}
// helperText={formik.touched.phone && formik.errors.phone}
