import { Autocomplete, TextField } from "@mui/material";
import { capitalize } from "lodash";


const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
};

// const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function GenderSelect({ onChange, value }) {

  return (
    <Autocomplete
      disablePortal
      options={Object.keys(Gender)}
      fullWidth
      onChange={(_, v) => {
        onChange(v);
      }}
      value={value ? Gender[value] : null}
      getOptionLabel={(o) => capitalize(o.toString())}
      renderInput={(params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField {...params} placeholder="Gender" />
      )}
    />
  );
}
