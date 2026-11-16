import {useReducer, useEffect} from 'react'


const estadoInicial = {
        luz: "rojo",
        averia: false,
        ciclos: 0
    }

    function semaforoLuces(state, action){
        switch(action.type){
            case 'AVANZAR':
                if(state.averia){
                    return state;
                }

                if(state.luz === 'rojo'){
                    return { ...state, luz:'verde'}
                }

                if(state.luz === 'verde'){
                    return { ...state, luz:'amarillo'}
                }

                if(state.luz === 'amarillo') {
                    return {
                        ...state,
                        luz: 'rojo',
                        ciclos: state.ciclos + 1
                    }
                }

                return state;

                case 'AVERIA':
                    return {
                        ...state,
                        averiado:true,
                        luz: 'amarillo'
                    }
                case 'REPARAR':
                    return {
                        ...state,
                        luz:'rojo',
                        averiado: false
                    }

                case 'RESET':
                    return estadoInicial
                default:
                    throw new Error(`Acción desconocida: ${action.type}`)
        }
    }

function Semaforo() {

    const [state, dispatch] = useReducer(semaforoLuces, estadoInicial)

    return(
        <div>
            <div className='Semaforo'>
                <span className={`Rojo ${state.luz === 'rojo' ? 'encendido' : ''}`}></span>
                <span className={`Amarillo ${state.luz === 'amarillo' ? 'encendido' : ''}`}></span>
                <span className={`Verde ${state.luz === 'verde' ? 'encendido' : ''}`}></span>
            </div>

            <button onClick={() => dispatch({ type: 'AVANZAR'})}>Avanzar</button>
            <button onClick={() => dispatch({ type: 'AVERIA'})}>Avería</button>
            <button onClick={() => dispatch({ type: 'REPARAR'})}>Reparar</button>
            <button onClick={() => dispatch({ type: 'RESET'})}>Resetear</button>
        </div>
    )
    
}

export default Semaforo