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
                        averia:true,
                        luz: 'amarillo'
                    }
                case 'REPARAR':
                    return {
                        ...state,
                        luz:'rojo',
                        averia: false
                    }

                case 'RESET':
                    return estadoInicial
                default:
                    throw new Error(`Acción desconocida: ${action.type}`)
        }
    }

function Semaforo() {

    const [state, dispatch] = useReducer(semaforoLuces, estadoInicial)

    useEffect(() => {
        if(state.averia) return

        let tiempo = 0
        if(state.luz === 'rojo'){
            tiempo = 4000
        } 

        if(state.luz === 'amarillo'){
            tiempo = 1000
        } 

        if(state.luz === 'verde'){
            tiempo = 3000
        } 

        const timer = setTimeout(() => {
            dispatch({ type: 'AVANZAR' })
        }, tiempo)

        return () => clearTimeout(timer)
    }, [state.luz, state.averia])

    return(
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center ">
            <h2 className="mb-3">Ciclos completados: <span className="badge bg-secondary">{state.ciclos}</span></h2>

            {state.averia && <div className="alert alert-danger py-1 px-3 mb-3"> Semáforo averiado</div>}

            <br />

            <div className='semaforo-caja mb-4'>
                <span className={`luz rojo ${state.luz === 'rojo' && !state.averia ? 'encendido' : ''}`}></span>
                <span className={`luz amarillo ${state.averia ? 'parpadeo' : (state.luz === 'amarillo' ? 'encendido' : '')}`}></span>
                <span className={`luz verde ${state.luz === 'verde' && !state.averia ? 'encendido' : ''}`}></span>
            </div>

            <br />

            <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'AVANZAR'})}>Avanzar</button>
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'AVERIA'})}>Avería</button>
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'REPARAR'})}>Reparar</button>
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'RESET'})}>Resetear</button>
            </div>
            
        </div>
    )
    
}

export default Semaforo