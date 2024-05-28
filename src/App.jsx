import LoadMoreProducts from './components/loadMoreProducts/index';

function App() {

  return (
    <>
      <LoadMoreProducts url={'https://dummyjson.com/products'} limit={20} />
    </>
  )
}

export default App;
