
const API = "http://localhost:3000/notes";



export const GET = fetch(API)
.then(response => {
    if(response.ok) {
        return response.json()
    }
    throw new Error("Fucking Error")
});




export const POST = note => fetch(API, {
   method: "POST",
   headers: {
       "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
})
.then(response => {
    if(response.ok) {
        return response.json()
    }
    throw new Error("Fucking Error")
}); 

export const deleteNote = id => fetch(`${API}/${id}`, {
    method: "DELETE",
 })
 .then(response => {
     if(response.ok) {
         return response.json()
     }
     throw new Error("Fucking Error")
 })
