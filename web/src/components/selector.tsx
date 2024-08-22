import "./selector.css";
import SelectorItem, { SelectorItemParams } from "./selector-item";

export type SelectorCallback = (item: string, selected: boolean) => void;

export type SelectorParams = {
    options: Map<string, boolean>;
    updater?: SelectorCallback;
};

/**
 * Selector to filter tasks by state (TODO, DONE, or both)
 */
export default function Selector({ options, updater }: SelectorParams) {
    function handle_update(item: string) {
        if (typeof updater !== "undefined")
            return (state: boolean) => updater(item, state);
        else return (_: boolean) => {};
    }

    let selections: JSX.Element[] = [];

    options.forEach((state, title) => {
        selections.push(
            <SelectorItem
                selected={state}
                title={title}
                on_select={handle_update(title)}
                key={title}
            />,
        );
    });

    return <div className="selector">{selections}</div>;
}
