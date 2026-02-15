import "./die.css"
export default function Die({data, hold}){
    let styles = {
        backgroundColor : "#59E391"
    }

    return(
        <button 
            className="dies" 
            style={data.isHeld ? styles : null} 
            onClick={() => {hold(data.id)}}
            aria-pressed={data.isHeld}
            aria-label={`Die with value ${data.value}, ${data.isHeld ? "held" : "not held"}`}
        >
            {data.value}
        </button>
    )
}