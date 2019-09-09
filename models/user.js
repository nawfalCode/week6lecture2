let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate: {
            validator: function (value) {
                if (value % 2 === 0)
                    return true;
                else
                    return false;
            },
            message: 'Sould be an even age. Sorry :('
        }

    },
    address: {
        type: String,
        set: function (newAddress) {
            console.log(' Setter');
            
                return "You live in " +newAddress;
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save',function(){
    console.log(' Pre Save');

    this.age+=2;
    this.address+=" City";
})


let userModel = mongoose.model("UserCollection", userSchema);
module.exports = userModel;