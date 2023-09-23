export const joyrideSteps = [
  {
    target: 'body',
    content: (
      <>
        <h2>Hello! This is you'r guide through the application </h2>
        <p>When you click "next", it will start the tour.</p>
      </>
    ),
    disableBeacon: true,
  },
  {
    target: '#loads-container',
    content: (
      <>
        <h2>Loads List</h2>
        <p>
          You can browse all the loads added by the application users. You can click on them to open
          the map and view details! Orders can be accepted or removed (only your offers).
        </p>
      </>
    ),
  },
  {
    target: '#load-filters',
    content: (
      <>
        <h2>Loads Filters</h2>
        <p>
          These are filters for loads. You can set them and submit the form. After that, a new tab
          with your filters will be added Press next to check where you can find tabs with filtered
          loads.
        </p>
      </>
    ),
  },
  {
    target: '#filters-cards',
    content: (
      <>
        <h2>Filters Cards</h2>
        <p>
          After adding your filters, you will find there your tab with filters. Just select the tab,
          and you will get your filtered loads! You can always go back to loads with no filters by
          pressing on "All loads" tab.
        </p>
      </>
    ),
  },
  {
    target: '#fleet-container',
    content: (
      <>
        <h2>Fleet Subpage</h2>
        <p>In fleet subpage, you can browse list of vehicles, add or edit them</p>
      </>
    ),
  },
  {
    target: '#select-orders',
    content: (
      <>
        <h2>Orders Menu</h2>
        <p>
          You can browse all your orders here, select type of orders to see the list of them.
          Published orders are your own orders that you placed. Received orders are all orders that
          you accepted
        </p>
      </>
    ),
  },
  {
    target: '#select-orders-input',
    content: (
      <>
        <h2>Select type of Published Orders</h2>
        <p>
          With this selection option you can choose beetween published and accepted orders. Accepted
          orders are a list of orders that you published and other users accepted them
        </p>
      </>
    ),
  },
  {
    target: '#received-orders-list',
    content: (
      <>
        <h2>Received Orders</h2>
        <p>
          Here, you can browse your received orders. If you want to invoice an order, you first have
          to select a vehicle.
        </p>
      </>
    ),
  },
  {
    target: '#invoice-list-container',
    content: (
      <>
        <h2>Invoices</h2>
        <p>This is a list of all invoices you've made. For each one, you can download a PDF file</p>
      </>
    ),
  },
  {
    target: '#add-invoice-container',
    content: (
      <>
        <h2>Adding an Invoice</h2>
        <p>
          To add an invoice, simply select one of the buttons. You can add single invoice or
          collective invoice with multiple orders (only for the same client)
        </p>
      </>
    ),
  },
];
