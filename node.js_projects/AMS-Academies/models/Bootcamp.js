const  mongoose  = require("mongoose");
const slugify = require('slugify');
const geocoder = require('../utils/geocoder')

const BootcampSchema =  new mongoose.Schema({
    name : {
        type : String,
        required: [true , 'please add a name'],
        unique: true,
        maxlength: [50 ,'Name cant not be more than 50 Characters'],
    },

    slug: String,
    
    description: {
        type : String,
        required: [true , 'Please add a Description'],
        maxlength: [500 ,'Name cant not be more than 50 Characters'],
    },
    website:{
        type:String,
        match:[
            // regex should be in placed with in / / these two brackets
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'please add valid URl with http or https',
        ],
        },
        email:{
            type:String,
            match:[
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'please add a valid email',
            ]
        },
        address:{
            type:String,
            required:[true,'please add an address']
        },
        location:{
            
            // GeoJSON
            
            type:{
                type: String,
                enum: ['point'],
                // required: true,
            },

            coordinates:{
                type: [Number],
                // required: true,
                index: '2dsphere',
            },
            formattedAddress: String,
            street: String,
            city : String,
            state: String,
            zipcode: String,
            country: String,
      },
        careers:{
            // this means that its an array of strings.
            type: [String],
            required:true,
            enum:[
                'Web Development',
                "Mobile Development",
                'UI/UX',
                'Data Science',
                "Business",
                "Others",
            ]
        },
        averageRating:{
            type:Number,
            min:[1 , 'Rating must be atleast 1'],
            min:[10 , 'Rating must can not be more than 10'],
        },
        averageCost:Number,
        photo:{
            type: String,
            deafult: 'no-photo.jpg'
        },
        
        housing:{
            type:Boolean,
            default: false,
        },
        jobAssitance:{
            type:Boolean,
            default: false,
        },
        jobGuarantee:{
            type:Boolean,
            default: false,
        },
        acceptGi:{
            type:Boolean,
            default: false,
        },
        createdAt:{
            type:Date,
            default: Date.now,
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required: true,
        }
},

    {
    // In documentationwe usually get a function getting passed in virtuals for an options object to be passed follow below
    // when we are not adding getter or setter in virtuals , rather we just pas an JSON object
    toJSON: {virtuals:true}, 
    toObject:{virtuals:true},
}
);


BootcampSchema.virtual('courses' , {
    ref:'Course',
    localField: '_id',
    foreignField:'bootcamp', 
    justOne: false,
})

BootcampSchema.virtual('Asso_User' , {
    ref:'Course',
    localField: 'user',
    foreignField:'_id', 
    justOne: false,
})


// just tried all in vein;
BootcampSchema.virtual('courseCount').set( async function(next){
    const c = await this.model('Course').countDocuments({bootcamp:this._id})
    return c;
})

// this is in middleware, 
BootcampSchema.pre('remove' , async function(next){
    await this.model('Course').deleteMany({bootcamp:this._id});
    next()
})

// create bootcamp slug from name;
BootcampSchema.pre('save' , function(next){
    this.slug = slugify(this.name , {lower:true})
    next();
})



// GEOCODE - CREATE LOCATION FIELD.
//              here pre represents that it processes that data before saving it.
BootcampSchema.pre('save' , async function(next){

     const loc = await geocoder.geocode(this.address);
     var locObj = null
    
     if(loc)
     locObj = loc[0]

    this.location = {

        type:'Point',
        coordinates:[ loc[0].longitude , loc[0].latitude ],
        formattedAddress: locObj.formattedAddress,
        street: locObj.streetName,
        city:locObj.city,
        state:locObj.stateCode,
        zipcode:locObj.zipcode,
        country:locObj.countryCode,
    }

    this.address = undefined

})

module.exports = mongoose.model('Bootcamp' , BootcampSchema);