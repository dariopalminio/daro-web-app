/**
 * //https://www.youtube.com/watch?v=F87q2SIb3II
 * 
import { ComponentConsumerFactory } from './vew/ComponentConsumerView'
const ComponentConsumerView = ComponentConsumerFactory(ExampleInMemoryService())

const CompRoot = () => {
    return(
        <ComponentConsumerView />
    )
}

--------

//Factory to injector
const ComponentConsumerFactory = (myservice: IService) =>{
  return function ComponentConsumerView(){

    const ej: string = myservice.metodo("ejemplo");
    return(<div />);
 };
};
export default ComponentConsumerFactory;
 */


//Interface to do dependency inversion
export interface IService {
    metodo: (param: string) => string;
 };

 //Service as factory function that return an interface
function ExampleInMemoryService(): IService {

function metodo(param: string): string {
    return param;
}
return {
    metodo,
};
};