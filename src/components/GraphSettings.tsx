type Props = {
    groupBy: "description" | "amount-range";
    setGroupBy: React.Dispatch<React.SetStateAction<"description" | "amount-range">>;
  };
  
  const GraphSettings = ({ groupBy, setGroupBy }: Props) => {
    return (
      <div className="border border-blue-500 p-4 bg-white">
        <h2 className="font-bold mb-2">Graph Settings</h2>
        <label className="mr-2 font-medium">Group by:</label>
        <select
            className="border p-1"
            value={groupBy}
            onChange={(e) => {
                const value = e.target.value as "description" | "amount-range" | "category";
                setGroupBy(value);
            }}
            >
            <option value="description">Description</option>
            <option value="amount-range">Amount Range</option>
            <option value="category">Category</option>
        </select>

        
      </div>
    );
  };
  
  export default GraphSettings;
  