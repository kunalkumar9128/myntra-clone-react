

import { useState } from 'react';
import Home from "./body/Home"
import {
  Routes,
  Route, useNavigate, Link,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { grey, pink } from '@mui/material/colors';
import { FavoriteBorderOutlined, LocalMall } from '@mui/icons-material';
import Container from 'react-bootstrap/Container';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';

import Footer from './body/Footer';



import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Navigation from './body/Navigation';

import './App.css';
import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBBtn
} from "mdb-react-ui-kit";


function Products({ productId, itemArray, setBagindexArray }) {

  const theme = createTheme({
    typography: {
      button: {
        textTransform: 'none',
      }
    },
    palette: {
      primary: grey,
      secondary: pink
    }
  });

  var index = itemArray.findIndex(i => i.productId === productId);
  const target = itemArray[index];
  const [sizeStyle, setSizeStyle] = useState({
    border: "",
    // sizeValue:0
  });
  function handleSizeSelect(e) {
    setSizeStyle({
      borderWidth: "1.5px",
    })
  }


  function bagHandle(e) {

    setBagindexArray((prev) => {
      return [...prev, index];
    });

  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="product">
          <div className="top">
            <div className="p-left">
              <img src={"../" + target.img} alt="" sizes="400px" />
            </div>
            <div className="p-right">
              <h1>{target.title}</h1>
              <p>{target.desc}</p>
              <Button color='primary' variant="outlined">{target.rating}<StarIcon sx={{ width: 15 }} /> {target.rating_count + "  "} Rattings</Button>
              <hr />
              <p className="price">&#8377;{target.price} <span>MRP <span className='mrp'>&#8377;{target.Mrp}</span> </span> <span className='offer'>({target.offer}% OFF)</span></p>
              <p>inclusive all taxes.</p>
              <p>Select Size</p>

              <div className="sizes">
                {
                  (target.sizes).map((size, index) => {
                    return (
                      <button value={size} key={index} onClick={handleSizeSelect} style={sizeStyle} className='btn1'>{size}</button>
                    )
                  })
                }
              </div>

              <p className="seller"> Seller: {target.seller}</p>
              <div className="Buy">

                <Button value={index} onClick={bagHandle} color='secondary' sx={{ width: 230, height: 60 }} variant='contained'>
                  <LocalMall />
                  ADD TO BAG
                </Button>
                <Button onClick={() => {
                }} color='secondary' sx={{ width: 200, height: 60 }} variant='outlined'>
                  <FavoriteBorderOutlined />
                  WISHLIST
                </Button>
              </div>
            </div>
          </div>
          <div className="bottom">

          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

function Middle({ itemArray, nevigate }) {


  const [sortType, setSortType] = useState();


  const handleSortChange = (event) => {

    let sortValue = Number(event.target.value);
    setSortType(sortValue);
    if (sortValue === 1) {
      itemArray.sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0);
    } else if (sortValue === 2) {
      itemArray.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
    }
  };

  const [renderedArray, setRenderedArray] = useState(itemArray);
  const [prevSearch, setPrevSearch] = useState();

  function handleFilterChange(e) {

    if (e.target.checked) {
      const { name, value } = e.target;

      setRenderedArray(
        (prev) => {
          return (

            prev.filter((item) => {
              if (name === "gender") {
                return (
                  item.gender === value
                )

              } else if (name === "categ") {
                return (
                  item.category === value
                )
              }

            })
          )
        }
      )
      setPrevSearch(name);
    }

  }




  return (
    <div className='middle-section'>
      <div className=" my-2 left-sec container" style={{ width: "27wv" }}>
        <label htmlFor="gender">Gender:-</label>
        <div id='gender' className="form-check">
          <input onChange={handleFilterChange} value={"M"} className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Men
          </label>
        </div>
        <div className="form-check">
          <input onChange={handleFilterChange} value={"W"} className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Women
          </label>
        </div>
        <label htmlFor="categories">Categories</label>
        <div id='categories' className="form-check">
          <input onChange={handleFilterChange} value={"H"} className="form-check-input" type="radio" name="categ" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Full Sleeve
          </label>
        </div>
        <div className="form-check">
          <input onChange={handleFilterChange} value={"F"} className="form-check-input" type="radio" name="categ" id="flexRadioDefault2" />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Half Sleev
          </label>
        </div>
      </div>
      <Container className="middle" >
        <label htmlFor="filter"></label>
        <select name="" className='form-select sort' value={sortType} aria-label="Sort by:-" onChange={handleSortChange} id="filter">
          <option value={0}>Sort by</option>
          <option value={1}>Low to high</option>
          <option value={2}>high to low</option>
        </select>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {renderedArray.map((item, index) => {
              return (<Grid onClick={() => {
                nevigate(`/product/product${item.productId}`);
              }} xs={2} sm={4} md={4} lg={3} key={item.productId}>
                <Card sx={{ height: 380, width: 200 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      // height="250"

                      sx={{ height: 250, width: 200 }}

                      image={item.img}
                      alt={item.alt}
                      key={index}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <span>{item.brand}</span>
                        <span>{item.desc}</span>
                        <br />
                        <b>Rs:- {item.price}</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>)
            })}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
function SearchComp({ itemArray, nevigate }) {

  const [filters, setFilter] = useState({
    gender: "",
    categ: ""
  });

  const handleSortChange = (event) => {

    let sortValue = Number(event.target.value);
    setFilter(sortValue);
    console.log(sortValue);
    if (sortValue === 1) {
      itemArray.sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0);
    } else if (sortValue === 2) {
      itemArray.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
    }
  };

  const [renderedArray, setRenderedArray] = useState(itemArray);

  function handleFilterChange(e) {

    if (e.target.checked) {
      const { name, value } = e.target;
      const filteredArray = itemArray.filter((item) => {
        if (name === "gender") {
          return (
            item.gender === value
          )

        } else if (name === "categ") {
          return (
            item.category === value
          )
        }

      })
      setRenderedArray(filteredArray);
    } else {
      setRenderedArray(itemArray)

    }

  }


  return (
    <div className='middle-section'>
      <div className=" my-2 left-sec container" style={{ width: "27wv" }}>
        <label htmlFor="gender">Gender:-</label>
        <div id='gender' className="form-check">
          <input onChange={handleFilterChange} value={"M"} className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Men
          </label>
        </div>
        <div className="form-check">
          <input onChange={handleFilterChange} value={"W"} className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Women
          </label>
        </div>
        <label htmlFor="categories">Categories</label>
        <div id='categories' className="form-check">
          <input onChange={handleFilterChange} value={"F"} className="form-check-input" type="radio" name="categories" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Full Sleeve
          </label>
        </div>
        <div className="form-check">
          <input onChange={handleFilterChange} value={"H"} className="form-check-input" type="radio" name="categories" id="flexRadioDefault2" />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Half Sleev
          </label>
        </div>
      </div>
      <Container className="middle" >
        <label htmlFor="filter"></label>
        <select name="" className='form-select sort' value={filters} aria-label="Sort by:-" onChange={handleSortChange} id="filter">
          <option value={0}>Sort by</option>
          <option value={1}>Low to high</option>
          <option value={2}>high to low</option>
        </select>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {renderedArray.map((item, index) => {
              return (<Grid onClick={() => {
                nevigate(`/product/product${item.productId}`);
              }} xs={2} sm={4} md={4} lg={3} key={item.productId}>
                <Card sx={{ height: 380, width: 200 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      // height="250"

                      sx={{ height: 250, width: 200 }}

                      image={"../"+item.img}
                      alt={item.alt}
                      key={index}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <span>{item.brand}</span>
                        <span>{item.desc}</span>
                        <br />
                        <b>Rs:- {item.price}</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>)
            })}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

function BagItem({ targetCartElement }) {

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">


            <MDBCard className="rounded-3 mb-4">
              <MDBCardBody className="p-4">
                <MDBRow className="justify-content-between align-items-center">
                  <MDBCol md="2" lg="2" xl="2">
                    <MDBCardImage className="rounded-3" fluid
                      src={targetCartElement.img}
                      alt={targetCartElement.alt} />
                  </MDBCol>
                  <MDBCol md="3" lg="3" xl="3">
                    <p className="lead fw-normal mb-2">{targetCartElement.title}</p>
                    <p>
                      <span className="text-muted">Size: </span>M{" "}
                      <span className="text-muted">Color: </span>Grey
                    </p>
                  </MDBCol>
                  <MDBCol md="3" lg="3" xl="2"
                    className="d-flex align-items-center justify-content-around">
                    <MDBBtn color="link" className="px-2">
                      <MDBIcon fas icon="minus" />
                    </MDBBtn>

                    <MDBInput min={0} defaultValue={1} type="number" size="sm" />

                    <MDBBtn color="link" className="px-2">
                      <MDBIcon fas icon="plus" />
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                    <MDBTypography tag="h5" className="mb-0">
                      &#8377;
                      {targetCartElement.price}
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol md="1" lg="1" xl="1" className="text-end">
                    <a href="#!" className="text-danger">
                      <MDBIcon fas icon="trash text-danger" size="lg" />
                    </a>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )

}

function CheckOut({ totalPrice }) {

  return (
    <>

      <Container style={{margin: "auto"}}>
        <Button className="ms-3" color="warning" block size="lg">
          &#8377;{totalPrice}
        </Button>
        <Button className="ms-3" color="warning" block size="lg">
          Check out
        </Button>
      </Container>
    </>


  )

}

function Bag({ itemArray, bagIndexArray }) {
  const [totalPrice, setTotalPrice] = useState(0);

  var total = 0;


  // {bagIndexArray.map((value, index) => {

  //       setTotalPrice(totalPrice+itemArray[value].price)

  // })}


  return (
    <div className="cart">
      <MDBTypography tag="h3" className="fw-normal mb-0 px-5 text-black">
        Cart
      </MDBTypography>
      {bagIndexArray.map((value, index) => {
        let targetCartElement = itemArray[value];
        total = total + targetCartElement.price;

        return (
          <>
            <BagItem key={index} targetCartElement={targetCartElement} />

          </>
        )
      })}
      <CheckOut totalPrice={total} />
    </div>
  )
  console.log(totalPrice);

}

function App() {
  let nevigate = useNavigate();
  const [searchel, setSearchel] = useState([]);
  const [searchKey, setSearchKey] = useState("")

  const [bagIndexArray, setBagindexArray] = useState([1, 2]);

  const [itemArray, setItemArray] = useState([
    {
      img: "img/shirt1.png",
      productId: "p0001",
      alt: "Sirt-1",
      title: "Roadster Shirt",
      desc: "Cotton Slim Fit Formal Shirt",
      category: "F",
      price: 300,
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt2.png",
      productId: "p0002",
      alt: "Sirt-1",
      title: "Highlander",
      category: "H",
      desc: "Cotton Slim Fit Formal Shirt",
      price: 599,
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt3.png",
      productId: "p0003",
      alt: "Sirt-1",
      title: "Wrong",
      desc: "Cotton Slim Fit Formal Shirt",
      price: 399,
      category: "H",
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt4.png",
      productId: "p0004",
      alt: "Sirt-1",
      title: "Lee",
      desc: "Cotton Slim Fit Formal Shirt",
      price: 499,
      category: "F",
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt5.png",
      productId: "p0005",
      alt: "Sirt-1",
      title: "Campus Sutra",
      desc: "Cotton Slim Fit Formal Shirt",
      price: 699,
      category: "H",
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]

    },
    {
      img: "img/shirt6.png",
      productId: "p0006",
      alt: "Sirt-1",
      title: "Metronuts",
      desc: "Cotton Slim Fit Formal Shirt",
      price: 799,
      Mrp: 4000,
      category: "F",
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt7.png",
      productId: "p0007",
      alt: "Sirt-1",
      title: "Netplay",
      desc: "Cotton Slim Fit Formal Shirt",
      price: 899,
      category: "H",
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt8.png",
      productId: "p0008",
      alt: "Sirt-1",
      title: "Killer",
      desc: "Cotton Slim Fit Formal Shirt",
      price: 1299,
      category: "H",
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "M",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt9.png",
      productId: "p0009",
      alt: "Sirt-8",
      title: "Killer",
      desc: "Women Swertshirt",
      price: 1299,
      category: "H",
      Mrp: 4000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 13 + "k",
      offer: 70,
      gender: "W",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt10.png",
      productId: "p00010",
      alt: "Sirt-9",
      title: "HRX by H. R",
      desc: "Women Swert Shirt",
      price: 999,
      category: "H",
      Mrp: 3000,
      seller: "Flashstar",
      rating: 4.2,
      rating_count: 4 + "k",
      offer: 69,
      gender: "W",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt11.png",
      productId: "p00011",
      alt: "Sirt-10",
      title: "HRX by H. R",
      desc: "Cotton Kurti",
      price: 499,
      category: "H",
      Mrp: 3000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 2 + "k",
      offer: 69,
      gender: "W",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt12.png",
      productId: "p00012",
      alt: "Sirt-11",
      title: "HRX by H. R",
      desc: "Women Long Kurti",
      price: 699,
      category: "F",
      Mrp: 3000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 3 + "k",
      offer: 69,
      gender: "W",
      sizes: [39, 40, 42, 44]
    },
    {
      img: "img/shirt13.png",
      productId: "p00013",
      alt: "Sirt-12",
      title: "SASSAFARS",
      desc: "Indo Era",
      price: 899,
      category: "F",
      Mrp: 3000,
      seller: "Flashstar Commerce",
      rating: 4.2,
      rating_count: 9 + "k",
      offer: 69,
      gender: "W",
      sizes: [39, 40, 42, 44]
    },
  ]);



  const filter = [
    { label: "Low to High" },
    { label: "High to low" },
    { label: "Popular" },
    { label: "Rated" },
  ]

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="App">

      <Navigation setItemArray={setItemArray} SetSearchWord={setSearchKey} itemArray={itemArray} setSearchel={setSearchel} cartCount={bagIndexArray.length} nevigate={nevigate} />


      {/* Middle */}



      <Routes>



        <Route exact path="/" element={<Home />} />
        <Route exact path="/product" element={<Middle
          itemArray={itemArray}
          nevigate={nevigate}
          filter={filter}
        />} />
        <Route exact path="/product/search" element={
          <SearchComp
            itemArray={searchel}
            nevigate={nevigate}
            filter={filter}
          />
        } />

        {
          itemArray.map((item, index) => {
            return (
              <Route exact path={`/product/product${item.productId}`} element={<Products
                productId={item.productId}
                itemArray={itemArray}
                key={item.productId}
                setCartCount={setCartCount}
                setBagindexArray={setBagindexArray}
              />} />
            )
          })
        }


        <Route exact path='/cart' element={<Bag
          itemArray={itemArray}
          bagIndexArray={bagIndexArray}
        />} />



      </Routes>

      <Footer />
    </div>



  );
}

export default App;
