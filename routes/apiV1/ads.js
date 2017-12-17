

'use strict'

const express = require('express');
const router = express.Router();
const Ad = require('../../models/Ad');
const jwtAuth = require('../../lib/jwtAuth');
const customError = require('../../utils/customError');


router.use(jwtAuth());

router.get('/tags/', async (req, res, next) => {
    try {
        const rows = await Ad.getTags();
        if (rows.length <= 0) {
            next(new customError('ELEMENT_NOT_FOUND', 404));
            return;
        }
        res.json({ succcess: true, result: rows});
    } catch(err) {
        next(err);
    }
    
});

/**
 * GET lista paginada de anuncios
 */
router.get('/', async (req, res, next) => {
    
    try {
        console.log("entro");
        var filters = {};
        filters.name = (typeof req.query.name !== undefined ? req.query.name : null);
        filters.sale = (typeof req.query.sale !== undefined ? req.query.sale : null);
        filters.price = (typeof req.query.price !== undefined ? req.query.price : null);
        filters.tags = (typeof req.query.tags !== undefined ? req.query.tags : null);
        const limit = (typeof req.query.limit !== undefined ? req.query.limit : null);
        const skip = (typeof req.query.start !== undefined ? req.query.start : null);
        const sort = (typeof req.query.sort !== undefined ? req.query.sort : null);
        const rows = await Ad.getListPaged(filters, limit, skip, sort);
        if (rows.length <= 0) {
            next(new customError('ELEMENT_NOT_FOUND', 404));
            return;
        }
        res.json({ success: true, result: rows });
    } catch(err) {
        next(err);
    }
});

module.exports = router;