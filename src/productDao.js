//import fs module
const fs = require('fs');



//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function(done){
//parse the filecontent and save it in another varible say productdata
//return the callback with first parameter as undefined and second parameter as productdata
    fs.readFile('src/products.json', (err, fileContent) => {
      if (err) {
        return done ('Error While Reading JSON')
      }
      let productData = JSON.parse(fileContent)
      return done(undefined, productData)
    })
       
}


//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function(id,done){
    //write all the logical steps
    //return the callback with first parameter as undefined and second parameter as productDetails
    fs.readFile('src/products.json', (err, fileContent) => {
      if (err) {
        return done ('Error While Reading JSON')
      }
      let productData = JSON.parse(fileContent)
      let productFetched = productData.find(prod => prod.id === id)
      if (productFetched === undefined) {
        return done('No User ID Found')
      }
      return done(undefined, productFetched)
    })
      
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData
  
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      return done('Error while reading file')
    }
    let productData = JSON.parse(fileContent)
    productData.push(ProductDetails)
    //Write the productData into the file 
    fs.writeFile('src/products.json', JSON.stringify(productData), (err, createdContent) => {
      if (err) {
        return done('Error While Writting File')
      }
      //return the callback with undefined and ProductDetails
      return done(undefined, ProductDetails)
    })
  })
      
}

//The method deleteProductById will take productId and done as parameters
//It will read the product.json file

const deleteProductById = function(productId, done){
  //Write all the logical steps
  //return the callback with first parameter as undefined and second parameter as productDetails
  fs.readFile('src/products.json', (err, fileContent) => {
    if (err) {
      done('Error while Reading JSON')
    }
    let productData = JSON.parse(fileContent)
    let productIndex = productData.findIndex(prod => prod.id === productId)
    if (productIndex == -1) {
      return done('Entry Tidak Ditemukan')
    }
    productData.splice(productIndex, 1)
    fs.writeFile('src/products.json', JSON.stringify(productData), (err, newFile) => {
      if (err) {
        done('Error While Creating File')
      }
      return done(undefined, productData)
    })
  })
}


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
    
}