export class Loading {
    Loading(place:HTMLElement, colorLoading:string="text-dark"){
        if(place){
            let load=document.createElement('div')
            load.classList.add('text-center');
            load.classList.add('w-100');
            load.classList.add('load');
            let spinner=document.createElement('div');
            spinner.classList.add('spinner-border');
            spinner.classList.add(colorLoading);
            spinner.setAttribute('role','status');
            let span=document.createElement('span');
            span.classList.add('sr-only');
            span.textContent='Loading...';
            spinner.appendChild(span);
            load.appendChild(spinner);
            place.prepend(load);
        }       
      }
      LoadingDelete(place: HTMLElement){
          if(place){
              let checkLoad=document.querySelector('.load');
              if(checkLoad)
                place.removeChild(checkLoad);
          }           
      }
}
