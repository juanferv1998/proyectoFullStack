const worksCtrl = {}
const Work = require('../models/Work')
var moment = require('moment');
moment().format();

worksCtrl.getWorks = async (req, res) => {
    const works = await Work.find()
    res.json(works)
 
}

worksCtrl.createWorks = async (req, res) => {
    const newWork = new Work(req.body)
    var start = moment(newWork.fecha_inicio)
    var end = moment(newWork.fecha_fin)
    var week = start.isoWeek()         //Semana del año
    var day = start.isoWeekday()
    var end_day = end.isoWeekday()   //Dia de la semana de 1 a 7, (Lunes-Domingo)
    newWork.semana = week           //Guarda la semana del año
    newWork.horas =  end.diff(start, 'h'); // Diff in hours

    
    newWork.horasNormales = 0
    newWork.horasNocturnas = 0
    newWork.horasDominicales = 0
    newWork.horasNormalesExtras = 0
    newWork.horasNocturnasExtras = 0
    newWork.horasDominicalesExtras = 0
              
    // Validacion de datos
    if (newWork.fecha_inicio > newWork.fecha_fin){
        throw new Error('Fecha Fin es menor a Fecha Inicio');
    }
    //Logica del Negocio del calculo de horas
    if(day < 7 && end_day < 7){               //Mira si la fecha inicial y final estan dentro del intervalo Lunes a sabado
        
        if(start.hours() > 7 && start.hours() < 20 ){  //Si esta en el horario laboral normal laboral entre: 7 a.m y 8 p.m
            
            if(end.hours() > 7 && end.hours() < 20){ 
                newWork.horasNormales = end.diff(start, 'h');  
                 
                if(newWork.horas > 8){
                    newWork.horasNormalesExtras =  newWork.horas - 8;                   

                }         
                
            }else{
                newWork.horasNormales = 20 - start.hours();
                newWork.horasNocturnas = newWork.horas - newWork.horasNormales;
                if(newWork.horas > 8){
                    newWork.horasNocturnasExtras =  newWork.horas - 8;                   

                }    
            }
           
            
        }
    }else {                                                 // Si es domingo
        newWork.horasDominicales = end.diff(start, 'h');
        if(newWork.horas > 8){
            newWork.horasDominicalesExtras =  newWork.horas - 8;                   

        }    
    }
    
   
    await newWork.save()   
    res.send({message : "Work Created"})  
}


worksCtrl.getHours = async (req, res) => {
    
    //const hours = await Work.find({id_tecnico: req.params.id_tecnico, semana: req.params.semana})
    
    Work.aggregate(
        [
            {   
                $group : {
                    _id : {id_tecnico: "$id_tecnico", semana: "$semana"} ,
                    horasNormales: {$sum: "$horasNormales"},
                    horasNocturnas:{$sum:"$horasNocturnas"},
                    horasDominicales: {$sum: "$horasDominicales"},
                    horasNormalesExtras: {$sum: "$horasNormalesExtras"},
                    horasNocturnasExtras: {$sum: "$horasNocturnasExtras"},
                    horasDominicalesExtras: {$sum: "$horasDominicalesExtras"}

                   
                      

                }
            }

        ], 
       
        function(err, result){
            if(err){
                res.send(err)
            } else {
                res.json(result)
            }
        }
       
    );
    
    //res.json(hours)
    
    
   
}

module.exports = worksCtrl;