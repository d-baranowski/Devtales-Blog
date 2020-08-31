<metadata-json>
{
    "id": "1grpZ7qEPsjKYTpRIhFFL3XZ3gc",
    "title": "Redux inspired state container",
    "date": "2019-02-16T09:08:00.463Z",
    "category": "technology",
    "status": "default",
    "tags": [ "react", "redux", "hoc" ] 
}
<metadata-json>
Redux allows to share state between component and also it helps to separate state from the component which aids testing. Unfortunately it also adds unnecessary layers of complexity. In order to have asynchronous behaviour in Redux  you'll need to write a lot of code. 
In a world where everything is asynchronous I've had enough of confusing middle-wares, numerous action creators and obscure yield operators. In this article I will demonstrate how simple async operations can become without Redux.

## Demo

I used create-react-app to generate a starting point for myself. Below you'll find a simple app using my own implementations of createStore and connect.

### CatPicturesStore.js

```
// javascript //

import createStore from './createStore';

const store = createStore({
   loading: false,
   title: "Default Title",
   kitten: "",
   error: "",
   fetchKitten: () => {
      store.loading = true;
      const promise = fetch('https://aws.random.cat/meow').then((response) => {
         return response.json();
      }).then((json) => {
         store.loading = false;
         store.kitten = json.file;
      });

      promise.catch((error) => {
         store.loading = false;
         store.error = error;
      }
   }
});

export default store;
```

Note how fetchKitten function modifies the store state directly. There is no more need for lengthy reducers or boilerplate action creators. 
Unlike redux I would avoid using a single GOD store for the entire state of the application. Instead I would create multiple stores and separate state depending on how it's used. This is possible because there is no more need for the Provider component at the root of my application. My stores are simple objects that can be exported and imported where needed. 

### App.js
Below I'll demonstrate how to make use of the store in your components. 

```
// javascript //
import React from 'react';
import store from './CatPicturesStore'
import connect from './connect';

const onChange = (event) => {
  store.title = event.target.value
};

const ComponentOne = connect(store, ({title}) => (
   <div>
      <h2>Hello Form Component One</h2>
      <div>{title}</div>
      <input type="text" value={title}
             onChange={onChange}
      />
   </div>
));

const ComponentTwo = connect(store, ({title}) => (
   <div>   
      <h2>Hello Form Component Two</h2>
      <div>{title}</div>
      <input type="text" value={title} onChange={onChange}/>
   </div>
));

const ComponentThree = connect(store, ({fetchKitten}) => (
    <div>
      <h2>Hello Form Component Three</h2>
      <button onClick={fetchKitten}>Press for Kitten</button>
    </div>
));

const ComponentFour = connect(store, ({loading, kitten, error}) => (
    <div>
      <h2>Hello Form Component Four</h2>
      <img style={{width: 300}} src={kitten} />
      {loading && <div>Loading a kitten</div>}
      {error && <div>Omg there was an error {error}</div>}
    </div>
));

const App = () => (
    <div>
      <ComponentOne/>
      <ComponentTwo/>
      <ComponentThree/>
      <ComponentFour />
    </div>
);

export default App;
```

Inside onChange you can see that all I need to do is assign a new value to store.title for all the changes to become propagated across all connected components. Similarly all subscribed components are notified whenever fetchKitten modifies loading, error and kitten properties of the store. No need for a dispatcher.

## How does it work?
I implemented this simple store using JS Proxy. Proxy allows to register a handler on object properties that gets invoked whenever someone sets new value to given property.
createStore.jsCreate store creates a new Proxy which is native in JS. Proxy then ensures to call notifySubscribers whenever any of the object properties gets changed. The store will have all of the properties passed via storeProps parameter and a additional property subscribe. Everyone who calls subscribe will be notified when notifySubscribers gets called. 

```
// javascript //
import uuid from './uuid';

const createStore = (storeProps) => {
	const subscribers = {};
	const notifySubscribers = (newValue) => {
		Object.values(subscribers).forEach(callback => callback(newValue))
	};

	const handler = {
		set(target, prop, value) {
			if ((prop === 'subscribe')) {
				return true
			}


			target[prop] = value;
			notifySubscribers(target);
			return true;
		}
	};


	return new Proxy({
		subscribe: (callback) => {
			const id = uuid();
			subscribers[id] = callback;
			return () => delete subscribers[id];
		},
		...storeProps
	}, handler);
};

export default createStore;
```

All that is left to do is connect components to the store. 

### connect.js
Connect is a standard higher order component (HOC) which subscribes to the store with a callback which will call set state on the HOC. The HOC will then re-render whenever setState is called and pass the store value down to the component as props.

```
// javascript //
import React from 'react';

function connect(store, WrappedComponent) {
	return class extends React.Component {
		state = store;
		
		componentDidMount() {
			this.unsubscribe = store.subscribe((newValue) => {
				this.setState(newValue)
			});
		}

		componentWillUnmount() {
			this.unsubscribe();
		}
		
		render() {
			const joinedProps = {
				...this.props,
				...this.state
			};
			return <WrappedComponent {
				...joinedProps
			}
			/>;
		}
	};
}

export default connect;
```

## Summary
I hope you'll find this useful. I like this approach because it gives me the testability I enjoy when using Redux but without the cost of unnecessary boilerplate code and complexity. All the source code can be found [here](https://github.com/d-baranowski/simpler-react-store).
