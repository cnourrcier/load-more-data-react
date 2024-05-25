import LoadMoreData from './components/loadMoreData/index';

function App() {

  return (
    <>
      <LoadMoreData url={'https://dummyjson.com/products'} limit={20} />
    </>
  )
}

export default App
