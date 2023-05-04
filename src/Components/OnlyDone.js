export default function OnlyDone ({setHideUnfinished}) {

    const toggleDone = (event) => {
        const newState = event.target.checked
        setHideUnfinished(newState)
    }
    
    return (
        <>
            <form onChange={toggleDone}>
                <label>Only show finished workouts</label>
                <input type='checkbox'></input>
            </form>
        </>
    )
}