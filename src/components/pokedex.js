import React, { Component, Fragment } from "react";



export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.listPokemonRender = this.listPokemonRender.bind(this);

    this.onClickPokemonRender = this.onClickPokemonRender.bind(this);
  
    this.nextPokemonRender =   this.nextPokemonRender.bind(this);
    this.state = {
      next: "https://pokeapi.co/api/v2/pokemon?limit=12",
      previous: null,
      lists: [],
      sLoaded :false,
      listsPokemonLoad:[],
      pokemonRender : null
       
    };
  }

  nextPokemonRender(){
    this.setState({listsPokemonLoad : [],pokemonRender :[]});
   
    this.componentDidMount();
  }


  
  onClickPokemonRender(e,listsPokemonLoad){
    if(e){
     
       var cardPok = (
         <div className="card div text-center div w-100">
           <img
             src={listsPokemonLoad.sprites.front_default}
             className="card-img-top div"
             alt="..."
           />
           <div className="card-body">
             <h5 className="card-title">
               {listsPokemonLoad.name.toUpperCase()}
             </h5>
             <div className="row div text-capitalize">
               {listsPokemonLoad.types.map((type, index) => {
                 return (
                   <Fragment key={index}>
                     <div className="col-8 div">
                       {" "}
                       {!(index >= 1) && <p>Type </p>}
                     </div>
                     <div className="col-4 div"> {type.type.name}</div>
                   </Fragment>
                 );
               })}

               {listsPokemonLoad.stats.map((stat, index) => {
                 return (
                   <Fragment key={index}>
                     <div className="col-8 div"> {stat.stat.name}</div>
                     <div className="col-4 div"> {stat.base_stat}</div>
                   </Fragment>
                 );
               })}
                   <div className="col-8 div"> weight</div>
                  <div className="col-4 div"> {listsPokemonLoad.weight}</div>
                  <div className="col-8 div"> total moves</div>
                  <div className="col-4 div"> {listsPokemonLoad.moves.length}</div>
             </div>

             <p className="card-text">stats</p>
             <a href="#" className="btn btn-primary">
               Go somewhere
             </a>
           </div>
         </div>
       );
       
      this.setState({pokemonRender:cardPok})
    }
   
  }


  listPokemonRender() {
   

    return ( 
   this.state.listsPokemonLoad.map((listsPokemonLoad,index)=>{
        return ( <div className="col-md-4" key={index}  onClick= {(e)=>{ this.onClickPokemonRender(e,listsPokemonLoad); }} >
        <div className="card div mt-3 mb-3" >
                  <img src={listsPokemonLoad.sprites.front_default} className="card-img-top div" alt="..." />
                 <div className="card-body">
                    <h5 className="card-title text-center">{listsPokemonLoad.name.toUpperCase()}</h5>
                    
                    <div className="row">
                   {listsPokemonLoad.types.map((type,index)=>{

                    return ( <div className="col-6 p-1"> 
                         <a href="#" className="btn btn-primary w-100 "> {type.type.name}</a> 
                        
                      </div>)
                      }
                      )
                      
                      }                     
                    </div>
                  </div>
                </div>
                </div>
                )})
    )

  }
  componentDidMount() {
   

    fetch(this.state.next)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            sLoaded: true,
            lists: result,
            next: result.next,
            previous: result.previous
          });
         
         
          result.results.map((results,index)=>{
            fetch(results.url)
            .then((res) => res.json())
            .then(
              (result) => {
                this.setState ({
                  listsPokemonLoad: [...this.state.listsPokemonLoad, result]
                })              
                },              
              (error) => {
                this.setState({
                  sLoaded: false,
                  error
                });
               
                
              } );            
            })
        },
     
        (error) => {
          this.setState({
            sLoaded: false,
            error
          });
         
          
        }
      );

  }


  render() {


 
    return (

      <div className="container">
        <div className="row justify-content-center ">
          <div className="pl-5 pr-5 div w-50 text-center">
            <h1>Pokedex</h1>{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              
              <Fragment>
                {this.listPokemonRender()}
              </Fragment>       
              
            </div>
            <div className="row justify-content-center">
              <a href="#" className="btn btn-primary w-75" onClick= {(e)=>{ this.nextPokemonRender(e); }}>
                Load More
              </a>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            {" "}
            
            <Fragment>
                { this.state.pokemonRender}
              </Fragment> 
          </div>
        </div>
      </div>
    );
  }
}
