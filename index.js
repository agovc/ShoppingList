import React, { useState, useCallback } from 'react';
import ReactDOM from "react-dom";
import '/styles';
import { debounce, getFoodApi } from "./foodApi";

function App() {
    return(<ShoppingList />);
}

function ShoppingList() {
    const [results, setResults] = useState([]);
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    const getFood = async value => {
        const results = await getFoodApi(value);
        setResults(results);
    }

    const _handleInputChange = useCallback(async (e) => {
        const value = e.target.value;

        if (value.length > 1) {
            const getFoodDebounced = debounce(await getFood, 1000);
            getFoodDebounced(value);
        }

        setInputText(value);

    }, []);

    const _handleItemClick = result => {
        const newItem = {
            name: result,
            checked: false
        }
        const currentItems = [...items, newItem];

        setItems(currentItems);
        _clearResults();
    };

    const _handleDeleteItem = index => {
        const currentItems = items.filter((_, itemIndex) => {
            return index !== itemIndex;
        });

        setItems(currentItems);
    };

    const _handleCheckItem = index => {
        const currentItems = items.map((item, currentIndex) => {
            if (index === currentIndex) {
                const checked = item.checked;
                item.checked = !checked;
            }
            return item;
        })

        setItems(currentItems);
    };

    const _clearResults = () => {
        setInputText("");
        setResults([]);
    }


    return (
        <div>
            <h1>Shopping List</h1>
            <input value={inputText} onChange={_handleInputChange} list="results" type="text" />
            <div>
                {results.map((result, index) => {
                    return <div onClick={() => _handleItemClick(result)} key={`${result}-${index}`}>{result}</div>
                })}
            </div>
            {items.length > 0 && items.map((item, index) => {
                return <ListItem key={index} id={index} name={item.name} checkItem={_handleCheckItem} checked={item.checked} deleteItem={_handleDeleteItem} />
            })}
        </div>
    )
};

function ListItem(props) {
    const { name, checked, checkItem, id, deleteItem } = props;

    const _handleDelete = () => {
        deleteItem(id);
    }

    const _handleChecked = () => {
        checkItem(id);
    }

    return (
        <div className="list-item">
            <div className="item">
                <div onClick={_handleChecked} className={["checkmark", checked ? "checked" : "unchecked"].join(" ")}>✓</div>
                <div className={checked ? "checked-name" : ""}>{name}</div>
            </div>
            <div className={checked ? "checked-cross" : ""} onClick={_handleDelete}>X</div>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById("root"))