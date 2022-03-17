import React from "react";

const NewEventForm = ({event, method, onHideModal, onChangeField, onFetch}) => {

    const buttonText = method === "Update" ? "Update" : "Create";

    return <div>
        <form action="#">
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={event.title} onChange={e=> onChangeField(e.currentTarget.value, "title")}/>
            </div>
            <div>
                <label htmlFor="content">Description</label>
                <input type="text" id="content" value={event.content} onChange={e=> onChangeField(e.currentTarget.value, "content")}/>
            </div>
            <div>
                <button onClick={onHideModal}>Close</button>
                <button onClick={()=> {onFetch(method)}}>{buttonText}</button>
            </div>
        </form>
    </div>
};

export default NewEventForm;
