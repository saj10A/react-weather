import { Provider } from "react-redux"
import Weather from "./Weather"
import store from "../redux/store"


function App() {
  return (
    <Provider store={store}>
      <Weather/>
    </Provider>
  )
}

export default App
