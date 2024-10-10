// src/components/Pagination.jsx

const Pagination = ({ offset, setOffset, limit }) => {
    const handleNext = () => {
      setOffset(prev => prev + limit); // Move to the next set of Pokémon
    };
  
    const handlePrev = () => {
      setOffset(prev => Math.max(prev - limit, 0)); // Move to the previous set of Pokémon
    };
  
    return (
      <div className="flex justify-center mt-4">
        <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded mr-2" disabled={offset === 0}>Previous</button>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
    );
  };
  
  export default Pagination;
  