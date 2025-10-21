"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface ItemSelectorProps<T> {
    items: T[];
    onChange?: (selected: T[]) => void;
    renderItem?: (item: T, isSelected: boolean) => ReactNode;
    itemKey?: (item: T) => string | number;
    defaultSelected?: T[];
}

export default function ItemSelector<T>({
    items,
    onChange,
    renderItem,
    itemKey,
    defaultSelected,
}: ItemSelectorProps<T>) {
    const [selectedItems, setSelectedItems] = useState<T[]>(defaultSelected ?? items);

    // ref to manually control indeterminate state
    const selectAllRef = useRef<HTMLInputElement>(null);

    const allSelected = selectedItems.length === items.length;
    const noneSelected = selectedItems.length === 0;
    const partiallySelected = !allSelected && !noneSelected;

    // update indeterminate visual state
    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = partiallySelected;
        }
    }, [partiallySelected]);

    // notify parent
    useEffect(() => {
        onChange?.(selectedItems);
    }, [selectedItems, onChange]);

    const toggleItem = (item: T) => {
        setSelectedItems(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    const handleSelectAllToggle = () => {
        if (allSelected) {
            // all selected → clear all
            setSelectedItems([]);
        } else {
            // none or partial → select all
            setSelectedItems(items);
        }
    };

    return (
        <div className="p-4 rounded-xl shadow-sm bg-white space-y-3">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    ref={selectAllRef}
                    checked={allSelected}
                    onChange={handleSelectAllToggle}
                    className="cursor-pointer w-4 h-4"
                />
                <span
                    onClick={handleSelectAllToggle}
                    className="select-none cursor-pointer text-sm text-blue-800"
                >
                    全选
                </span>
            </div>

            <ul className="divide-y divide-gray-100">
                {items.map(item => {
                    const key = itemKey ? itemKey(item) : (item as unknown as string);
                    const isSelected = selectedItems.includes(item);

                    return (
                        <li
                            key={key}
                            onClick={() => toggleItem(item)}
                            className={`cursor-pointer px-3 py-2 rounded-lg transition flex items-center gap-2 border ${isSelected
                                    ? "bg-blue-50 border-blue-200"
                                    : "border-transparent hover:bg-gray-50"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={isSelected}
                                readOnly
                                className="cursor-pointer"
                            />
                            {renderItem ? renderItem(item, isSelected) : <span>{String(item)}</span>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
