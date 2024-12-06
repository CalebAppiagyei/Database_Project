import React, { useState } from "react";

function AddForm(props){
    const [formData, setFormData] = useState({name:"", team:"", position:""});
    return(
        <>
        <div className="overlay" onClick={() => props.setAddModalVisible(false)} />
            <div className="modal">
                <h2>{`Add to Players`}</h2>
                <form>
                    <div>
                        Name 
                        <input type="text" value={formData["name"]} placeholder="PlayerName" onChange={(e) => setFormData({...formData, ["name"]: e.target.value})}></input>
                    </div>
                    <div>
                        Position
                        <input type="text" value={formData["position"]} placeholder="Position" onChange={(e) => setFormData({...formData, ["position"]: e.target.value})}></input>
                    </div>
                    <div>
                        Team
                        <input type="text" value={formData["team"]} placeholder="Team" onChange={(e) => setFormData({...formData, ["team"]: e.target.value})}></input>
                    </div>
                    <button type="submit" onClick={() => props.handleAdd(formData)}>Submit</button>
                    <button type="button" onClick={() => {props.setAddModalVisible(false); setFormData({})}}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default AddForm;