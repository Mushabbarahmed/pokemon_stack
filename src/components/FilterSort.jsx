// src/components/FilterSort.jsx

const FilterSort = ({ onSort }) => {
    return (
      <div className="mt-4 mb-4">
        <label className="mr-2">Sort by:</label>
        <select onChange={(e) => onSort(e.target.value)} className="p-2 border rounded">
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>
    );
  };
  
  export default FilterSort;
  