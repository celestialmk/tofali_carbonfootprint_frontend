import { createStore } from 'vuex'

export default createStore({
  state: {
    carbon_cart:{
      emit_mats:[], //emitter materials list
      emit_mans:[], //emitter materials manufacture list
      emit_stage:[],
      //emit_elec:[],
    },
    carbon_ca: {
      emit_area:[]
    },

    carbon_cart_electricity:0,
    carbon_cart_distance:0,
    carbon_manufacture_total:0,

     //New Carbon Footprint
    carbon_cement: '',
    carbon_sand: '',
    carbon_stone: '',
    ground_floor_area:'',
    total_floor_area: '',
    nearest_stone_quarry_distance: '',
 
    stone_quarries: [ "-0.79219,29.94999","-0.53343,30.65854","-0.57738,30.66358",
                       "0.61782,30.14634","0.60260,30.22324","2.79659,32.32246",
                       "2.286296,32.940203","3.258741,32.129553","0.436825,32.378539",
                       "0.687199,34.185503","1.142958,34.229428","0.407657,32.555487",
                       "0.344222,32.485748","0.3814074,32.636789","0.3167686,32.620611",
                       "0.5016663,32.705516"],

    emitter_materials:[],
    emitter_stages:[],
    material_manufactures:[],
    carbon_site_location:[],
    concrete_class:[
      {
        name: 'C20',
        cement: 1,
        sand: 2,
        stone: 4
      },
      {
        name: 'C25',
        cement: 1,
        sand: 2,
        stone: 3
      },
      {
        name: 'C30',
        cement: 1,
        sand: 1.5,
        stone: 3
      }
    ]

    
  },


  getters: {
    emitter_materials(state){
      return state.emitter_materials
    },
    emitter_stages(state){
      return state.emitter_stages
    },
    material_manufactures(state){
      return state.material_manufactures
    }
  },
  mutations: {
    initializeStore(state){

      
    },

    //Carbon Footprint
    setGroundFloorArea(state, ground_floor_area){
      state.ground_floor_area = ground_floor_area
    },
    setTotalFloorArea(state, total_floor_area){
      state.total_floor_area = total_floor_area
    },
    setCarbonCement(state, carbon_cement){
      state.carbon_cement = carbon_cement
    },
    setCarbonSand(state, carbon_sand){
      state.carbon_sand = carbon_sand
    },
    setCarbonStone(state, carbon_stone){
      state.carbon_stone = carbon_stone
    },
    setNearestQuarryDistance(state, nearest_stone_quarry_distance){
      state.nearest_stone_quarry_distance = nearest_stone_quarry_distance
    },

    //Emitter Parameters
    setEmitterMaterials(state, emitter_materials){
      state.emitter_materials = emitter_materials
    },
    setEmitterStages(state, emitter_stages){
      state.emitter_stages = emitter_stages
    },

    setCarbonSiteLocation(state, carbon_site_location){
      state.carbon_site_location = carbon_site_location
    },
    setCarbonCartElectricity(state, carbon_cart_electricity){
      state.carbon_cart_electricity = carbon_cart_electricity
    },
    setCarbonCartDistance(state, carbon_cart_distance){
      state.carbon_cart_distance = carbon_cart_distance
    },
    setCarbonManufactureTotal(state, carbon_manufacture_total){
      state.carbon_manufacture_total = carbon_manufacture_total
    },


    //Mutation for adding material for distance computations
    addToCarbonCartMat(state, item){
    const exists = state.carbon_cart.emit_mats.filter(i => i.emitter_material.id === item.emitter_material.id)
    if (exists.length){
      exists[0].number_of_trips = parseInt(item.number_of_trips)
      exists[0].distance = parseInt(item.distance)
      exists[0].fuel_efficiency = parseInt(item.fuel_efficiency)
      exists[0].mode = parseInt(item.mode)
    } else {
      state.carbon_cart.emit_mats.push(item)
    }
    },

    //Mutation for adding materials used for manufacturing computations
    addToCarbonCartMans(state, item){
      const exists = state.carbon_cart.emit_mans.filter(i => i.material_manufacture.id === item.material_manufacture.id)
      if (exists.length){
        exists[0].amount_of_material = parseInt(item.amount_of_material)
      } else {
        state.carbon_cart.emit_mans.push(item)
      }
    },

    //Mutation for adding emissions due to construction operations
    addToCarbonCartStage(state, item){
      const exists = state.carbon_cart.emit_stage.filter(i => i.emitter_stage.id === item.emitter_stage.id)
      if (exists.length){
        exists[0].number_of_litres = parseInt(item.number_of_litres)
        exists[0].emission_factor = parseInt(item.emission_factor)
      } else {
        state.carbon_cart.emit_stage.push(item)
      }
    },


    //Clear Carbon Cart Total Values 
    clearCarbonCart(state){
      state.carbon_cart = {
         emit_mans:[],
         emit_mats:[],
         emit_stages:[],
        }
      localStorage.setItem('carbon_cart', JSON.stringify(state.carbon_cart))
  
    },
  },
  actions: {
  },
  modules: {
  }
})
