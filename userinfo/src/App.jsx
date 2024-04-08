import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredUsers(sortedUsers);
    setPastSearches([...pastSearches, searchTerm]);
  };

  return (
    <div className="App flex gap-2 justify-center items-center h-screen mx-auto bg-zinc-800 text-fuchsia-100">
      <div className="max-w-xl w-full">
        <input
          className="mt-4 mb-2 border border-gray-400 rounded-md px-4 py-2 focus:border-blue-500 hover:border-blue-500"
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          onClick={handleSort}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl ml-2"
        >
          Sort by Name
        </button>
        <ol>
          {filteredUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ol>
        <div className="mt-4">
          <h2 className="font-bold text-xl">Past Searches:</h2>
          <ol>
            {pastSearches.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
