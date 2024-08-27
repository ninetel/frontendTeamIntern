import { Typography } from "@mui/material";

const FormFooterSection = ({ children, color, marginLeft, marginRight }) => {
  return (
    <Typography
      sx={{
        fontFamily: "Poppins, sans-serif",
        textDecoration: "underline",
        fontSize: "12px",
        color: color,
        cursor: "pointer",
        paddingTop: "8px",
        marginLeft: marginLeft,
        marginRight: marginRight,
        fontWeight: "400",
      }}
    >
      {children}
    </Typography>
  );
};

export default FormFooterSection;
