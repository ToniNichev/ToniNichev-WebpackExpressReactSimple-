export default {
  '/about' : {
      layout: [ 
        {
          span: 12,
          components: [
            {
              name: "Header"
            }
          ]
        },
        {
          span: 12,
          components:[
            {
              name: "About"
            }
          ] 
        },
        {
          span: 12,
          components:[
            {
              name: "Home"
            }
          ] 
        }          
      ]    
  },
  '/home' : {
      layout: [ 
        {
          span: 12,
          components: [
            {
              name: "Header"
            }
          ]
        },
        {
          span: 12,
          components:[
            {
              name: "About"
            }
          ] 
        },        
      ]
  },
  '/greetings' : {
      layout: [ 
        {
          span: 12,
          components: [
            {
              name: "Header"
            }
          ]
        },
        {
          span: 12,
          components:[
            {
              name: "Greetings"
            }
          ] 
        },        
      ]
  }  
}
