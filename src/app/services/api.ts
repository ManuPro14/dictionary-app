import axios from 'axios';

const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

export async function getWord(word: string) {
  try{

    const response = await axios.get(`${apiUrl}${word}`)
    return response.data
    
  }catch(e){
    console.error('Error fetching data: ',e)
    return null
  }
}