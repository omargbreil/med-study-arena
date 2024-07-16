const cloudinary =require('cloudinary');


// Configuration 
 cloudinary.v2.config({
  cloud_name:"dhqe8isrb",
  api_key:"222862986855165",
  api_secret:"8_XWpUFsqe8nGx5F9wGbyULcHxA"
});

module.exports= cloudinary.v2
  