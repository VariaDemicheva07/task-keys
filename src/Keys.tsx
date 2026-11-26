import React, { useMemo, useState } from 'react';
import { IItem } from './index';

interface KeysProps {
    initialData: IItem[];
    sorting: 'ASC' | 'DESC';
}

export function Keys({ initialData, sorting }: KeysProps) {
    const [items, setItems] = useState<IItem[]>(initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [draft, setDraft] = useState('');

    const sortedItems = useMemo(() => {
        const copy = [...items];
        copy.sort((a, b) => (sorting === 'ASC' ? a.id - b.id : b.id - a.id));
        return copy;
    }, [items, sorting]);

    const save = () => {
        if (editingId !== null) {
            setItems(
                items.map((item) =>
                    item.id === editingId ? { ...item, name: draft } : item,
                ),
            );
        }
        setEditingId(null);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            save();
        } else if (event.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <ul>
            {sortedItems.map((item) =>
                editingId === item.id ? (
                    <li key={item.id}>
                        <input
                            autoFocus
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </li>
                ) : (
                    <li
                        key={item.id}
                        onClick={() => {
                            setEditingId(item.id);
                            setDraft(item.name);
                        }}
                    >
                        <span>{item.name}</span>
                    </li>
                ),
            )}
        </ul>
    );
}
