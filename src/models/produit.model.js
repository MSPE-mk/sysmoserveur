'use strict';
var dbConn = require('./../../config/db.config');
//produits object create
// display add produit page  (`nom`,`reference`,`categorie`,`prix`,`disponibilite`,`description`

var Produit = function(produit){
  this.nom    = produit.nom;
  this.reference     = produit.reference;
  this.categorie          = produit.categorie;
  this.prix          = produit.prix;
  this.disponibilite   = produit.disponibilite;
  this.description    = produit.description;

  this.created_at     = new Date();
  this.updated_at     = new Date();
};
Produit.create = function (newProd, result) {
dbConn.query("INSERT INTO produits set ?", newProd, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Produit.findById = function (id, result) {
dbConn.query("Select * from produits where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Produit.findAll = function (result) {
dbConn.query("Select * from produits", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('produits : ', res);
  result(null, res);
}
});
};
// display add produit page  (`nom`,`reference`,`categorie`,`prix`,`disponibilite`,`description`

Produit.update = function(id, produit, result){
dbConn.query("UPDATE produits SET nom=?,reference=?,categorie=?,prix=?,disponibilite=?,description=? WHERE id = ?", [produit.nom,produit.reference,produit.categorie,produit.prix,produit.disponibilite,produit.description, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Produit.delete = function(id, result){
dbConn.query("DELETE FROM produits WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Produit;