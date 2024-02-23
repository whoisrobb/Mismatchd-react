import { Button } from "@/components/ui/button";
import { serverUrl } from "@/lib/utils";
import { useState } from "react";


const ProductFilter = () => {
  const [priceFrom, setPriceFrom] = useState<string | null>(null);
  const [priceTo, setPriceTo] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Build query params based on user input
    const filters = {
        priceFrom,
        priceTo,
        order,
        orderBy,
        category,
      };

    // Remove empty query params before fetching
    // for (const key in queryParams) {
    //   if (!queryParams[key]) {
    //     delete queryParams[key];
    //   }
    // }

      try {
        const response = await fetch(`${serverUrl}/store/products/filtered`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters),
        });
        const products = await response.json();

        // Display fetched products (render them using appropriate components)
         console.log(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
      <h3>Product Filters</h3>
      <div>
        <label htmlFor="priceFrom">Price From:</label>
        <input
          type="number"
          id="priceFrom"
          value={priceFrom as string}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="priceTo">Price To:</label>
        <input
          type="number"
          id="priceTo"
          value={priceTo as string}
          onChange={(e) => setPriceTo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">category:</label>
        <input
            type="text"
          id="category"
          value={priceTo as string}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dateFrom">Date From:</label>
        <input
          type="date"
          id="dateFrom"
          value={dateFrom as string}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dateTo">Date To:</label>
        <input
          type="date"
          id="dateTo"
          value={dateTo as string}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="order">Order:</label>
        <select id="order" value={order as string} onChange={(e) => setOrder(e.target.value)}>
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div>
        <label htmlFor="orderBy">Order By:</label>
        <select id="orderBy" value={orderBy as string} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="">Select</option>
          <option value="price">Price</option>
          <option value="createdAt">Date</option>
          {/* Add more options based on your model */}
        </select>
      </div>
      <Button type="submit">Filter Products</Button>
    </form>
  );
};

export default ProductFilter;
