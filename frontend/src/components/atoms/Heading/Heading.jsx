import { Typography } from "@mui/material";
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//     titleContainer: {
//         display: 'inline-flex'
//         // border: '2px solid red'
//     },
//     titleFirst: {
//         color: '#3D3D3D'
//     },
//     titleSecond: {
//         fontSize: '1.2rem',
//         color: '#326EB4'
//     }
// });

const Heading = ({ text }) => {
  // const classes = useStyles();
  return (
    <Typography
      sx={{
        fontSize: "2rem",
        fontWeight: "500",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {text ? text : "Sikincha"}
    </Typography>
  );
};
export default Heading;
