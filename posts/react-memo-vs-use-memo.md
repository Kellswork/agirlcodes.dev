---
title: 'React Memo vs useMemo'
date: 11-03-2024
fullDate: Monday, 11 March 2024
tags: React
image:
description: "In this article, I am going to share a revised version of what memo and useMemo do. I will answer the question: should you wrap every prop with memo and useMemo? I will discuss when to use and when not to use memo and useMemo, and how to optimize with memo and useMemo"
url: '/react-memo-vs-use-memo'
---

In this article, I am going to share a revised version of what `memo` and `useMemo` do. I will answer the question: should you wrap every prop with `memo` and `useMemo`? I will discuss when to use and when not to use `memo` and `useMemo`, and how to optimize with `memo` and `useMemo`. Finally, I will conclude on which is better.

## What is Memoization?

Memoization is a performance optimization. It is used to cache return values from expensive calculations. Unnecessary re-rendering can affect the performance of our app. React should not have to go through the render phase only to discard the output. Memoization only lets your component re-render when dependencies aren't the same.

## What does `memo()` do?

While working with React components, you often pass state data as props from the parent to its child components. If the state in the parent component changes, React will re-render the parent component and its child components; it does not matter if the child component was receiving the data as props or not; React will re-render the child components because the parent component re-rendered.

With `memo`, you can skip re-rending a child component when the props passed to it from the parent component did not change. So, If you change the state in the parent component that has no business with the child component, it doesn't affect the child component, and the child component does not re-render. React will reuse the render output from the previous render.

`memo` is a higher-order component used for optimising rendering behaviour.

```javascript

export const ChildComponent = memo(function ChildComponent(){})

or 

const ChildComponent = () => {}
export const MemoizedChildComponent = memo(ChildComponent)
```

### How It Works;

**`memo` takes in two parameters;**

1. Component: the component you want to memorize. React returns a new memoised component.
2. `arePropsequal`: This is optional. By default, React uses `[object.is](http://object.is)` to compare the previous props with the new props. You can use your own custom comparison function here if you don't want to use the default.

Memo does a shallow comparison, and it is not advisable to pass complex data as props. Read more about how [object.is](http://object.is) comparison work here.

**For a detailed code example of how `memo` works**, see [skipping re-rendering when props are changed](https://react.dev/reference/react/memo#skipping-re-rendering-when-props-are-unchanged) on the React docs. 

The example in the code sandbox from the official docs shows you how the `Greeting` component re-renders **only** when there is a change in the `names` props. It does not re-render when the `address` props change because it is wrapped in  `memo`.

```javascript
//  code sample from the link to the official docs
import { memo, useState } from 'react';

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  return (
	  // ... code implementation
  );
}

const Greeting = memo(function Greeting({ name }) {

  console.log("Greeting was rendered at", new Date().toLocaleTimeString());

  return <h3>Hello{name && ', '}{name}!</h3>;
});
```

### When should we use `memo`?

- If the component renders often with the same exact props
- if the components rendering logic is expensive
- If you are working
- when your child component is being asked to re-render due to changes in the parent’s state, which do not affect the child's component props anyway.

### When should we not use `memo`

- If your application mostly consists of static pages where changes are mostly based on navigations or replacing a page with another.
- If there is no lag in your component or you do not notice any slow UI responses or glitching, then there is no need to use `memo`
- If the props passed into the component change frequently
- memoising everything could make your component less readable

### What if the child component doesn't have any props

Use the same element reference technique instead bc React automatically optimises the render for you and prevents you from having to add `memo` over your code base. Thisis the same thing as [passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children).

### Incorrect Optimization with React Memo

**Updating a memoised component using state or a context.**

A component wrapped with `memo` will still be re-rendered when its own **state** changes or when a **context** it is using changes. The memoization only works on the component when you pass props into the component from the parent component.

### If memo provides the optimization by comparing the props, why not wrap every single component with `memo()`?

A quote from Dan Abromov

> Shallow comparisons aren't free. they are `0(prop count)`. and they only buy something if it bails out. All comparisons where we end up re-rendering are wasted. Why would you expect always comparing to be faster? Considering many components always get different props”
> 

Let’s break  this down further in Maths to see how it works:

```markdown
normal component render time = 10ms
shallow comparison = 2ms

- Component is rendered on the screen for the first time, `memo` saves the initial render.

- Initial re-render; `memo` saves the initial render.
	render = 10ms
- second re-render; `memo` runs shallow comparison; no prop changed
	render = 2ms
- third re-render; `memo` runs shallow comparison; props changed
	render + shallow comparison = 12ms
- fourth re-render; `memo` runs shallow comparison; no props changed
	render = 2ms

If your Component keeps getting different props, your render time will look like this;

- Initial re-render; `memo` saves the initial render.
	render = 10ms
- second re-render; `memo` runs shallow comparison; prop changed
	render + shallow comparison = 12ms
- third re-render; `memo` runs shallow comparison; prop changed
	render + shallow comparison = 12m
- fourth re-render; `memo` runs shallow comparison; prop changed
	render + shallow comparison = 12m
- fifth re-render; `memo` runs shallow comparison; prop changed
	render + shallow comparison = 12m

```

You get the point. So, wrapping everything in `memo` can affect your app's performance. Therefore, only rely on `memo` as a performance optimization and when you really need to use it or notice the component's render time is large. It also works best for interactions that are granular, like drawing tools; then, you might find memorization helpful.

Most times you have to pair useCallback and useMemo with `memo()`.

## useMemo

`memo()` is a HOC while `useMemo` is a React Hook that stores the result of a calculation from a pure function so it can be reused without doing the calculation again between updates to the screen(re-renders).

```javascript
const cachedValue = useMemo(calculateValue, dependencies)
```

### How it Works;

It takes in 2 parameters;

**calculateValue**: The function calculating the value that you want to cache. The function passed in should be pure, which means it takes no parameters and returns any type.

**Dependencies**: The list of all reactive values referenced inside the calculateValue code. React will compare each dependency with its previous value using the [Object.is](http://Object.is) comparison.

<aside>
💡 Note: if you forget to add the dependency array to useMemo, it will always run which defeats its purpose.

</aside>

On the first render, React will return the result of calling `calculateValue` with no arguments.

On the next re-render, React will check if the dependency values have changed. If they haven't, it will return the previously stored value from the calculation. Otherwise, it will call the calculation again and return the current value from the calculation.

In the example below, we sort through a list and save the value in the `filterList` variable. This variable is passed as props to the child component `profile`. By default, React re-renders child components when the parent component re-renders. If there is no lag or nothing slowing your app down, then it's fine. However, if there is, consider wrapping the data mutation or heavy calculation in your component with `useMemo`.

```javascript
function Contacts() {
  const [text, setText] = useState<string>('');
  const [list, setList] = useState<[]>([]);

  const filterList = useMemo(
    () =>
      list.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      ),
    [list, text]
  );

  return <Profile list={list} text={text} />;
}

const Profile = memo(function Profile({ list, text }) {
  // ...
});
```

For a detailed example of how useMemo works, [see the difference between skipping re-renders and always re-rendering code example](https://react.dev/reference/react/useMemo#examples-rerendering) on the react official docs. Interact with the UI to see how it works.

### When should we use useMemo?

- If you are filtering or transforming a large array or performing an expensive calculation. If the data hasn't changed, you might want to avoid repeating the process.
- If the calculation you're placing in useMemo is noticeably slow and `useMemo`'s dependency rarely changes.
- If you're passing it as props to a component wrapped in `memo`. You can skip re-rendering the component when the values haven't changed.
- If you are depending on the value from `useEffect`, or you are passing the value later to another useMemo function.

### When should we not use useMemo

- If your application primarily consists of static pages where changes are largely based on navigation or replacing one page with another.
- If there is no lag in your component or you do not notice any slow UI responses or glitches, then there is no need to optimise.
- If the value passed as props will always be new.

### Optimization with `memo` and useMemo

`memo` is often used together with useMemo to optimize React applications. They are frequently used together with `useCallback` as well.

**Preventing Re-render when Props are an Array or Object**

For example, in the code below, we see a `person` prop sent from the parent `Info` component to the child `Profile` component. Any time the parent component re-renders, the child component will re-render, even if its props didn't change and the component is wrapped with `memo`.

```javascript
function Info() {
  const [name, setName] = useState("Kells");
  const [age, setAge] = useState(50);

  const person = { name, age };

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```

**Why is this happening**? it’s because objects are not the same in JavaScript, i.e. `{}` is not equal to `{}`. So when it does its comparison `object.is({}, {})` returns `false` . 

To fix this, You can use the `useMemo` hook to prevent the props from being re-created anytime the parent component re-renders.

```javascript
function Info() {
  const [name, setName] = useState("Kells");
  const [age, setAge] = useState(50);

  const person = useMemo(() => ({ name, age }), [name, age]);

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```

Now, the `person` prop will no longer be recreated when the parent component re-renders because `useMemo` knows the object did not change and informs `memo` of this as well.

The example also works with arrays because arrays are objects in JavaScript. Using the same example from above, it illustrates how you can use `memo` and `useMemo` together to optimize an expensive calculation that returns an array.

```javascript
function Contacts() {
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<[]>[];

  const filterList = useMemo(
    () =>
      list.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      ),
    [list, text]
  );

  return <Profile list={list} text={text} />;
}

const Profile = memo(function Profile({ list, text }) {
  // ...
});
```

### Conclusion: Memo and useMemo, which is better?

`Memo` and `useMemo` have more in common than differences, actually.

The major difference is that one is a Higher-Order Component, and the other is a React hook.

In real-life working scenarios, they're most likely used together because they complement each other, rather than choosing which one would be better to use.

To recap, if your app isn't slow, the components’ render time is within a reasonable range, and you don't notice any lag while interacting with the UI, you might not need to optimize or use any memoization technique.

## References

[React Render Tutorial - React memo](https://www.youtube.com/watch?v=bZeBToIqaR4)

[React Render Tutorial - Questions on Optimization](https://www.youtube.com/watch?v=8T1TRh8xDig&t=2s)

[react.dev/useMemo](https://react.dev/reference/react/useMemo)

[react.dev/skipping-re-rendering-when-props-are-unchanged](https://react.dev/reference/react/memo#skipping-re-rendering-when-props-are-unchanged)
