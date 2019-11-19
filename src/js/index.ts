import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"


interface IWord{
    myWord:string;
}


interface ISumWord{
    sum : number,
    word :IWord
  }

let url:string = "https://webapplicationwordcloud20191112123316.azurewebsites.net/api/wordcloud";

let AddWordButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddWordButton.addEventListener('click',AddWord);

let content = document.getElementById("content");


//Function , that returns an divelement
//It set the class atrribute depending at the count/sum 
function AddDivElement(word:ISumWord): HTMLDivElement{

    let divelement:HTMLDivElement = <HTMLDivElement>document.createElement('HTMLDivElement');

    let classVal:string = "";


    if (word.sum <= 2) {
        classVal = 'small';
        
    } else {
        if (word.sum <= 4) {
        classVal = 'medium';
    }
    else
        classVal = 'big';
    }

    divelement.setAttribute('class',classVal);
    let divText = document.createTextNode(word.word.myWord);
    divelement.appendChild(divText);
    return divelement;
}



//Function GetAllWords, create a Axios get request and add the data result
//to the HTML DOM using the function AddDivElement
function GetAllWords():void{

    console.log("At getAllWordsfunction");
    
     //axios call
    
     axios.get<ISumWord[]>(url)
     .then(function(response:AxiosResponse<ISumWord[]>){
         //then the get is ok
         response.data.forEach((word:ISumWord) => {
             console.log("the word is " + word.word.myWord + "sum : " +word.sum.toString());
             content.appendChild(AddDivElement(word));
             
         });
    
     } )
     .catch(function (error:AxiosError){
         console.log(error);
         //then the get fails
     });
    
    
    }

    //Function addWord, do an Axios post request to the webservice
    function AddWord():void{

        //Steps to do a axios post
        //step 1 we need to get the data from the html page (text input fields)
       let addElementWord : HTMLInputElement = <HTMLInputElement>document.getElementById("addWord");
     
       let myWord:string = addElementWord.value;
       
       console.log("MyWord " + myWord);

       axios.post<IWord>(url,{'myWord':myWord})
       .then(function(response:AxiosResponse){
           console.log("In .then Data is :  " + <IWord>(response.data))
           console.log("response " + response.status + " " +response.statusText )
       })
       .catch(function (error: AxiosError){ 
           console.log(error)
           content.innerHTML= error.message;
        });
    
      
      GetAllWords();
      console.log("end addWord");
    
    }


    GetAllWords();