import { useState } from "react";

export type SelectorItemParams = {
    title: string;
    selected: boolean;
    on_select?: (state: boolean) => void;
};

/**
 * A single Selector Item. States can be "selected" and "not selected".
 */
export default function SelectorItem({
    title,
    selected,
    on_select,
}: SelectorItemParams) {
    let [classes, update_classes] = useState(
        selected ? "option selected" : "option",
    );

    let [is_selected, update_selected] = useState(selected);

    return (
        <button
            className={classes}
            onClick={() => {
                update_selected(!is_selected);
                if (is_selected) update_classes("option selected");
                else update_classes("option");
                if (typeof on_select !== "undefined") on_select(is_selected);
            }}
        >
            {title}
        </button>
    );
}
