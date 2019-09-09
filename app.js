let mongoose = require('mongoose');
let express = require('express');
let app = express();

let User = require('./models/user');
let Car = require('./models/car');

let url = "mongodb://localhost:27017/week6lecture2";

mongoose.connect(url, function (err) {
    if (err) console.log(err);
    else {
        console.log('Connected!!!!');


    }

});

app.get('/getusers', function (req, res) {
    User.find().where('age').gte(29).lte(77).limit(2).exec(function (err, data) {
        res.send(data);
    });
});

app.get('/adduser/:name/:age/:address/:maker/:year', function (req, res) {
    let theName = req.params.name;
    let theAge = parseInt(req.params.age);
    let theAddress = req.params.address;
    let theMaker = req.params.maker;
    let theYear = parseInt(req.params.year);

    let user = new User({
        name: theName,
        age: theAge,
        address: theAddress
    });

    user.save(function (err) {
        if (err)
            console.log(err);
        else {
            console.log('User Saved!!!');

            let car = new Car({
                maker: theMaker,
                year: theYear,
                user: user._id
            });

            car.save(function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("Car Saved... Congrants!!!!");

            })
        }
        res.redirect('/getusers');

    })
});


app.get('/getcars',function(req,res){
    Car.find().populate('user').exec(function(err,data){
        res.send(data);
    })
});

app.listen(8080);