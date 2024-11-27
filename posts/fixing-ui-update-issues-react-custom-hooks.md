---
title: "Fixing UI Update Issues with Custom Hooks in React"
date: 27-11-2024
fullDate: Monday, 27 November 2024
tags: React
image: /posts-images/fix-ui-custom-hooks/fix-ui-custom-hook.png
description: "Having issues with React UI updates? This article explains how lifting state to a shared parent component can fix inconsistent UI and synchronize state"
---

## Identifying UI Update Problem

If you’ve been working with state management in React, you’ve likely encountered this frustrating scenario: your state updates correctly ( as seen in the React DevTools or console logs), but your UI doesn’t reflect those changes.

I recently encountered this challenge while working with a React custom hook, and I'd like to share how I resolved it.

The code snippet below shows the project structure I was working with.

```jsx
// useCustomHook.jsx

function useCustomHook() {
    const [data, setData] = useState(stateData);
    const [location, setLocation] = useState("state");

    const handleLocationChange = (selectedLocation) => {
        if (selectedLocation === "state") {
            setLocation("state");
            setData(stateData);
        } else if (selectedLocation === "country") {
            setLocation("country");
            setData(countryData);
        }
    };
    return {
        data,
        location,
        handleLocationChange
    };
}

export default useCustomHook;
```

```jsx
// App.jsx

import useCustomHook from "./useCustomHook";
import LocationFilter from "./LocationFilter";
import Table from "./Table";
import "./App.css";

export function App() {
  const { data } = useCustomHook();

  return (
    <div className="App">
      <LocationFilter />
      <Table data={data} />
    </div>
  );
}

export default App;
```

```jsx
// LocationFilter.jsx

import useCustomHook from "./useCustomHook";

function LocationFilter() {
  const { location, handleLocationChange } = useCustomHook();

  const handleFilterByState = () => {
    handleLocationChange("state");
  };

  const handleFilterByCountry = () => {
    handleLocationChange("country");
  };

  return (
    <div>
      <button onClick={handleFilterByState}>View State Data</button>
      <button onClick={handleFilterByCountry}>View Country Data</button>
    </div>
  );
}

export default LocationFilter;
```

I created a custom hook to manage state changes when users click the button to view either state-specific or country-wide data.

In `App.jsx`, which serves as the parent component, the custom hook is called to access the `data` state and passes it down to the `Table` component (child) as props.

In `LocationFilter` component, I initially instantiated the custom hook directly to access the `location` and `handleLocationChange` state, which was intended to manage the data displayed in the table according to a “state” or “location” filter.”

However, when I click the `view state data` or `view country data` button, there is no change in the UI.

I checked the location state inside the `LocationFilter` component using the React Developer Tools, and I saw that the `location` and `data` states were updating as expected with the correct value. However, the UI did not reflect the changes to the data state when I clicked the button.

<video class='video-container' src="/posts-images/fix-ui-custom-hooks/ui-not-updating.mp4" width="640" height="auto" controls></video>

## What Caused My React State Management Issues?


> 💡 My initial approach seemed logical: I assumed that calling the custom hook in each component would allow each to access and share the same state instance.


#### Flowchart: Before Lifting State Up
![flowchart-diagram-before-state](/posts-images/fix-ui-custom-hooks/mermaid-flowchart-before-state.png)

- **Independent hook Instance**: Calling `useCustomHook` in `LocationFilter` created a separate instance of the hook state for that component. Each component maintains its own state, so state updates in the `LocationFilter` component don't affect the state in `App` component.
- **State synchronisation issue:** Clicking the button does not update the `App` component's state, leading to a mismatch between the parent and child components. As the parent's state remains unchanged, the UI doesn't reflect updates from the child, preventing re-renders in both components.

## The Solution: Lifting State Up

React does not synchronise state between components unless you pass it down via props or context. To resolve this, I removed the state hook call from `LocationFilter` component, fetched the state needed in the `App` component, and passed it down as props to the `LocationFilter` component. This ensures both components share the same state, changes in the `App`, syncing both components data.

#### Flowchart: After Lifting State Up
![flowchart-diagram-after-state](/posts-images/fix-ui-custom-hooks/mermaid-flowchart-after-state.png)

**Here’s the updated code for `LocationFilter` and `App`**

```jsx
// LocationFilter.jsx

function LocationFilter({ location, handleLocationChange }) {
  const handleFilterByState = () => {
    handleLocationChange("state");
  };

  const handleFilterByCountry = () => {
    handleLocationChange("country");
  };

  return (
    <div>
      <button onClick={handleFilterByState}>View State Data</button>
      <button onClick={handleFilterByCountry}>View Country Data</button>
    </div>
  );
}

export default LocationFilter;
```

```jsx
// App.jsx

import useCustomHook from "./useCustomHook";
import LocationFilter from "./LocationFilter";
import Table from "./Table";
import "./App.css";

export function App() {
  const { data, location, handleLocationChange } = useCustomHook();

  return (
    <div className="App">
      <LocationFilter
        location={location}
        handleLocationChange={handleLocationChange}
      />
      <Table data={data} />
    </div>
  );
}

export default App;
```

<video class='video-container' src="/posts-images/fix-ui-custom-hooks/ui-updating.mp4" width="640" height="auto" controls></video>

### Conclusion

This experience has deepened my understanding of custom hooks and highlighted the importance of strategic state placement in React. While custom hooks allow you to share logic across components, they do not let you share state.

When managing state, prioritize keeping it in the component that primarily owns and uses it. If other components depend on updates from that state, consider lifting only the necessary data to a shared parent to ensure synchronized and consistent UI updates, without causing unnecessary re-renders.

For more detailed information, refer to the [React documentation on Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) and [Lifting State Up](https://react.dev/learn/sharing-state-between-components#step-2-pass-hardcoded-data-from-the-common-parent).
