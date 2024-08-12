import { useState } from "react"
import Star from "./Reusables/Star"

const containerStyle = {
    'display' : 'flex',
    'alignItems' : 'center',
    'gap': '16px'
}

const starContainerStyle = {
    'display' : 'flex'
}

export default function StarRating ({maxratings=5, color='#FFD700', size=32, rating, setRating}) {
    
    const [temporaryRating, setTemporaryRating] = useState(0)
    const textStyle = {
        'lineHeight' : "1",
        'margin' : '0',
        'color' : color,
        'fontSize' : `${size/1.5}px`
    }
    return <div style={containerStyle}>
        <div style={starContainerStyle}>
            {Array.from({length: maxratings}, (_,i)=> <Star
            key={i} 
            size={size}
            color={color}
            full={temporaryRating===0? rating>=i+1 : temporaryRating>=i+1} 
            onClick={()=> setRating(i+1)}
            onHoverIn={()=> setTemporaryRating(i+1)}
            onHoverOut={()=> setTemporaryRating(0)}
            ></Star>)}
        </div>
        <p style={textStyle}>{temporaryRating || rating || ''}</p>
    </div>
}