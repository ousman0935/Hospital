import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
day: {
  type: String,
  required: true,
  enum: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]
},
  isAvailable: { type: Boolean, default: false },
  startTime: {type:String,
    required:function ()
{    return this.isAvailable
}  
  },
  endTime: {type:String,
    required:function (){
      return this.isAvailable
    }
  },
breaks: {
  type: [
    { start: { type: String, required: true }, end: { type: String, required: true } }
  ],
  default: []
}

});


const doctorScheduleSchema = new mongoose.Schema({
    SlotDuration:{
    type:Number,
    default:30
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Docter",
    required: true,
    unique: true
  },
 weeklySchedule: {
  type: [daySchema],
  validate: {
    validator: function(days) {
      const dayNames = days.map(d => d.day);
      return new Set(dayNames).size === dayNames.length;
    },
    message: "Duplicate days are not allowed in weeklySchedule"
  }
}

},{timestamps:true });

export default mongoose.model("DoctorAvaliabilityModel", doctorScheduleSchema);
