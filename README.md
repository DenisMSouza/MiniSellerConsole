# Mini Seller Console

A lightweight React application for managing leads and converting them into opportunities. Built with modern React patterns, Tailwind CSS, and Shadcn/ui components.

## Features

- **Leads Management**: View, filter, and edit lead information
- **Lead Conversion**: Convert leads into opportunities with a single click
- **Opportunities Tracking**: Manage your sales pipeline and opportunities
- **Responsive Design**: Mobile-friendly interface with card and table views
- **Real-time Filtering**: Search by name/company and filter by status
- **Data Persistence**: Automatic data storage in localStorage
- **Simulation Features**: Configurable loading delays and error simulation for testing

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mini-seller-console
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Configuration Features

The app includes a configuration panel accessible via the "Config" button in the header. This allows you to simulate real-world scenarios for testing and development.

### Simulation Settings

- **Simulate Errors**: Toggle error simulation on/off
- **Error Chance**: Set the probability of errors occurring (0-100%)
- **Leads Delay**: Configure loading delay for leads data (milliseconds)
- **Opportunities Delay**: Configure loading delay for opportunities data (milliseconds)

### Data Management

- **Reset App Data**: Clear all stored data and reload from original JSON files
- **Reset Config**: Reset simulation settings to defaults

### Use Cases

- **Development**: Test error handling and loading states
- **Demo**: Simulate network delays for realistic presentations
- **Testing**: Verify error recovery and user experience

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DataTable.js    # Desktop table view
│   ├── DataCards.js    # Mobile card view
│   ├── ResponsiveDataView.js # Responsive data display
│   ├── PageHeader.js   # Reusable page headers
│   └── ...
├── pages/              # Page components
│   ├── LeadsPage.js    # Leads management page
│   └── OpportunitiesPage.js # Opportunities page
├── hooks/              # Custom React hooks
│   ├── useLeadsData.js # Leads data management
│   ├── useOpportunitiesData.js # Opportunities data management
│   └── ...
├── utils/              # Utility functions
├── data/               # Sample JSON data
└── contexts/           # React contexts
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality UI components
- **React Router**: Client-side routing
- **Local Storage**: Data persistence

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
