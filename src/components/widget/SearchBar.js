import React, { useState } from 'react';

const SearchBar = () => {
const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};

const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchTerm);
};

return (
    <div>
    <form onSubmit={handleSearchSubmit}>
        <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleSearchChange}
        />
        <button type="submit">검색</button>
    </form>
    </div>
);
};

export default SearchBar;
