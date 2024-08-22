import { useState } from "react";
import "./list-item.css";
import { ItemState } from "./list";

export type ListItemParams = {
    task_name: string;
    task_description: string;
    task_state: ItemState;
    on_update: (state: ItemState) => void;
};

export default function ListItem({
    task_name,
    task_description,
    task_state,
    on_update,
}: ListItemParams) {
    let [state, set_state] = useState(task_state);
    return (
        <div className="list-item">
            <button
                className="tickbox"
                onClick={() => {
                    if (state === "TODO") {
                        set_state("DONE");
                        on_update("DONE");
                    } else {
                        set_state("TODO");
                        on_update("TODO");
                    }
                }}
            >
                {state}
            </button>
            <div className="details">
                <h2>Task: {task_name}</h2>
                <p>{task_description}</p>
            </div>
        </div>
    );
}
