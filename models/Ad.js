'use strict'

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    name: { type: String, index: true},
    sale: { type: Boolean, index: true},
    price: { type: Number, index: true},
    photo: { type: String, index: true},
    tags: { type:[String], index: true}
},
{
    collection: 'Ads'
});

/**
 * Filter List
 */
adSchema.statics.getListPaged = function(filters, limit, skip, sort) {
    const query = Ad.find();//Buscamos todos
    if (filters.name != null) { 
        query.where({'name': filters.name = new RegExp('^' + filters.name, 'i')});//Filtro nombre
    }
    if (filters.sale != null) { 
        query.where('sale').equals(filters.sale);//Filtro venta
    }
    if (filters.tags != null) {
        query.where('tags').in(new Array(filters.tags));//Filtro tags
    }
    if (filters.price != null) {//Filtro precio
        let cad = filters.price.split("-",2);
        if (cad.length > 1) {
            if (cad[0] && cad[1]) {
                query.where('price').gt(parseInt(cad[0])).lt(parseInt(cad[1]));
            } else if (cad[0]) {
                query.where('price').gt(parseInt(cad[0]));
            } else if (cad[1]) {
                query.where('price').lt(parseInt(cad[1]));
            }
        } else {
            query.where('price').equals(filters.price);
        }
    }
    if (limit !== null) {
        query.limit(parseInt(limit));        
    }
    if (skip !== null) {
        query.skip(parseInt(skip));        
    }
    if (sort !== null) {
        query.sort(sort);
    }       
    return query.exec()
};

/**
 * Obtain all tags
 */
adSchema.statics.getTags = function() {
    const query = Ad.find();
    query.select('tags -_id');
    return query.exec();
};

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;

