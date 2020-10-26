const {Schema, model} = require('mongoose')

const workSchema = new Schema({   
    id_tecnico: {type: String, required: true},
    id_servicio: {type: String, required: true},
    fecha_inicio: {type:Date, required: true},
    fecha_fin:{type:Date, required: true},
    semana: {type:Number},
    horas: {type:Number},
    horasNormales: {type:Number},
    horasNocturnas: {type:Number},
    horasDominicales: {type:Number},
    horasNormalesExtras: {type:Number},
    horasNocturnasExtras: {type:Number},
    horasDominicalesExtras: {type:Number},
},
{
    timestamps: false,
    versionKey: false,
}
);


module.exports = model("Work",workSchema);