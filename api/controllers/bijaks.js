const Bijak = require('../models/bijak');

exports.bijaks_get_all = (req, res, next) => {
   /*  Bijak.find(function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.length >= 1){
                res.status(200).json({
                    count: result.length,
                    bijak: result.map(res => {
                        return {
                            id: res._id,
                            no: res.no,
                            city: res.city,
                            dateOfReciept: res.dateOfReciept,
                            dispatchDate: res.dispatchDate,
                            dispatchDate: res.dispatchDate,
                            truckNo: res.truckNo,
                            truckFreight: res.truckFreight,
                            railFreight: res.railFreight,
                            stationMandiExp: res.stationMandiExp,
                            unloading:res.Unloading,
                            postage: res.postage,
                            phone:res.phone,
                            coldStorage:res.coldStorage,
                            loading:res.loading,
                            charity:res.charity,
                            itemRows: [{
                                sno: res.sno,
                                description: res.description,
                                ctnKg: res.ctnKg,
                                rate: res.rate
                            }],
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/bijaks/' + res._id
                            }
                        }
                    })
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    }); */
    console.log(req.query.page);
     Bijak.paginate({}, {page:req.query.page, limit: 10 }, function(err, result) {
        
        // console.log(result.page);
        // result.docs
        // result.total
        // result.limit + 10
        // result.page - 3
        // result.pages
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result.total >= 1){
                res.status(200).json({
                    count: result.total,
                    page: result.page, 
                    limit: result.limit,
                    pages: result.pages,
                    bijak: result.docs.map(res => {
                        return {
                            id: res._id,
                            no: res.no,
                            city: res.city,
                            dateOfReciept: res.dateOfReciept,
                            dispatchDate: res.dispatchDate,
                            dispatchDate: res.dispatchDate,
                            truckNo: res.truckNo,
                            truckFreight: res.truckFreight,
                            railFreight: res.railFreight,
                            stationMandiExp: res.stationMandiExp,
                            unloading:res.Unloading,
                            postage: res.postage,
                            phone:res.phone,
                            coldStorage:res.coldStorage,
                            loading:res.loading,
                            charity:res.charity,
                            itemRows: [{
                                sno: res.sno,
                                description: res.description,
                                ctnKg: res.ctnKg,
                                rate: res.rate
                            }],
                            created_at:res.created_at,
                            updated_at:res.updated_at,
                            request: {
                                type: 'GET',
                                URL: 'http://localhost:8080/bijaks/' + res._id
                            }
                        }
                    })
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }     
        }
    }); 
}

exports.bijaks_get_bijak = (req, res, next) => {
    Bijak.findById(req.params.bijakId, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            if(result){
                res.status(200).json({
                    bijak: result,
                    request: {
                        type: 'GET',
                        description: 'Get all bijaks',
                        url: "http://localhost:8080/bijaks/"
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No Entries found'
                });
            }            
        }
    });
}

exports.bijaks_create_bijak = (req, res, next) => {
    const bijak = new Bijak({
        no: req.body.no,
        city: req.body.city,
        ms: req.body.ms,
        dataOfReciept: req.body.dataOfReciept,
        dispatchDate: req.body.dispatchDate,
        truckNo: req.body.truckNo,
        truckFreight: req.body.truckFreight,
        railFreight: req.body.railFreight,
        stationMandiExp: req.body.stationMandiExp,
        unloading:req.body.unloading,
        postage: req.body.postage,
        phone:req.body.phone,
        coldStorage:req.body.coldStorage,
        loading:req.body.loading,
        charity:req.body.charity,
        
        created_at:new Date()
    });
    bijak.itemRows = req.body.itemRows; 
    sum = 0; count=0;
    bijak.itemRows.forEach(function(item){
        item.itemAmount = item.rate * item.ctnKg;
        sum += item.itemAmount;
        count += item.ctnKg;
    });
    bijak.totalGrossSale = sum;
    bijak.commission = sum * 0.07;
    bijak.totalExpenses = bijak.commission + bijak.truckFreight + bijak.railFreight 
    +bijak.stationMandiExp + bijak.unloading + bijak.postage
    +bijak.phone + bijak.coldStorage + bijak.loading + bijak.charity;
    bijak.netSale = bijak.totalGrossSale - bijak.totalExpenses;
    bijak.totalNags = count;
    
    console.log(bijak);
    bijak.save((err,result) => {
        if(err){
            res.status(500).json({msg: 'Failed to add bijak', error: err});
        } else {
            res.status(201).json({
                message: "bijaks added Successfully",
                createdData: result,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/bijaks/" + result._id
                }
            });
        }
    });
}

/* exports.bijaks_update_bijak = (req, res, next) => {
    
    var bijak = {
        name:{
            firstname:req.body.firstname,
            lastname:req.body.lastname
        },
        username: req.body.username,
        password: req.body.password,
        updated_at: new Date(),
        contactInfo: {
            telephone: [
                req.body.tel1,
                req.body.tel2
            ],
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
            }
        }
    };

    Bijak.findByIdAndUpdate({_id:req.params.bijakId}, bijak, {new:true}, function(err, result){
        if(err){ 
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'Bijak updated',
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/bijaks/" + result._id
                }
            });
        }
    });
} */

exports.bijaks_delete_bijak = (req, res, next) => {
    Bijak.remove({_id:req.params.bijakId}, function(err, result){
        if(err){
            res.status(500).json({error: err});
        } else {
            res.status(200).json({
                message: 'bijak deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8080/bijaks/'
                }
            });
        }
    });
}