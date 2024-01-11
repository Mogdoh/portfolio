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
        placeholder="검색"
        value={searchTerm}
        onChange={handleSearchChange}
        />
    </form>
    </div>
);
};

export default SearchBar;
