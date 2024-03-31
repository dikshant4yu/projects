import { useState } from "react";
import data from "./data";

export default function Accordian() {
    const [selected,setSelected] = useState(null);
    const [enableMultipleSelection,setEnableMultipleSelection] = useState(false);
    const [multiple,setMultiple] = useState([]);

    function handleSingleSelection(currentID){
        setSelected(selected === currentID ? null : currentID);
    }

    function handleMultipleSelection(currentID){
        const copyMultiple = [...multiple];

        const findIndex = copyMultiple.indexOf(currentID);

        if(findIndex === -1){
            copyMultiple.push(currentID);
        }
        else{
            copyMultiple.splice(findIndex, 1);
        }

        setMultiple(copyMultiple);
    }

    return (
        <div className="wrapper">
            <button className="multi" onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}>Enable Multi Selection</button>
            <div className="accordian">
                    {data && data.length > 0 ? (
                        data.map((dataItem) => ( 
                        <div className="item">
                            <div onClick={
                                enableMultipleSelection 
                                ? () => handleMultipleSelection(dataItem.id)
                                : () => handleSingleSelection(dataItem.id)
                                } className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                enableMultipleSelection ? 
                                multiple.indexOf(dataItem.id) !== -1 && ( <div className="content">{dataItem.answer}</div> ) 
                                : selected === dataItem.id && ( <div className="content">{dataItem.answer}</div> )
                            }
                        </div>
                    ) )
                    )
                    : (<div>No data found</div>)
                    }
            </div>
        </div>
    )
}