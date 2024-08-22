import { Component } from '@angular/core';

@Component({
  selector: 'app-sala7',
  templateUrl: './sala7.component.html',
  styleUrls: ['./sala7.component.css']
})
export class Sala7Component {

  ngOnInit() {
    window.scrollTo(450, 550);
  } 

  slides = [
    {
      description: "José Julián Martí Pérez (1853-1895) Héroe nacional de Cuba. Político, escritor, poeta, periodista, orador. Sufrió prisión y destierro a los diecisiete años de edad por sus ideas independentista. Vivió en España, México, Guatemala y Venezuela en el año 1881 se estableció definitivamente en los Estados Unidos donde preparó lo que él llamó “la guerra necesaria” para lograr la independencia de Cuba, proceso que lideró por su gran talento. Se exhibe un chaleco original utilizado por José Martí, el que dejó olvidado en una de sus visitas a Haití en 1892, durante los preparativos de la Guerra de Independencia de 1895, la prenda quedó bajo el cuidado de la familia de Tranquilino Callejas, cuyos descendientes la trajeron a Cuba y con posterioridad decidieron donarla, se expone en el museo desde 1998. El 11 de abril de 1895 desembarca en Cuba para incorporarse a la lucha armada. Su pensamiento es fuente nutricia del patriotismo, el latinoamericanismo, el antimperialismo y el antirracismo que forman parte de la cultura política del pueblo cubano. El 19 de mayo de 1895 cae en combate.",    
    },
    {
      description: "Descripción 1",
    },
    
  ];
  slideConfig = {
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "autoplay": false,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrow": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      },

      {
        "breakpoint": 768,
        "settings": {
          "arrow": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]};
}
