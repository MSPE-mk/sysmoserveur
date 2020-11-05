var dbConn = require('./../../config/db.config');

var ProductImage = function (id, imageName) {
    this.id_product = id;
    this.image_name = imageName
}

ProductImage.getPictureByID = (idProduct, result) => {
    dbConn.query("Select * from image_product where id_product = ? ", idProduct, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        }
        else {
          result(null, res);
        }
      });
}
ProductImage.saveImgInDB = (newImgProduct, result) => {
    dbConn.query("INSERT INTO image_product set ?", newImgProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
}

ProductImage.deleteProductPictures = (id, result) => {
    dbConn.query("DELETE FROM image_product WHERE id = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      }
      else {
        result(null, res);
      }
    });
  };
module.exports = ProductImage;