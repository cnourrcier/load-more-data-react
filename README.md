# Load More Data

This project is a React component that dynamically fetches and displays a list of products from a given API. The component uses several hooks (useState, useEffect, and useRef) to manage the state and lifecycle of the data fetching process.

Key Features:

- Data Fetching: It fetches product data from a specified url in batches defined by a limit prop. Each batch is appended to the existing list of products.

- State Management: It maintains states for the product list, loading status, error messages, button disable status, and fetch count.

- Conditional Rendering: It displays a loading message while data is being fetched and shows an error message if the fetch fails.

- Button Disable Logic: The "Load More Products" button is disabled after fetching a total of 100 products.

- Product Display: Fetched products are displayed in a container with each product showing its ID, thumbnail, and title.