import imageUrl from "../assets/Detective-check-footprint.png"

const EmptyList : React.FC<{}> = ()=>{
    return (
        <div style={{textAlign : "center"}} >
            <img src={imageUrl}/>
            <p style={{color : "#efebeb"}} >Empty List</p>
        </div>
    )
}

export default EmptyList