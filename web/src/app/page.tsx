"use client";

import List, { ItemState, ToDoItem } from "@/components/list";
import Selector from "@/components/selector";
import { useState, useActionState } from "react";

export default function Home() {
    // Feel free to add new items
    let [sample_list, update_sample_list_state] = useState<ToDoItem[]>([
        {
            task_name: "Do laundry",
            task_description: "Clean, dry, and fold clothes",
            task_state: "TODO",
            id: 0,
        },
        {
            task_name: "Iron shirts",
            task_description: "Iron suit and cotton pants",
            task_state: "TODO",
            id: 1,
        },
        {
            task_name: "Refill cat feeder",
            task_description: "Buy new cat food and fill automatic feeder",
            task_state: "DONE",
            id: 2,
        },
        {
            task_name: "Build IKEA desk",
            task_description: "Desk arrives 10/24",
            task_state: "TODO",
            id: 3,
        },
        {
            task_name: "Update website",
            task_description: "Add recent projects",
            task_state: "DONE",
            id: 4,
        },
    ]);

    let [filters, set_filters] = useState(
        new Map([
            ["TODO", true],
            ["DONE", false],
        ]),
    );

    function filter_list(filters: Map<string, boolean>): ToDoItem[] {
        return sample_list
            .filter((v) => filters.get(v.task_state))
            .sort((l, r) => (l.task_state < r.task_state ? 1 : 0));
    }

    let [filtered_list, set_filtered_list] = useState(filter_list(filters));

    function handle_list_update(item_id: number, state: ItemState) {
        let item = sample_list.findIndex((v) => v.id === item_id);
        if (item === -1) return;
        sample_list[item].task_state = state;

        update_sample_list_state(sample_list);
    }

    function handle_selector_update(item: string, state: boolean) {
        filters.set(item, state);
        set_filters(filters);
        // HACK: Clear the list and set it properly after a short delay.
        set_filtered_list([]);
        setTimeout(() => set_filtered_list(filter_list(filters)));
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Selector options={filters} updater={handle_selector_update} />
            <List
                items={filtered_list}
                item_state_update={handle_list_update}
            />
        </main>
    );
}
