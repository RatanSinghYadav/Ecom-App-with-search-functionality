import React, { useEffect } from 'react';
import './style/home.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState('');



  // Fetch Books data and Search books   

  const productData = async () => {
    const getData = await fetch('https://dummyjson.com/products/search?q=' + item);
    const newData = await getData.json();
    setData(newData.products);

  }


  const showDetail = async (id) => {
    const getData1 = await fetch('https://dummyjson.com/products/' + id)
    const newData1 = await getData1.json();
    setSummary(newData1);
    console.log(newData1);
    console.log(item);

  }


  useEffect(() => {
    productData();
    showDetail();
  }, [item])

  return (
    <div className='container'>

      <>
        <h1 class="hero_heading">
          Welcome to the Ecommerce App!
        </h1>

        {/* Search Box */}

        <div className='searchBar'>
          <div></div>
          <input className='input_box' placeholder='Search' onChange={(e) => setItem(e.target.value)} />
        </div>




        <div className="container mt-5 mb-5 new-arrivals">
          <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>Recommended Books</h4>

          {/* Book Store */}

          <div className="row" style={{ textAlign: 'center' }}>

            <>
              {
                data.map((e, id) => {
                  return (
                    <>
                      <div key={id} className="col-lg-3  col-12 col-md-6 mt-4">
                        <div className="card">
                          <div className="card-img">
                            <img src={e.thumbnail} className="img-fluid new-arrivals-img" alt="" />
                            <div className="overlay">
                              <div>
                                <img className="img-fluid" alt="" />
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{e.title}</h5>
                            <h5 className="card-title">{e.brand}</h5>
                            <h5 className="card-title">Rs. {e.price}</h5>
                            <p className="card-texte">Rating: {e.rating}/10</p>
                            {/* <Link to={`summary/${e.title}/${e.id}`}>
                            </Link> */}
                            <button onClick={() => { setShow(!show); showDetail(id + 1) }} className="product-btn"><i className="cart fa fa-shopping-cart"></i>More Details</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </>


          </div>
        </div>

        {/* Summary Box */}

        {show ?
          <>
            <div className='modelBackgraund'></div>
            <div className="container modelContainer mt-5">
              <div className="card">
                <div className="row " style={{ height: "25rem" }}>
                  <div className="col-md-3">
                    <img src={summary.thumbnail} className="img-fluid rounded-start" style={{ height: "25rem", width: "23rem" }} alt={""} />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body" style={{ height: "25rem", borderRadius: "8px" }}>
                      <h5 className="card-title">{summary.title}</h5>
                      <p className="card-text"><b>Description:</b> {summary.description}</p>
                      <p className="card-text"><small className="text-muted"><b>Title:</b> {summary.title}</small></p>
                      <p className="card-text"><small className="text-muted"><b>Price:</b> Rs. {summary.price}</small></p>
                      <p className="card-text"><small className="text-muted"><b>Discount:</b> Rs. {summary.discountPercentage}</small></p>
                      <p className="card-text"><small className="text-muted"><b>Rating:</b> {summary.rating}/10</small></p>
                      <p className="card-text"><small className="text-muted"><b>Stock:</b> {summary.stock}</small></p>
                      <p className="card-text"><small className="text-muted"><b>Category:</b> {summary.category}</small></p>
                      <Link to={`summary/${summary.title}/${summary.id}`}>
                        <button className="product-btn">Buy Now</button>
                      </Link>
                      &emsp;
                      <button onClick={() => { setShow(!show) }} className="product-btn">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          : ""
        }


      </>

    </div>
  )
}
export default Home;
