import React from 'react';
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MySelect
                defaultValue='Сортировка'
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            />
            <MyInput
                type="text"
                placeholder="Поиск..."
                value={filter.query}
                onChange={event => setFilter({ ...filter, query: event.target.value })}
            />
        </div>
    );
};

export default PostFilter;