import axios from "axios";

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_MTPmgaY1SJ3hhcR0XiDBjBDVHR2Thhg7jipTQ1Bq&currencies=USD%2CINR%2CGBP%2CEUR&base_currency=EUR";

export const baseCurrency = async ()=>{
    try{
        const response = await axios.get(BASE_URL)
        return response
    }
    catch(error){
        console.log(error)
    }
    
}