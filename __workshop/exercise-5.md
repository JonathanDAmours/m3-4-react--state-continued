<!-- # Exercise 5: Keyboard Navigation

<!-- Right now, our typeahead only works when using a mouse. This UI will not work for keyboard users, nor will it work for users who use a screen reader. It's important to make sure the stuff we build works well for users with disabilities.

Let's tackle keyboard navigation first. -->

<!-- The good news is, we get some of this for free. Browsers will fire the "onClick" event on buttons when you press "Enter" on them. Out of the box, we should be able to type a few letters, press "Tab" to move focus to the "Clear" button, and press "Enter" to clear the typed characters. -->

<!-- What should the ideal behaviour be? You might think that we should use the "Tab" key to move between every suggestion in the list, but this actually isn't the best practice. Instead, we want the user to be able to use the _arrow keys_. When the user is focused on the input, to move between suggestions. This is the best practice because it means that users don't have to tab through _every single suggestion_ just to get on with their page navigation. For some users, keypresses are strenuous, so we should try and minimize them. -->

Here's our ideal behaviour:

![keyboard-demo](../__lecture/assets/typeahead-keyboard-demo.gif)

<!-- We're already listening for keypresses, since we're calling the handler when the user presses "enter". Let's also add handlers for the up and down arrows: -->

```jsx
<input
  onKeyDown={(ev) => {
    // Switching from if/else to a "switch" statement,
    // since now we're handling multiple different values for
    // ev.key. This is an optional change, though; we could
    // still do it with if/else-if.
    switch (ev.key) {
      case "Enter": {
        handleSelect(ev.target.value);
        return;
      }
      case "ArrowUp": {
        // TODO: Handle moving the selection up
      }
      case "ArrowDown": {
        // TODO: Handle moving the selection down
      }
    }
  }}
/>
```

<!-- Right now, we don't really have a notion of which item is "selected"; we have a yellow hover state, but that's tracked in CSS. -->

We can think of the currently-selected item as some data that changes over time. And for dynamic data, we use React state.

Add a new state hook that manages the currently-selected index. Tweak that number when the user uses the arrow keys:

```jsx
const Typeahead = (
  {
    /* snip */
  }
) => {
  const [value, setValue] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );

  return (
    /* snip */
    <input
      onKeyDown={(ev) => {
        switch (ev.key) {
          case "Enter": {
            handleSelect(ev.target.value);
            return;
          }
          case "ArrowUp": {
            setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
            return;
          }
          case "ArrowDown": {
            setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
            return;
          }
        }
      }}
    />
  );
}; -->
```

///////////////////////////

Earlier, we suggested adding a hover state to each list item. Let's remove that; instead, the yellow background will be managed through React, based on the currently-selected index.

There is a way to set dynamic styles using the `styled` helper, but inline styles are a simpler strategy in these cases:

```jsx
const isSelected = /*
  Figure this out, based on the React state
  and the current index in the array */;

<Suggestion
  key={suggestion.id}
  style={{
    background: isSelected ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent',
  }}
```

We want to make it so that mousing over a list item causes it to be selected, replicating the hover state. Use an `onMouseEnter` event to set the React state.

Items should now be selectable both with a mouse as well as with a keyboard.
