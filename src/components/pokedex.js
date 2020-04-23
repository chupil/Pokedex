 


import React, { Component, Fragment } from "react";
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';



export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.listPokemonRender = this.listPokemonRender.bind(this);
    this.onClickPokemonRender = this.onClickPokemonRender.bind(this);  
    this.nextPokemonRender =   this.nextPokemonRender.bind(this);
    this.menuPokemonRender =   this.menuPokemonRender.bind(this);
    this.onClickGetType = this.onClickGetType.bind(this);
    this.state = {
      next: "https://pokeapi.co/api/v2/pokemon?limit=12",
      previous: null,
      lists: [],
      sLoaded :false,
      listsPokemonLoad:[],
      pokemonRender : null,      
      typeList : [] 
      
      
      
       
    };
  }
  onClickGetType(e,type){   
    
    var typeSel = type;
    var selectedType = [];
    this.state.listsPokemonLoad.map((listsPokemonLoad,index)=>{
      listsPokemonLoad.types.map((typeO,index)=>{                      
        if (typeO.type.name == typeSel.name){

          console.log(listsPokemonLoad);
          Array.prototype.push.apply(selectedType, [listsPokemonLoad]);

         
          

        }
    })
  })
  if(selectedType.length > 0 ){
    this.setState({listsPokemonLoad: selectedType  })
  }
this.forceUpdate();
}

  menuPokemonRender(e){
    $().dropdown('show');
}

  nextPokemonRender(){
    this.setState({listsPokemonLoad : [],pokemonRender :[], typeList:[]});   
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
                         <a href="#" className={"btn btn-primary w-100  text-capitalize " 
                         + type.type.name}> {type.type.name}</a> 
                      </div>)})                     
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
                
                let set =  new Set(); 
                this.state.listsPokemonLoad.map((listsPokemonLoad,index)=>{
                  listsPokemonLoad.types.map((type,index)=>{                      
                    set.add(type.type.name);})
                })  
                var typeList = []  
                for (let value of set){
                var obj = [{ name : value}];  
                Array.prototype.push.apply(typeList, obj); 
               }
               this.setState ({typeList : typeList});
               

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
        <div class="dropdown w-50">
    <button
      class="btn btn-secondary dropdown-toggle  w-100"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
     
      onClick={(e)=> {  this.menuPokemonRender(e, "click") }}    >
      <h1>Pokedex</h1>
    </button>   

     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">     
     {this.state.typeList.map((type, index) => { 
    return( <Fragment>
   <a class="dropdown-item text-capitalize" href="#" onClick={(e)=> {  this.onClickGetType(e, type) }}>{type.name}</a>
       </Fragment>
    )
})}    
    </div>    
      
      </div>
          
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <Fragment>{this.listPokemonRender()}</Fragment>
            </div>
            <div className="row justify-content-center mb-3">
              <a
                href="#"
                className="btn btn-primary w-75 h-75"
                onClick={(e) => {
                  this.nextPokemonRender(e);
                }}
              >
                Load More
              </a>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            {" "}
            <Fragment>{this.state.pokemonRender}</Fragment>
          </div>
        </div>
      </div>
    );
  }
}
