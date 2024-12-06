import React, { useState } from "react";

function EditForm(props){
    const [formData, setFormData] = useState({name:"", team:"", position:""});

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            props.handleEdit(props.editObj.id, formData);
            props.closeEdit();
        } catch (err) {
            console.error("Error in EditForm submission:", err);
        }
    };

    return(
        <>
        <div className="overlay" onClick={() => props.closeEdit()} />
            <div className="modal">
                <h2>{`Edit Player`}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        ID
                        <input type="text" disabled={true} value={props.editObj.id}></input>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        Name 
                        <input type="text" value={formData["name"]} placeholder={props.editObj.name} onChange={(e) => setFormData({...formData, ["name"]: e.target.value})}></input>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        Position
                        <input type="text" value={formData["position"]} placeholder={props.editObj.pos} onChange={(e) => setFormData({...formData, ["position"]: e.target.value})}></input>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        Team
                        <input type="text" value={formData["team"]} placeholder={props.editObj.team} onChange={(e) => setFormData({...formData, ["team"]: e.target.value})}></input>
                    </div>
                    <button type="submit" onClick={() => props.handleEdit(props.editObj.id, formData)}>Submit</button>
                    <button type="button" onClick={() => {props.closeEdit()}}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default EditForm;