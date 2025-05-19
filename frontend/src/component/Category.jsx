import React from 'react';
import { useFilterContext } from '../context/FilterContext';

const FilterCategory = () => {
    const { all_products, updateFilterValue } = useFilterContext();

    const getUniqueData = (data, property) => {
        const values = data.map((item) => item[property]);
        return ["All", ...new Set(values)];
    };

    const plantType = getUniqueData(all_products, "plantType");



    const handleChange = (e) => {
        updateFilterValue({ target: { name: "plantType", value: e.target.value } });
    };
    return (



        <div className='flex justify-center items-center m-2'>
            <h3 className='text-lg font-medium'>Select Plant Type</h3>
            <select name="plantType" value={plantType} onChange={handleChange} className='text-center border'>
                {plantType.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>



        </div>
    );
};

export default FilterCategory;
