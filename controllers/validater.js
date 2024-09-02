//other than database level validation client side validation 
//is added to provide immediate feedback b4 submitting to db

const db = require("../models");



/* function addWishlistStatusToProduct(product, wishlistVariants) {
    const productData = {
      ...product.toJSON(),
      
    };
  
    for (const variant of product.Variants) {
      const isWishlisted = wishlistVariants.some(wishlistVariant => wishlistVariant.variant_id === variant.variant_id);
  
      const variantData = {
        ...variant.toJSON(),
        is_wishlisted: isWishlisted,
      };
  
      productData.Variants.push(variantData);
    }
  
    return productData;
  } */
  
  
  
module.exports= { addWishlistStatusToProduct};