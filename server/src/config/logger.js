import pino from 'pino'

export default pino({
    level:'info',
    transport:{
        target:'pino-pretty',
        
    }

})