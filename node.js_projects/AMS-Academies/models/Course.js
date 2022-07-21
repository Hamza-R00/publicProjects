const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, ' please add a course title'],
    },
    description:{
        type:String,
        required: [true , 'please add a description']
    },
    weeks:{
        type:String,
        required: [true , 'please add number of weeks']
    },
    tuition:{
        type:Number,
        required: [true , 'please add a tution cost']
    },
    minimumSkill:{
        type:String,
        required: [true , 'please add minimum skill'],
        enum: ['beginner', 'intermediate' , 'advanced']
    },
    scholarShipAvailable:{
        type:Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required: true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: true,
    }
})




CourseSchema.statics.getAverageCost = async function(bootcampId){
    console.log( "calculation avergae cost".blue)

    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group:{
                // call those courses which has same _id of bootcamp , here bootcamp is the id
                _id: "$bootcamp",
                averageCost: {$avg: "$tuition"}
            }

        }
    ]);

    try {

        const a = await this.model('Bootcamp').findByIdAndUpdate(bootcampId , {
            
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10
        })
    } catch (error) {
        console.log(error )
    }
}

CourseSchema.post('save', function(){
    this.constructor.getAverageCost(this.bootcamp)
})


CourseSchema.post('remove', function(){
    
    this.constructor.getAverageCost(this.bootcamp)
})


module.exports = mongoose.model('Course' , CourseSchema ); 