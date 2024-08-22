import ListItem from "./list-item";
import "./list.css";

export type ItemState = "TODO" | "DONE";

export type ToDoItem = {
    task_name: string;
    task_description: string;
    task_state: ItemState;
    id: number;
};

export type ListParams = {
    items?: ToDoItem[];
    item_state_update?: (id: number, state: ItemState) => void;
};

/**
 * A list of items to be done.
 *
 * Contains several samples to display the component.
 */
export default function List({ items, item_state_update }: ListParams) {
    function handle_update(id: number) {
        if (typeof item_state_update !== "undefined")
            return (state: ItemState) => item_state_update(id, state);
        else return (_: ItemState) => {};
    }

    let list_items: JSX.Element[] = [];
    if (typeof items !== "undefined")
        items.map((i) =>
            list_items.push(
                <ListItem
                    task_name={i.task_name}
                    task_description={i.task_description}
                    task_state={i.task_state}
                    on_update={handle_update(i.id)}
                    key={i.id}
                />,
            ),
        );

    return <div className="todo-list">{list_items}</div>;
}
