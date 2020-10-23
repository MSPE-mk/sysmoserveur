var dbConn = require('./../../config/db.config');

var ProductImage = function (id, imageName) {
    this.id_product = id;
    this.image_name = imageName
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
module.exports = ProductImage;