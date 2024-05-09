// const imagefile="453444534.jpg"
// const filename=imagefile.split(".").slice(0,1)
// console.log(filename)

const fileName = 'example.jpg';

// Use the 'slice' method to remove the file extension
const fileNameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
console.log(fileNameWithoutExtension);