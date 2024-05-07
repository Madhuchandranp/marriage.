// import React, { useState } from 'react'
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import ButtonBase from '@mui/material/ButtonBase';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// export default function AdminHome() {
//     const [Toggle,setToggle] = useState(false)
//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//       });
//       const images = [
//         {
//           url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVFPlQQs0bImpCIwWAlsLxKIt6dVHrvkNDGw&usqp=CAU',
//           title: 'Upload Image',
//           width: '20%',
//         }
      
//       ];
      
//       const ImageButton = styled(ButtonBase)(({ theme }) => ({
//         position: 'relative',
//         height: 200,
//         [theme.breakpoints.down('sm')]: {
//           width: '100% !important', // Overrides inline-style
//           height: 100,
//         },
//         '&:hover, &.Mui-focusVisible': {
//           zIndex: 1,
//           '& .MuiImageBackdrop-root': {
//             opacity: 0.15,
//           },
//           '& .MuiImageMarked-root': {
//             opacity: 0,
//           },
//           '& .MuiTypography-root': {
//             border: '4px solid currentColor',
//           },
//         },
//       }));
      
//       const ImageSrc = styled('span')({
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center 40%',
//       });
      
//       const Image = styled('span')(({ theme }) => ({
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: theme.palette.common.white,
//       }));
      
//       const ImageBackdrop = styled('span')(({ theme }) => ({
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         backgroundColor: theme.palette.common.black,
//         opacity: 0.4,
//         transition: theme.transitions.create('opacity'),
//       }));
      
//       const ImageMarked = styled('span')(({ theme }) => ({
//         height: 3,
//         width: 18,
//         backgroundColor: theme.palette.common.white,
//         position: 'absolute',
//         bottom: -2,
//         left: 'calc(50% - 9px)',
//         transition: theme.transitions.create('opacity'),
//       }));
      
//   return (
//     <div className='m-2'>
     
      
//   <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
//       {images.map((image) => (
//         <ImageButton
//           focusRipple
//           key={image.title}
//           style={{
//             width: image.width,
            
//           }}
//           component="label"
//           role={undefined}
//           variant="contained"
//           tabIndex={-1}
//           startIcon={<CloudUploadIcon />}
//         >
 
//     Upload file
//     <VisuallyHiddenInput type="file" />

//           <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
//           <ImageBackdrop className="MuiImageBackdrop-root" />
//           <Image>
//             <Typography
//               component="span"
//               variant="subtitle1"
//               color="inherit"
//               sx={{
//                 position: 'relative',
//                 p: 4,
//                 pt: 2,
//                 pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
//               }}
//             >
//               {image.title}
//               <ImageMarked className="MuiImageMarked-root" />
//             </Typography>
//           </Image>
//         </ImageButton>
//       ))}
//     </Box>
 
   
//   </div>
//   )
// }