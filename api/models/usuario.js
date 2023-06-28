//Migracion 
const {Schema, model}=require('mongoose')

const UsuarioSchema= Schema({
    //se define tipos de datos
    documento:{
        
        type: Number,
        required: [true,'El campo documento es requerido']

    },
    nombre:{
        type: String,
        required:[true, 'El nombre es requerido'],
        
    },

    nota1:{
        type:Number,
        required:[true, 'la nota1 es requerido'],
        min: 0,
        max:5.0

    },

    nota2:{
        type:Number,
        required:[true, 'la nota2 es requerido'],
        min: 0,
        max:5.0
    },

    nota3:{
            type:Number,
            required:[true, 'la nota3 es requerido'],
            min: 0,
            max:5.0
    
        },
    promedio:{
        type: Number,
        
    },
    observaciones:{
        type: String,
        required:[true, 'la observacion es requerida'],
        
    },
})
//este es el nombre del objeto Usuario
module.exports = model('Usuario', UsuarioSchema)//Exportar el modelo

