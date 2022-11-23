// Gettign the Newly created Mongoose Model we just created 
var UserImg = require('../models/UserImg.model');
var Profesor = require('../models/profesores.model');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

//configurar cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'tuprofe-uade', //reemplazar con sus credenciales
    api_key: '193543521554257', 
    api_secret: 'pNtqkXcP-5CnfrHPPzuBoqYl45k'
});

// Async function to get the Contact List
exports.getImagenes = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Imagenes = await UserImg.paginate(query, options)
        // Return the Contact list that was retured by the mongoose promise
        return Imagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Contacts');
    }
}

// Async function to get the Contact List
exports.getImagenesByUser = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    console.log("byDni",query)
    try {
        var UserImagenes = await UserImg.paginate(query, options)
        // Return the Control list that was retured by the mongoose promise
        console.log("videos by dni",UserImagenes)
        return UserImagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Desafios');
    }
}

async function savedUserImg (newUserImg)
{

    try {
        // Saving the Control 
        var savedUserImg = await newUserImg.save();
        
        return savedUserImg;
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
}
}


exports.createUserImg = async function (userImg) {
    
    var searchProfesor = await Profesor.findOne({
        id_user: userImg.id_user
    })
    if(searchProfesor){
        //subir imagen a cloudinary
        console.log("userImg",userImg)
        let urlImg;
        let imagen = process.env.UPLOAD_DIR + userImg.nombreImagen;
        cloudinary.uploader.upload(imagen, function(result) { 
            console.log("Resultado",result);
            //urlImg=result.url;
            // Creating a new Mongoose Object by using the new keyword
            
            searchProfesor.nombreImagen = result.url
            
            savedUserImg(searchProfesor);
        });   
    }   
}


exports.OLDDDDDcreateUserImg = async function (userImg) {
    
    //subir imagen a cloudinary
    console.log("userImg",userImg)
    let urlImg;
    let imagen = process.env.UPLOAD_DIR + userImg.nombreImagen;
    cloudinary.uploader.upload(imagen, function(result) { 
        console.log("Resultado",result);
        //urlImg=result.url;
        // Creating a new Mongoose Object by using the new keyword
        var newUserImg = new UserImg({      
            id_user: userImg.id_user,
            date: new Date(),
            nombreImagen: result.url
        })
        
        savedUserImg(newUserImg);
    });
}



